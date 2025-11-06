# Backend/main.py
from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import io
import json

# OPTIONAL libs for extraction
import fitz  # PyMuPDF
from PyPDF2 import PdfReader
import docx2txt

# OpenAI (v0.28 simple chat API)
import openai

# --- Load env and set up OpenAI ---
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
USE_FAKE = not bool(openai.api_key)  # allow app to work without a real key

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    # dev-friendly
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- File readers ----------
def read_txt(file: UploadFile) -> str:
    content = file.file.read()
    try:
        return content.decode("utf-8")
    except UnicodeDecodeError:
        return content.decode("latin-1", errors="ignore")

def read_pdf_pymupdf(file: UploadFile) -> str:
    # file.file is a SpooledTemporaryFile. Read into bytes for PyMuPDF
    file_bytes = file.file.read()
    if not file_bytes:
        return ""
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = []
        for page in doc:
            text.append(page.get_text("text"))
        return "\n".join(text).strip()
    except Exception:
        return ""

def read_pdf_pypdf2(file: UploadFile) -> str:
    try:
        file.file.seek(0)
        reader = PdfReader(file.file)
        text = []
        for page in reader.pages:
            t = page.extract_text() or ""
            text.append(t)
        return "\n".join(text).strip()
    except Exception:
        return ""

def read_docx(file: UploadFile) -> str:
    # docx2txt expects a path or a file-like object. Use bytes.
    try:
        file_bytes = file.file.read()
        buf = io.BytesIO(file_bytes)
        # docx2txt can take a path; for in-memory we write a small helper:
        # However, docx2txt.process(file-like) is not supported directly,
        # so we fallback to temporary file approach:
        import tempfile
        with tempfile.NamedTemporaryFile(suffix=".docx", delete=True) as tmp:
            tmp.write(file_bytes)
            tmp.flush()
            return docx2txt.process(tmp.name) or ""
    except Exception:
        return ""

def extract_text(file: UploadFile) -> str:
    ext = (file.filename or "").split(".")[-1].lower()
    file.file.seek(0)
    if ext == "txt":
        return read_txt(file)
    elif ext == "pdf":
        # Try robust path first
        file.file.seek(0)
        text = read_pdf_pymupdf(file)
        if not text or len(text.replace(" ", "").strip()) < 30:
            file.file.seek(0)
            text = read_pdf_pypdf2(file)
        return text
    elif ext == "docx":
        file.file.seek(0)
        return read_docx(file)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type. Use .txt, .pdf, or .docx")

# ---------- AI scoring ----------
STRICT_PROMPT_TEMPLATE = """You are a strict resume evaluator. Analyze the RESUME against the JOB DESCRIPTION.

Return ONLY valid JSON with this exact shape (no extra text, no markdown):
{{
  "total": <0-100 integer>,
  "breakdown": {{
    "Grammar & Spelling": <0-100 integer>,
    "Keyword Match": <0-100 integer>,
    "Readability & Formatting": <0-100 integer>
  }},
  "jd_match": {{
    "coveragePct": <0-100 integer>,
    "matchedKeywords": [<strings>],
    "missingKeywords": [<strings>]
  }},
  "advice": [<3-8 specific, actionable bullet strings>],
  "strengths": [<3-6 bullet strings>]
}}

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}
"""

def fake_analysis(resume_text: str, jd_text: str) -> dict:
    # Reasonable stub so the UI works with no API key.
    return {
        "total": 72,
        "breakdown": {
            "Grammar & Spelling": 78,
            "Keyword Match": 66,
            "Readability & Formatting": 73
        },
        "jd_match": {
            "coveragePct": 61,
            "matchedKeywords": ["SQL", "Excel", "Dashboards"],
            "missingKeywords": ["Pandas", "A/B testing", "Power BI"]
        },
        "advice": [
            "Add 2–3 quantifiable metrics per role (%, $, #).",
            "Mirror critical keywords from the JD (skills/tools) in bullets.",
            "Tighten the summary to 1–2 lines focused on value/impact.",
            "Group related skills; remove weak or outdated items.",
            "Ensure consistent tense, punctuation, and spacing."
        ],
        "strengths": [
            "Clear section structure.",
            "Relevant coursework/projects.",
            "Good use of action verbs.",
            "Highlights domain experience."
        ]
    }

def score_resume_with_ai(resume_text: str, jd_text: str) -> dict:
    if USE_FAKE:
        return fake_analysis(resume_text, jd_text)

    prompt = STRICT_PROMPT_TEMPLATE.format(resume_text=resume_text[:12000], jd_text=jd_text[:4000])
    try:
        resp = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
        )
        content = resp["choices"][0]["message"]["content"]
        return json.loads(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI scoring failed: {e}")

# ---------- API ----------
@app.post("/rate")
async def rate_resume(resume: UploadFile, jd_text: str = Form("")):
    if not resume or not resume.filename:
        raise HTTPException(status_code=400, detail="No file uploaded.")

    text = extract_text(resume)
    if not text or len(text.strip()) < 10:
        # Likely image-only PDF or unsupported file
        raise HTTPException(
            status_code=400,
            detail="Could not read text from file. If it's a scanned PDF, upload a text-based PDF, DOCX, or TXT."
        )

    result = score_resume_with_ai(text, jd_text or "")
    # sanity: ensure required keys exist even in fake mode
    result.setdefault("jd_match", {"coveragePct": 0, "matchedKeywords": [], "missingKeywords": []})
    result.setdefault("breakdown", {})
    result.setdefault("advice", [])
    result.setdefault("strengths", [])
    result.setdefault("total", 70)

    return result

@app.get("/health")
def health():
    return {"ok": True}

