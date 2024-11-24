"use client";
import React from 'react';
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

export default function Logs() {
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
          //Print all logs
          //TODO: Catch all of the logs from the prompt and save to file.
        }


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