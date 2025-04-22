// File: src/components/sections/PreWeddingSection.js
import Image from 'next/image';

export default function PreWeddingSection() {
  // In a real app, these would be actual image URLs from your image hosting or CMS
  const photos = [
    '/images/Omarwinnie1.jpeg',
    '/images/Omarwinnie2.jpeg',
    '/images/Omarwinnie3.jpeg',
    '/images/Omarwinnie4.jpeg',
    '/images/Omarwinnie5.jpeg',
    '/images/Omarwinnie6.jpeg'
  ];
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">Pre-Wedding Photoshoot</h2>
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-lg text-gray-700">
          We had an amazing time capturing these special moments before our big day. 
          Here are some of our favorite photos from our pre-wedding photoshoot at Sunset Beach.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div key={index} className="bg-gray-200 aspect-square rounded-lg overflow-hidden shadow-md relative">
            <div className="w-full h-full relative">
              <Image 
                src={photo}
                alt={`Pre-wedding photo ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform hover:scale-105 duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}