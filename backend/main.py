from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Initialize FastAPI App
app = FastAPI(title="AutoInsight AI Backend", version="1.0.0")

# Enable CORS so your React front-end (localhost:5173) can communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define what data structure we expect from the frontend
class DocumentRequest(BaseModel):
    target_format: str
    automation_action: str

# Health Check Endpoint
@app.get("/")
def read_root():
    return {"status": "online", "message": "AutoInsight AI Backend API is running!"}

# Endpoint to handle document processing requests
@app.post("/api/process-document")
def process_document(payload: DocumentRequest):
    return {
        "success": True,
        "message": "Document successfully processed by Python backend!",
        "received_data": {
            "target_format": payload.target_format,
            "automation_action": payload.automation_action
        },
        "summary": "AI automation pipeline successfully executed. Key insight extracted: Python backend is fully integrated with React!"
    }