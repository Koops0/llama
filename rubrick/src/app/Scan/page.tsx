"use client";

import React, { useState } from "react";

export default function Scan() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [processStatus, setProcessStatus] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    setUploadStatus("Uploading...");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setUploadStatus("Image uploaded successfully!");
        setProcessStatus(data.filePath); // Set the file path for processing
      } else {
        setUploadStatus(`Error: ${data.error}`);
      }
    } catch (error: any) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  const handleProcess = async () => {
    if (!processStatus) return;

    setResponse("Processing image...");

    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: processStatus }),
      });
      const data = await res.json();

      if (data.success) {
        // Extract and set only the message.content field
        const content = data.data.message.content;
        setResponse(content);
      } else {
        setResponse(`Error: ${data.error}`);
      }
    } catch (error: any) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-screen h-screen relative flex flex-col items-center overflow-hidden">
      <div className="w-full h-full absolute bg-[#3654bf]" />
      <div className="absolute inset-x-0 top-1/4 transform -translate-y-1/2 flex flex-col items-center space-y-4">
        <div className="text-center text-white text-6xl font-bold font-['SF Pixelate'] leading-tight">
          Scan and Analyze!
        </div>
        <div className="text-center text-white text-xl md:text-3xl font-bold font-['SF Pixelate'] leading-tight px-4">
          Upload an image and let us analyze it for you.
        </div>
      </div>

      <form
        onSubmit={handleUpload}
        className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
          required
          className="bg-white text-black rounded-md px-4 py-2"
        />
        <button
          type="submit"
          className="w-11/12 md:w-1/4 h-16 bg-[#c45555] border-4 border-black text-black text-2xl md:text-4xl font-bold font-['SF Pixelate'] leading-tight flex justify-center items-center"
        >
          Upload Image
        </button>
        <p className="text-white">{uploadStatus}</p>
      </form>

      <button
        onClick={handleProcess}
        disabled={!processStatus}
        className="absolute inset-x-0 bottom-32 w-11/12 md:w-1/4 h-16 bg-[#83dc87] border-4 border-black text-black text-2xl md:text-4xl font-bold font-['SF Pixelate'] leading-tight flex justify-center items-center disabled:opacity-50"
      >
        Process Image
      </button>

      <div className="absolute inset-x-0 bottom-10 w-11/12 md:w-3/4 bg-white border-4 border-black p-4 rounded-md overflow-y-auto max-h-40">
        <pre className="text-black font-mono">{response || "Response will appear here..."}</pre>
      </div>
    </div>
  );
}
