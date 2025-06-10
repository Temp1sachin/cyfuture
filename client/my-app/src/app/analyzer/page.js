'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import YeloFile from "@/components/LiveDisplay";
import AnalysisResult from "@/components/Result";

export default function Analyzer() {
  const [result, setResult] = useState('');

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/"
              className="text-green-500 hover:text-green-600 font-bold text-lg transition-colors duration-200"
            >
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Document Analysis
            </h1>
          </div>

          <div className="rounded-lg shadow-lg p-6 mb-6 border-2 border-black" style={{ background: '#FFFDEB' }}>
            <YeloFile setResult={setResult} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg shadow-lg p-6 border-2 border-black"
            style={{ background: '#FFFDEB' }}
          >
            <AnalysisResult result={result} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 