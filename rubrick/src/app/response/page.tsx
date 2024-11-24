"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const response = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'assistant' }[]>([
    { text: 'Hello! How can I assist you today?', sender: 'assistant' }
  ]);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [processStatus, setProcessStatus] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Append user message
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
    }
  };

  const handleUpload = async (capturedImage: string) => {
    if (!capturedImage) return;

    const formData = new FormData();
    try {
      const response = await fetch(capturedImage);
      const blob = await response.blob(); // Convert base64 or URL to Blob

      // Use the current timestamp as the file name, appending a .jpg extension
      const fileName = `${Date.now()}.jpg`;

      formData.append("image", blob, fileName); // Name the file with the timestamp

      setUploadStatus("Uploading...");

      // Upload the image
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (uploadData.success) {
        setUploadStatus("Image uploaded successfully!");

        // Process the uploaded image
        setUploadStatus("Processing image...");
        const processRes = await fetch("/api/process", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ filePath: uploadData.filePath }),
        });

        const processData = await processRes.json();

        if (processData.success) {
          setUploadStatus("Processing complete!");

          // Append assistant response
          setMessages([...messages, 
            { text: "📸 Image uploaded and processed successfully!", sender: 'assistant' },
            { text: processData.data.message.content, sender: 'assistant' }
          ]);
        } else {
          setUploadStatus(`Processing Error: ${processData.error}`);
        }
      } else {
        setUploadStatus(`Upload Error: ${uploadData.error}`);
      }
    } catch (error: any) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full h-screen bg-blue-600 p-6 relative overflow-hidden">
      {/* Grid Background */}
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
        <div className="bg-blue-400/50 p-4 rounded min-h-[400px] font-mono text-white space-y-2 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={`whitespace-pre-wrap ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded ${msg.sender === 'user' ? 'bg-green-500' : 'bg-gray-700'}`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* Input Area */}
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

        {/* Upload and Process Button */}
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  handleUpload(reader.result as string);
                };
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
            className="hidden"
            id="upload-input"
          />
          <label htmlFor="upload-input" className="cursor-pointer bg-purple-500 border-2 border-black p-2 px-4 hover:bg-purple-600 transition-colors rounded">
            Upload Image
          </label>
        </div>

        {/* Upload Status */}
        {uploadStatus && (
          <div className="mt-2 text-sm text-white">
            {uploadStatus}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default response;