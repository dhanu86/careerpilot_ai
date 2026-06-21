from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import os

import storage
from pdf_reader import extract_text
from text_splitter import split_text
from vector_store import build_index, search
from llm import generate_answer

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure uploads folder exists
os.makedirs("uploads", exist_ok=True)


@app.get("/")
def home():
    return {"message": "CareerPilot AI Backend Running"}


@app.get("/test")
def test():
    return {"status": "success", "message": "Frontend Connected!"}


# ---------------- UPLOAD PDF ----------------
@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    try:
        file_path = f"uploads/{file.filename}"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        text = extract_text(file_path)

        storage.pdf_text = text
        storage.chunks = split_text(text)

        build_index(storage.chunks)

        return {
            "message": f"{file.filename} uploaded successfully",
            "chunks": len(storage.chunks)
        }

    except Exception as e:
        print("UPLOAD ERROR:", e)
        return {"message": "Upload failed"}


# ---------------- ASK QUESTION ----------------
class Question(BaseModel):
    question: str


@app.post("/ask")
async def ask_question(data: Question):

    try:
        if not storage.chunks:
            return {"answer": "Please upload a PDF first."}

        context = search(data.question)

        if not context:
            context = ""

        answer = generate_answer(context, data.question)

        # IMPORTANT: force string to avoid React crash
        return {"answer": str(answer)}

    except Exception as e:
        print("ASK ERROR:", e)
        return {"answer": "Something went wrong in backend"}