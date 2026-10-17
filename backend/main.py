from fastapi import FastAPI, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI
app = FastAPI(title="AutoInsight AI Backend (Free Mode)", version="1.0.0")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "message": "AutoInsight AI Backend (Free Simulation Mode) is running!"}

@app.post("/api/process-document")
async def process_document(
    target_format: str = Form(...),
    automation_action: str = Form(...),
    file: UploadFile = File(None)
):
    try:
        file_name = file.filename if file else "Sample_Document.txt"
        
        # Read file snippet if uploaded
        file_text = ""
        if file:
            contents = await file.read()
            file_text = contents[:500].decode("utf-8", errors="ignore")

        # Generate a smart, professional mock AI response based on user choices
        if "Executive Summary" in target_format:
            ai_summary = f"""### Executive Summary (Generated via AutoInsight Engine)
- **Document Analyzed:** {file_name}
- **Overview:** The submitted document highlights core strategic operational workflows and key performance metrics.
- **Key Takeaway:** Document structure is optimized for automated parsing. Sentiment is highly favorable for immediate integration into enterprise channels.
- **Automated Trigger Status:** Successfully queued for '{automation_action}'."""
        elif "Structured Data Table" in target_format:
            ai_summary = f"""### Structured Data Extraction ({file_name})
| Category | Metric / Entity | Status |
| :--- | :--- | :--- |
| Document Type | Standard Text / PDF | Verified |
| Processing Speed | 0.04s | Optimal |
| Action Trigger | {automation_action} | Dispatched |"""
        else:
            ai_summary = f"""### Risk & Action Item Analysis ({file_name})
1. **Critical Action:** Review compliance parameters outlined in section 2.
2. **Risk Assessment:** Low risk detected; formatting complies with enterprise standards.
3. **Next Steps:** Automated workflow dispatched via '{automation_action}'."""

        return {
            "success": True,
            "message": f"Successfully analyzed {file_name} using Intelligent Simulation Mode!",
            "filename": file_name,
            "received_data": {
                "target_format": target_format,
                "automation_action": automation_action
            },
            "summary": ai_summary
        }

    except Exception as e:
        return {
            "success": False,
            "message": f"Error: {str(e)}",
            "summary": "Internal server error."
        }