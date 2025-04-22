// File: src/components/sections/AboutHimSection.js
import Image from 'next/image';

export default function AboutHimSection() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">About Umar</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <div className="bg-gray-200 h-96 rounded-lg overflow-hidden relative">
            {/* In a real app, this would be an actual image */}
            <Image 
              src="/api/placeholder/500/700" 
              alt="Umar" 
              layout="fill" 
              objectFit="cover" 
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <p className="text-lg text-gray-700 mb-6">
            Umar is a software engineer with a passion for cooking and hiking. Born and raised in Seattle, he loves the outdoors and spends his weekends exploring the mountains with his dog, Max.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            He met Winnie during a charity marathon three years ago, and it was love at first sight. Umar proposed during a sunset hike at Mount Rainier, their favorite spot.
          </p>
          <p className="text-lg text-gray-700">
            His favorite quote: &quot;The best things in life are the people we love, the places we&apos;ve been, and the memories we&apos;ve made along the way.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}