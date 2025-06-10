'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#181A1B' }}>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl font-extrabold mb-6 text-white tracking-tight">
            Smart Contract Analyzer
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Meet your AI-powered assistant for legal contracts. Effortlessly upload any contract and let our tool extract key terms, highlight potential risks, and generate concise summaries—empowering you to make informed decisions faster and with confidence.
          </p>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg shadow-md border-2 border-black"
                style={{ background: '#FFFDEB' }}
              >
                <h3 className="text-xl font-bold mb-2 text-black">Key Term Extraction</h3>
                <p className="text-gray-800">Automatically extract important clauses and terms from your contracts.</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg shadow-md border-2 border-black"
                style={{ background: '#FFFDEB' }}
              >
                <h3 className="text-xl font-bold mb-2 text-black">Risk Identification</h3>
                <p className="text-gray-800">Spot potential risks and red flags in your legal documents.</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg shadow-md border-2 border-black"
                style={{ background: '#FFFDEB' }}
              >
                <h3 className="text-xl font-bold mb-2 text-black">Summarization</h3>
                <p className="text-gray-800">Get concise summaries for quick understanding and decision-making.</p>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/analyzer"
                className="inline-block px-8 py-4 bg-green-500 text-black rounded-lg font-extrabold text-lg shadow-lg border-2 border-black hover:bg-green-600 transition-all duration-300"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}