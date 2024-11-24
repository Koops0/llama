"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const response = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'assistant' }[]>([
    { text: 'Hello! How can I assist you today?', sender: 'assistant' }
  ]);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');

      try {
        const res = await fetch("http://localhost:11400/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama2",
            prompt: input,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setMessages((prev) => [...prev, { text: data.response, sender: 'assistant' }]);
        } else {
          throw new Error("Failed to get a response from Ollama.");
        }
      } catch (error) {
        console.error(error);
        setMessages((prev) => [...prev, { text: "Error: Unable to fetch a response.", sender: 'assistant' }]);
      }
    }
    // Scroll to bottom of chat
    document.getElementById("messages-container")?.scrollTo({
      top: document.getElementById("messages-container")?.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full h-screen bg-blue-600 p-6 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <motion.div
        className="max-w-3xl mx-auto bg-blue-500/80 border-4 border-black rounded p-4 mt-8 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-white font-mono text-2xl mb-4 pb-2 border-b-2 border-white/20">Response</div>

        <div 
          className="bg-blue-400/50 p-4 rounded max-h-[400px] font-mono text-white space-y-2 overflow-y-auto"
          id="messages-container"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`whitespace-pre-wrap ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded ${msg.sender === 'user' ? 'bg-green-500' : 'bg-gray-700'}`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-200 border-2 border-black p-2 font-mono text-sm text-black rounded"
            placeholder="Type your prompt here"
          />
          <button
            type="submit"
            className="bg-green-500 border-2 border-black p-2 px-4 hover:bg-green-600 transition-colors rounded"
          >
            <div className="w-0 h-0 border-t-8 border-l-8 border-b-8 border-t-transparent border-b-transparent border-l-white" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default response;
