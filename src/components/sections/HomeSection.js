// File: src/components/sections/HomeSection.js
import { useRouter } from 'next/router';

export default function HomeSection() {
  const router = useRouter();

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900 to-teal-700 opacity-80">
        {/* In a real app, this would be a background image */}
        {/* <img src="/images/hero-bg.jpg" alt="Wedding background" className="w-full h-full object-cover" /> */}
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Winnie & Omar</h1>
        <p className="text-2xl mb-8">June 25th & 28th, 2025</p>
        <div className="w-24 h-1 bg-white rounded mb-8"></div>
        <p className="text-xl mb-12 max-w-2xl">Join us to celebrate the beginning of our journey together as husband and wife.</p>
        <button 
          onClick={() => router.push('/about')}
          className="bg-white text-teal-900 px-8 py-3 rounded-md font-bold hover:bg-teal-100 transition-colors"
        >
          View Our Story
        </button>
      </div>
    </div>
  );
}