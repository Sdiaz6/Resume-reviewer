# backend/main.py
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
import os, json

from dotenv import load_dotenv
import openai

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("Set OPENAI_API_KEY in backend/.env")
openai.api_key = OPENAI_API_KEY

app = FastAPI(title="Resume Reviewer (TXT-only)", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_methods=["*"],
    allow_headers=["*"],
)

def read_txt_upload(upload: UploadFile) -> str:
    # only allow .txt
    name = (upload.filename or "").lower()
    if not (name.endswith(".txt") or upload.content_type == "text/plain"):
        raise HTTPException(status_code=400, detail="Only .txt files are accepted at this endpoint.")
    content = upload.file.read()
    try:
        return content.decode("utf-8", errors="ignore").strip()
    except Exception:
        raise HTTPException(status_code=400, detail="Could not decode text file as UTF-8.")

def validate_text(text: str, field: str = "resume_text") -> str:
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail=f"{field} is empty.")
    if len(text) > 10_000:
        raise HTTPException(status_code=413, detail=f"{field} too large (>10KB). Trim it before upload.")
    return text.strip()

def score_with_ai(resume_text: str, jd_text: str = "") -> Dict[str, Any]:
    """
    Calls OpenAI with your JSON-spec prompt and returns parsed JSON.
    Keeps your original structure: total, breakdown, advice.
    """
    prompt = f"""
You are a resume evaluator. Evaluate the resume below based on:
1. Grammar & Spelling (0-100)
2. Keyword match with job description (0-100)
3. Readability & Formatting (0-100)

Resume:
{resume_text}

Job Description:
{jd_text}

Return a JSON object like:
{{
  "total": int,
  "breakdown": {{
      "Grammar & Spelling": int,
      "Keyword Match": int,
      "Readability & Formatting": int
  }},
  "advice": ["list of suggestions"],
  "jd_match": {{
      "coveragePct": int,
      "missingKeywords": [string]
  }}
}}
Only return JSON. No explanation.
"""
    try:
        resp = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",   # keep as-is for now
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )
        content = resp["choices"][0]["message"]["content"]
        data = json.loads(content)

        # light sanity checks
        if "total" not in data or "breakdown" not in data:
            raise ValueError("Missing required keys in model response.")
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI scoring failed: {e}")

class RateTextPayload(BaseModel):
    resume_text: str = Field(..., description="Plain text resume content")
    jd_text: Optional[str] = Field(default="", description="Optional job description text")

@app.post("/rate")
async def rate_txt_file(resume: UploadFile = File(...), jd_text: str = Form("")):
    """
    Upload a .txt file as 'resume'. This is the only file format accepted.
    """
    text = read_txt_upload(resume)
    text = validate_text(text, "resume_text")
    jd_text = (jd_text or "").strip()
    result = score_with_ai(text, jd_text)
    result["_meta"] = {"input_type": "file_txt"}
    return result

@app.post("/rate/text")
async def rate_text(payload: RateTextPayload):
    """
    Send raw text instead of a file.
    """
    text = validate_text(payload.resume_text, "resume_text")
    jd = (payload.jd_text or "").strip()
    result = score_with_ai(text, jd)
    result["_meta"] = {"input_type": "json_text"}
    return result

@app.get("/health")
def health():
    return {"ok": True, "mode": "txt-only"}
