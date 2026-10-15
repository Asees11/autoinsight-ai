import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 px-8 py-4 flex justify-between items-center">
        <div className="font-bold text-xl text-blue-500 tracking-wide">AutoInsight AI</div>
        <div className="flex gap-6 text-sm text-slate-400 font-medium">
          <span className="hover:text-white cursor-pointer transition">Dashboard</span>
          <span className="hover:text-white cursor-pointer transition">Analytics</span>
          <span className="hover:text-white cursor-pointer transition">API Settings</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">AI Document Intelligence Engine</h1>
          <p className="text-slate-400 text-lg">Transform raw documents into structured insights and automated workflows.</p>
        </div>

        {/* Workspace Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
          {/* File Upload Box */}
          <div className="border-2 border-dashed border-slate-700 rounded-xl p-10 text-center hover:border-blue-500 hover:bg-slate-800/50 transition cursor-pointer">
            <p className="text-slate-300 font-medium mb-1">Drag & drop your PDF or document here</p>
            <p className="text-slate-500 text-xs">Supports PDF, TXT, or DOCX up to 10MB</p>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Target Output Format</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
                <option>Executive Summary</option>
                <option>Structured Data Table</option>
                <option>Key Action Items & Risk Analysis</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Automation Action</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
                <option>Send Summary via Email & Slack</option>
                <option>Save to Database Only</option>
              </select>
            </div>
          </div>

          {/* Process Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-500 transition text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/20">
            Generate Insights & Trigger Automation
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;