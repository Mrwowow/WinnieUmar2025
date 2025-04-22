// File: src/components/sections/AboutHerSection.js
import Image from 'next/image';

export default function AboutHerSection() {
  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">About Winnie</h2>
      <div className="flex flex-col md:flex-row-reverse items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
          <div className="bg-gray-200 h-96 rounded-lg overflow-hidden relative">
            {/* In a real app, this would be an actual image */}
            <Image 
              src="images/Omarwinnie4.jpeg" 
              alt="Winnie" 
              layout="fill" 
              objectFit="cover" 
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <p className="text-lg text-gray-700 mb-6">
            Winnie is a pediatric nurse with a heart of gold. Originally from Portland, she moved to Seattle to pursue her career and fell in love with the city and its people.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            She&apos;s an avid reader, coffee enthusiast, and loves to travel. Winnie knew Omar was the one when he surprised her with tickets to Paris for her birthday.
          </p>
          <p className="text-lg text-gray-700">
            Her favorite quote: &quot;In a world full of people, you can find yourself lost. But when you find that special someone, suddenly the world makes sense.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}