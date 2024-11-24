"use client";
import React, { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function Scan() {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [processStatus, setProcessStatus] = useState(""); // File path of uploaded image
  const [response, setResponse] = useState(""); // Response from the processing API
  const [showCamera, setShowCamera] = useState(true); // Tracks camera visibility

  const errorMessages = {
    noCameraAccessible: "No camera device accessible. Please connect your camera or try a different browser.",
    permissionDenied: "Permission denied. Please refresh and give camera permission.",
    switchCamera: "It is not possible to switch camera to a different one because there is only one video device accessible.",
    canvas: "Canvas is not supported.",
  };

  const handleTakePhoto = () => {
    if (camera.current) {
      const capturedImage = camera.current.takePhoto();
      setImage(capturedImage);
      setShowCamera(false); // Hide the camera after taking a photo
      handleUpload(capturedImage);
    }
  };

  const handleRetakePhoto = () => {
    setImage(null); // Clear the captured image
    setShowCamera(true); // Show the camera again
    setResponse(""); // Clear any previous processing response
  };

  const handleUpload = async (capturedImage) => {
    if (!capturedImage) return;

    const formData = new FormData();
    const blob = await fetch(capturedImage).then((res) => res.blob()); // Convert base64 to Blob

    // Use the current timestamp as the file name, appending a .jpg extension
    const fileName = `${Date.now()}.jpg`;

    formData.append("image", blob, fileName); // Name the file with the timestamp

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
        console.log("File path:", data.filePath);
      } else {
        setUploadStatus(`Error: ${data.error}`);
      }
    } catch (error) {
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
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-screen h-screen relative flex overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-[#3654bf] absolute z-0" />
        <div className="absolute w-full h-full">
          {/* Horizontal grid lines */}
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`h-grid-${index}`}
              className="w-full h-0 border-t-4 border-white/20 absolute"
              style={{ top: `${index * 10}%` }}
            />
          ))}
        </div>
        <div className="absolute w-full h-full">
          {/* Vertical grid lines */}
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`v-grid-${index}`}
              className="w-0 h-full border-l-4 border-white/20 absolute"
              style={{ left: `${index * 10}%` }}
            />
          ))}
        </div>
      </div>

      {/* Llama Image */}
      <div className="absolute z-10">
        <Image src="/image_icon.png" alt="Llama" width={80} height={80} />
      </div>

      {/* Camera or Captured Image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {showCamera ? (
          <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] md:w-[540px] md:h-[540px] lg:w-[720px] lg:h-[720px]">
            <Camera ref={camera} aspectRatio={1 / 1} errorMessages={errorMessages} facingMode="environment" />
          </div>
        ) : (
          <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] md:w-[540px] md:h-[540px] lg:w-[720px] lg:h-[720px]">
            <img src={image} alt="Captured" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Buttons */}
        <div className="mt-4 flex gap-4">
          {showCamera ? (
            <button
              className="px-2 py-2 bg-blue-500 text-white sm:text-xl text-3xl rounded"
              onClick={handleTakePhoto}
            >
              Take Photo
            </button>
          ) : (
            <>
              <button
                className="px-2 py-2 bg-yellow-500 text-white sm:text-xl text-3xl rounded"
                onClick={handleRetakePhoto}
              >
                Retake Photo
              </button>
              <button
                className="px-2 py-2 bg-green-500 text-white sm:text-xl text-3xl rounded"
                onClick={handleProcess}
              >
                Process
              </button>
            </>
          )}
        </div>
      </div>

      {/* Upload Status */}
      {uploadStatus && (
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-lg z-20">
          <p>{uploadStatus}</p>
        </div>
      )}

      {/* Processing Response */}
      {response && (
        <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow-lg z-20">
          <p>{response}</p>
        </div>
      )}

      {/* Exit Button */}
      <motion.div className="absolute top-0 right-0 m-4 z-20" initial="hidden" animate="visible" variants={containerVariants}>
        <Link href="/" passHref>
          <motion.button
            className="w-12 h-12 relative cursor-pointer bg-transparent border-0 p-0"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-[#c45555] border-4 border-black" />
            <span className="absolute inset-0 flex justify-center items-center text-black text-3xl md:text-5xl font-bold font-['SF Pixelate'] leading-tight">
              X
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
