"use client";
import React, { useRef, useState } from 'react';
import { Camera } from 'react-camera-pro';
import Image from "next/image";
import Link from 'next/link';
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
    const [image, setImage] = React.useState(null);
    const errorMessages = {
      noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
      permissionDenied: 'Permission denied. Please refresh and give camera permission.',
      switchCamera: 'It is not possible to switch camera to different one because there is only one video device accessible.',
      canvas: 'Canvas is not supported.',
    };
    const handleTakePhoto = () => {
      if (camera.current) {
        setImage(camera.current.takePhoto());
      }
    };

    return (
      <div className="w-screen h-screen relative flex overflow-hidden">
        <div className="w-full h-full absolute bg-[#3654bf]" />
        <div className="w-full h-full absolute">
          <div className="w-full h-full absolute">
            <div className="w-full h-0 absolute top-0 bg-gray-500 border-t-4 border-white/20"></div>
            <div className="w-full h-0 absolute top-[10%] bg-gray-500 border-t-4 border-white/20"></div>
            <div className="w-full h-0 absolute top-[20%] bg-gray-500 border-t-4 border-white/20"></div>
            <div className="w-full h-0 absolute top-[30%] bg-gray-500 border-t-4 border-white/20"></div>
            <div className="w-full h-0 absolute top-[40%] bg-gray-500 border-t-4 border-white/20"></div>
            <div className="w-full h-0 absolute top-[50%] bg-gray-500 border-t-4 border-white/20"></div>
            <div className="w-full h-0 absolute top-[60%] bg-gray-500 border-t-4 border-white/20"></div>
            <div className="w-full h-0 absolute top-[70%] bg-gray-500 border-t-4 border-white/20"></div>
            <div className="w-full h-0 absolute top-[80%] bg-gray-500 border-t-4 border-white/20"></div>
            <div className="w-full h-0 absolute top-[90%] bg-gray-500 border-t-4 border-white/20"></div>
          </div>
          <div className="w-full h-full absolute">
            <div className="w-0 h-full absolute left-0 bg-gray-500 border-l-4 border-white/20"></div>
            <div className="w-0 h-full absolute left-[10%] bg-gray-500 border-l-4 border-white/20"></div>
            <div className="w-0 h-full absolute left-[20%] bg-gray-500 border-l-4 border-white/20"></div>
            <div className="w-0 h-full absolute left-[30%] bg-gray-500 border-l-4 border-white/20"></div>
            <div className="w-0 h-full absolute left-[40%] bg-gray-500 border-l-4 border-white/20"></div>
            <div className="w-0 h-full absolute left-[50%] bg-gray-500 border-l-4 border-white/20"></div>
            <div className="w-0 h-full absolute left-[60%] bg-gray-500 border-l-4 border-white/20"></div>
            <div className="w-0 h-full absolute left-[70%] bg-gray-500 border-l-4 border-white/20"></div>
            <div className="w-0 h-full absolute left-[80%] bg-gray-500 border-l-4 border-white/20"></div>
            <div className="w-0 h-full absolute left-[90%] bg-gray-500 border-l-4 border-white/20"></div>
          </div>
        </div>

        {
          //Make Llama image icon on the top left corner
          //image.png
        }
        <div className="absolute">
          <Image
            src="/image_icon.png"
            alt="Llama"
            width={80}
            height={80}
          />
        </div>
        {
          // Camera UI
          //facingMode: { exact: 'environment' }, // Use the rear camera
          //facingMode: { exact: 'user' }, // Use the front camera
        }
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] md:w-[540px] md:h-[540px] lg:w-[720px] lg:h-[720px]">
            <Camera ref={camera} aspectRatio={1 / 1} errorMessages={errorMessages} facingMode="environment"/>
          </div>
          <button
            className="mt-4 px-2 py-2 bg-blue-500 text-white sm:text-xl text-3xl rounded"
            onClick={handleTakePhoto}>
            Take Photo
          </button>
        </div>

        <motion.div 
          className="absolute top-0 right-0 m-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Link href="/" passHref>
            <motion.button
              className="w-12 h-12 relative cursor-pointer bg-transparent border-0 p-0"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                console.log("Clicked X button");
                
              }}
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