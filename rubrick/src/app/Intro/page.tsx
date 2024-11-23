"use client";
import Image from "next/image";
import Link from 'next/link';
import { useRouter, redirect } from 'next/navigation';
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

export default function Intro() {
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

        <div className="absolute inset-x-0 top-1/4 transform -translate-y-1/2 flex justify-center w-full">
          <img
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
            src="/image.png"
            alt="Llama"
          />
        </div>
        <div className="absolute inset-x-0 top-[40%] text-center text-white text-6xl md:text-6xl font-bold leading-tight">
          BlueBrick!
        </div>
        <div className="absolute inset-x-0 top-[50%] text-center text-white text-xl md:text-3xl font-bold font-['SF Pixelate'] leading-tight px-4">
          Fuel your curiosity by deconstructing everyday objects!
        </div>

        <motion.div 
          className="flex flex-col md:flex-row gap-2 absolute inset-x-0 bottom-10 items-center justify-center px-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
       <Link href="/scan" passHref className="w-full md:w-1/3 max-w-[500px]">
        <motion.button
          className="w-full h-24 relative cursor-pointer bg-transparent border-0 p-0"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-full h-full bg-[#c45555] border-4 border-black" />
          <span className="absolute inset-0 flex justify-center items-center text-black text-3xl md:text-5xl font-bold font-['SF Pixelate'] leading-tight">
            Scan Objects
          </span>
        </motion.button>
      </Link>
        <Link href="/db" className="w-full md:w-1/3 max-w-[500px]">
          <motion.button
            className="w-full h-24 relative cursor-pointer bg-transparent border-0 p-0"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-[#57c455] border-4 border-black" />
            <span className="absolute inset-0 flex justify-center items-center text-black text-3xl md:text-5xl font-bold font-['SF Pixelate'] leading-tight">
              Past Projects
            </span>
          </motion.button>
        </Link>
        <Link href="/logs" className="w-full md:w-1/3 max-w-[500px]">
          <motion.button
            className="w-full h-24 relative cursor-pointer bg-transparent border-0 p-0"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-white border-4 border-black" />
            <span className="absolute inset-0 flex justify-center items-center text-black text-3xl md:text-5xl font-bold font-['SF Pixelate'] leading-tight">
              View Logs
            </span>
          </motion.button>
        </Link>
     </motion.div>
      </div>
    );
}   