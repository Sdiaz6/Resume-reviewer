# backend/main.py
from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from PyPDF2 import PdfReader
import docx2txt
import openai

# Load API key from .env
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper functions
def read_txt(file: UploadFile):
    content = file.file.read()
    return content.decode("utf-8")

def read_pdf(file: UploadFile):
    try:
        reader = PdfReader(file.file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except:
        raise HTTPException(status_code=400, detail="Could not read PDF file. Make sure it contains selectable text.")

def read_docx(file: UploadFile):
    try:
        text = docx2txt.process(file.file)
        return text
    except:
        raise HTTPException(status_code=400, detail="Could not read DOCX file.")

def extract_text(file: UploadFile):
    ext = file.filename.split(".")[-1].lower()
    if ext == "txt":
        return read_txt(file)
    elif ext == "pdf":
        return read_pdf(file)
    elif ext == "docx":
        return read_docx(file)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type. Use .txt, .pdf, or .docx")

# AI Scoring function
def score_resume_with_ai(resume_text: str, jd_text: str):
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
  "advice": ["list of suggestions"]
}}
"""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )
        import json
        content = response['choices'][0]['message']['content']
        # Ensure it's a valid JSON
        return json.loads(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI scoring failed: {e}")

# Upload & rate endpoint
@app.post("/rate")
async def rate_resume(resume: UploadFile, jd_text: str = Form(...)):
    if not resume.filename:
        raise HTTPException(status_code=400, detail="No file uploaded.")
    text = extract_text(resume)
    if not text.strip():
        raise HTTPException(status_code=400, detail="Resume file is empty.")
    if not jd_text.strip():
        raise HTTPException(status_code=400, detail="Job description is empty.")

    result = score_resume_with_ai(text, jd_text)
    return result
