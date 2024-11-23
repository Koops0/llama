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
        setResponse(JSON.stringify(data.data, null, 2));
      } else {
        setResponse(`Error: ${data.error}`);
      }
    } catch (error: any) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload and Analyze Image</h1>

      <form onSubmit={handleUpload} className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
          required
          className="block mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Upload
        </button>
      </form>

      <p>{uploadStatus}</p>

      <button
        onClick={handleProcess}
        disabled={!processStatus}
        className="bg-green-500 text-white py-2 px-4 rounded mt-4"
      >
        Process Image
      </button>

      <pre className="mt-4 bg-gray-100 p-2 rounded">{response}</pre>
    </div>
  );
}
