"use client";
import React, { useState } from 'react';

import { motion } from 'framer-motion';

const response = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: ''
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input }]);
      setInput('');
    }
  };

  return (
    <div className="w-full h-screen bg-blue-600 p-6 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Decorative Shapes */}
      <div className="absolute left-4 top-4">
        <div className="w-8 h-8 rounded-full bg-orange-400" />
      </div>
      <div className="absolute left-16 top-8">
        <div className="w-8 h-8 bg-green-400 rotate-45" />
      </div>
      
      {/* Main Chat Window */}
      <motion.div 
        className="max-w-3xl mx-auto bg-blue-500/80 border-4 border-black rounded p-4 mt-8 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="text-white font-mono text-2xl mb-4 pb-2 border-b-2 border-white/20">
          Response
        </div>
        
        {/* Messages Container */}
        <div className="bg-blue-400/50 p-4 rounded min-h-[400px] font-mono text-white space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className="whitespace-pre-wrap">
              {msg.text}
            </div>
          ))}
        </div>
        
        {/* Input Area */}
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-200 border-2 border-black p-2 font-mono text-sm text-black"
            placeholder="Type your prompt here"
          />
          <button
            type="submit"
            className="bg-green-500 border-2 border-black p-2 px-4 hover:bg-green-600 transition-colors"
          >
            <div className="w-0 h-0 border-t-8 border-l-8 border-b-8 border-t-transparent border-b-transparent border-l-white" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default response;