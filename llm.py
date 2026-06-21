import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",   # correct from YOUR system list
    google_api_key=os.getenv("GOOGLE_API_KEY")
)


def generate_answer(context, question):

    prompt = f"""
You are a helpful AI study assistant.

Context from PDF:
{context}

Question:
{question}

Give a clear, simple answer.
"""

    response = llm.invoke(prompt)

    return response.content