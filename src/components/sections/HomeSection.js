// File: src/components/sections/HomeSection.js
import Image from 'next/image';

export default function HomeSection({ setActiveSection }) {

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900 to-teal-700 opacity-100">
        {/* In a real app, this would be a background image */}
      <div className="relative w-full h-full">
        <Image 
          src="/images/winnieumar.png" 
          alt="Wedding background" 
          fill 
          priority
          className="object-cover"
        />
      </div>
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Winnie & Omar</h1>
        <p className="text-2xl mb-8">June 25th & 28th, 2025</p>
        <div className="w-24 h-1 bg-white rounded mb-8"></div>
        <p className="text-xl mb-12 max-w-2xl">Join us to celebrate the beginning of our journey together as husband and wife.</p>
        <button 
          onClick={() => setActiveSection('ourStory')}
          className="bg-white text-teal-900 px-8 py-3 rounded-md font-bold hover:bg-teal-100 transition-colors"
        >
          View Our Story
        </button>
      </div>
    </div>
  );
}