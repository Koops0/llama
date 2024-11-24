// FILE: /app/page.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Message {
  text: string;
  sender: 'user' | 'assistant';
  type?: 'text' | 'image';
  imageUrl?: string;
}

const response = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! I can help you analyze images or answer questions. How can I assist you today?', sender: 'assistant', type: 'text' }
  ]);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Append user message
    setMessages(prevMessages => [...prevMessages, { text: input, sender: 'user', type: 'text' }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input }),
      });

      const data = await res.json();

      if (data.success && data.data) {
        setMessages(prevMessages => [...prevMessages, { text: data.data.message.content, sender: 'assistant', type: 'text' }]);
      } else {
        throw new Error(data.error || "Failed to get a response from Ollama.");
      }
    } catch (error: any) {
      console.error(error);
      setMessages(prevMessages => [...prevMessages, { text: "Error: Unable to fetch a response.", sender: 'assistant', type: 'text' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (capturedImage: string) => {
    if (!capturedImage) return;

    const formData = new FormData();
    try {
      setIsLoading(true);
      setUploadStatus("Uploading...");

      // Convert base64 or URL to Blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();

      // Use the current timestamp as the file name, appending a .jpg extension
      const fileName = `${Date.now()}.jpg`;

      formData.append("image", blob, fileName); // Name the file with the timestamp

      // Upload the image and process it in the same API call
      const processRes = await fetch("/api/process", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filePath: `/uploads/${fileName}` }),
      });

      const processData = await processRes.json();

      if (processData.success && processData.data) {
        setUploadStatus("Processing complete!");

        // Append the image and assistant response to messages
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            text: "📸 Image uploaded:", 
            sender: 'user', 
            type: 'image',
            imageUrl: processData.data.filePath // Use the returned filePath
          },
          { 
            text: processData.data.message.content, 
            sender: 'assistant',
            type: 'text'
          }
        ]);
      } else {
        throw new Error(processData.error || 'Processing failed');
      }
    } catch (error: any) {
      console.error("Upload/Processing Error:", error);
      setUploadStatus(`Error: ${error.message}`);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: `Error processing image: ${error.message}`, sender: 'assistant', type: 'text' }
      ]);
    } finally {
      setIsLoading(false);
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
        <div className="text-white font-mono text-2xl mb-4 pb-2 border-b-2 border-white/20 flex justify-between items-center">
          <span>Ollama Chat</span>
          {isLoading && (
            <span className="text-sm animate-pulse">Processing...</span>
          )}
        </div>

        {/* Messages Container */}
        <div className="bg-blue-400/50 p-4 rounded min-h-[400px] font-mono text-white space-y-2 overflow-y-auto max-h-[600px]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`whitespace-pre-wrap ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded ${msg.sender === 'user' ? 'bg-green-500' : 'bg-gray-700'}`}>
                {msg.type === 'image' && msg.imageUrl ? (
                  <div className="space-y-2">
                    <div>{msg.text}</div>
                    <img src={msg.imageUrl} alt="Uploaded" className="max-w-xs rounded" />
                  </div>
                ) : (
                  msg.text
                )}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-200 border-2 border-black p-2 font-mono text-sm text-black rounded"
            placeholder="Ask me anything or upload an image for analysis..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-green-500 border-2 border-black p-2 px-4 hover:bg-green-600 transition-colors rounded disabled:opacity-50"
          >
            {/* Play Button Icon */}
            <div className="w-0 h-0 border-t-8 border-l-8 border-b-8 border-t-transparent border-b-transparent border-l-white" />
          </button>
        </form>

        {/* Upload Button */}
        <div className="mt-4 flex items-center gap-4">
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
            disabled={isLoading}
          />
          <label 
            htmlFor="upload-input" 
            className={`cursor-pointer bg-purple-500 border-2 border-black p-2 px-4 hover:bg-purple-600 transition-colors rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Upload Image
          </label>
          {uploadStatus && (
            <span className="text-sm text-white">{uploadStatus}</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default response;