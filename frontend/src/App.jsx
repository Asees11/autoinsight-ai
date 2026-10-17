import React, { useState } from 'react';

function App() {
  const [targetFormat, setTargetFormat] = useState('Executive Summary');
  const [automationAction, setAutomationAction] = useState('Send Summary via Email & Slack');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleProcessDocument = async () => {
    setLoading(true);
    setApiResponse(null);

    const formData = new FormData();
    formData.append('target_format', targetFormat);
    formData.append('automation_action', automationAction);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const response = await fetch('http://localhost:8000/api/process-document', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Connection error:', error);
      setApiResponse({
        success: false,
        message: 'Could not connect to Python backend on port 8000.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 px-8 py-4 flex justify-between items-center">
        <div className="font-bold text-xl text-blue-500 tracking-wide">AutoInsight AI</div>
        <div className="flex gap-6 text-sm text-slate-400 font-medium">
          <span className="hover:text-white cursor-pointer transition">Dashboard</span>
          <span className="hover:text-white cursor-pointer transition">Analytics</span>
          <span className="hover:text-white cursor-pointer transition">API Settings</span>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">AI Document Intelligence Engine</h1>
          <p className="text-slate-400 text-lg">Transform raw documents into structured insights and automated workflows.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
          <div className="border-2 border-dashed border-slate-700 rounded-xl p-10 text-center hover:border-blue-500 hover:bg-slate-800/50 transition cursor-pointer relative">
            <input
              type="file"
              accept=".pdf,.txt,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <p className="text-slate-300 font-medium mb-1">
              {selectedFile ? `Selected File: ${selectedFile.name}` : 'Drag & drop your PDF or document here, or click to browse'}
            </p>
            <p className="text-slate-500 text-xs">Supports PDF, TXT, or DOCX up to 10MB</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Target Output Format</label>
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option>Executive Summary</option>
                <option>Structured Data Table</option>
                <option>Key Action Items & Risk Analysis</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Automation Action</label>
              <select
                value={automationAction}
                onChange={(e) => setAutomationAction(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option>Send Summary via Email & Slack</option>
                <option>Save to Database Only</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleProcessDocument}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 transition text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            {loading ? 'Analyzing with AI...' : 'Generate Insights & Trigger Automation'}
          </button>

          {apiResponse && (
            <div className={`mt-4 p-4 rounded-xl border ${apiResponse.success ? 'bg-slate-950 border-blue-500/40' : 'bg-red-950/40 border-red-500/40'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Backend Response</span>
                <span className="text-xs text-slate-400">Status: {apiResponse.success ? '200 OK' : 'Error'}</span>
              </div>
              <p className="text-sm text-slate-300 font-mono mb-2">{apiResponse.message}</p>
              {apiResponse.summary && (
                <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                  <strong>AI Output Preview:</strong> {apiResponse.summary}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
