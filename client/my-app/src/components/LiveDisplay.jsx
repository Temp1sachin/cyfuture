'use client';
import React, { useState } from 'react';
import { Upload, Loader2, FileText, KeyRound, ShieldAlert } from 'lucide-react';

const typeMeta = {
  summary: {
    label: 'Summary',
    icon: <FileText className="inline mr-2 text-green-600" size={22} />,
    color: 'text-green-700',
    bg: 'bg-green-100',
  },
  terms: {
    label: 'Key Terms',
    icon: <KeyRound className="inline mr-2 text-yellow-600" size={22} />,
    color: 'text-yellow-700',
    bg: 'bg-yellow-100',
  },
  risks: {
    label: 'Risks',
    icon: <ShieldAlert className="inline mr-2 text-red-600" size={22} />,
    color: 'text-red-700',
    bg: 'bg-red-100',
  },
};

function YeloFile({ setResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState('');

  const handleUpload = () => {
    const el = document.createElement('input');
    el.setAttribute('type', 'file');
    el.setAttribute('accept', 'application/pdf');
    el.addEventListener('change', () => {
      if (el.files && el.files.length > 0) {
        const selected = el.files.item(0);
        setFile(selected);
      }
    });
    el.click();
  };

  const analyze = async (type) => {
    if (!file) return alert('Please upload a PDF first');
    setLoading(true);
    setActiveType(type);
    setResult(null);
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('promptType', type);
    try {
      const res = await fetch('http://localhost:8000/pdf', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.analysis) {
        setResult({ text: data.analysis, type });
      } else {
        setResult({ text: 'Failed to analyze.', type });
      }
    } catch (e) {
      setResult({ text: 'Failed to analyze.', type });
    }
    setLoading(false);
  };

  return (
    <div className="rounded-lg border-2 border-black shadow-lg flex flex-col gap-4 items-center p-6 w-full" style={{ background: '#FFFDEB' }}>
      <button
        onClick={handleUpload}
        className="flex items-center gap-2 px-5 py-2 rounded-lg font-bold bg-black text-green-400 border-2 border-black hover:bg-green-500 hover:text-black transition-all duration-200"
      >
        <Upload /> {file ? 'Change PDF' : 'Upload PDF'}
      </button>

      {file && (
        <div className="flex gap-3">
          <button
            onClick={() => analyze('summary')}
            className={`px-4 py-2 rounded-lg font-semibold border-2 border-black transition-all duration-200 ${activeType === 'summary' ? 'bg-green-500 text-black' : 'bg-black text-green-400 hover:bg-green-500 hover:text-black'}`}
            disabled={loading}
          >
            Summary
          </button>
          <button
            onClick={() => analyze('terms')}
            className={`px-4 py-2 rounded-lg font-semibold border-2 border-black transition-all duration-200 ${activeType === 'terms' ? 'bg-yellow-400 text-black' : 'bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black'}`}
            disabled={loading}
          >
            Key Terms
          </button>
          <button
            onClick={() => analyze('risks')}
            className={`px-4 py-2 rounded-lg font-semibold border-2 border-black transition-all duration-200 ${activeType === 'risks' ? 'bg-red-500 text-black' : 'bg-black text-red-400 hover:bg-red-500 hover:text-black'}`}
            disabled={loading}
          >
            Risks
          </button>
        </div>
      )}
      {activeType && !loading && (
        <div className={`w-full flex items-center justify-center mt-2 mb-1 rounded ${typeMeta[activeType]?.bg || ''} py-2`}>
          <span className={`font-bold text-lg flex items-center gap-2 ${typeMeta[activeType]?.color || ''}`}>
            {typeMeta[activeType]?.icon}
            Showing: {typeMeta[activeType]?.label}
          </span>
        </div>
      )}
      {loading && (
        <div className="flex flex-col items-center gap-2 mt-4 w-full">
          <Loader2 className="animate-spin text-green-500" size={36} />
          <span className="text-black font-semibold text-lg">Analyzing PDF...</span>
        </div>
      )}
    </div>
  );
}

export default YeloFile;
