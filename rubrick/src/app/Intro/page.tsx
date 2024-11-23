import Image from "next/image";
import Link from 'next/link';
// Opencv.js

//
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
    <div className="absolute inset-x-0 top-[40%] text-center text-white text-6xl md:text-6xl font-bold font-['SF Pixelate'] leading-tight">
      BlueBrick!
    </div>
    <div className="absolute inset-x-0 top-[50%] text-center text-white text-xl md:text-3xl font-bold font-['SF Pixelate'] leading-tight px-4">
      Fuel your curiosity by deconstructing everyday objects!
    </div>
  
    <div className="flex flex-col md:flex-row md:space-x-4 absolute inset-x-0 bottom-10 items-center justify-center space-y-4 md:space-y-0">

      <div className="w-11/12 md:w-1/4 h-16 relative">
        <div className="w-full h-full bg-[#c45555] border-4 border-black" />
        <div className="absolute inset-0 flex justify-center items-center text-black text-2xl md:text-4xl font-bold font-['SF Pixelate'] leading-tight">
          <Link href="/Scan" className="px-4 py-2 bg-blue-500 text-white rounded">Scan Objects</Link>     
        </div>
      </div>

      <div className="w-11/12 md:w-1/4 h-16 relative">
        <div className="w-full h-full bg-[#83dc87] border-4 border-black" />
        <div className="absolute inset-0 flex justify-center items-center text-black text-2xl md:text-4xl font-bold font-['SF Pixelate'] leading-tight">
          Past Projects
        </div>
      </div>

 
      <div className="w-11/12 md:w-1/4 h-16 relative">
        <div className="w-full h-full bg-white border-4 border-black" />
        <div className="absolute inset-0 flex justify-center items-center text-black text-2xl md:text-4xl font-bold font-['SF Pixelate'] leading-tight">
          View Log
        </div>
      </div>

    </div>
  </div>
  );
}
