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
              src="/images/winniepic.jpg" 
              alt="Winnie" 
              layout="fill" 
              objectFit="cover" 
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <p className="text-lg text-gray-700 mb-6">
            It&apos;s hard to put into words what Winnie means to me, but I&apos;ll try.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Winnie is the best thing that&apos;s ever happened to me. From the very beginning, she felt like home. She has this calm, gentle energy that just makes everything around her better. Being with her feels easy, natural, like things just make sense when she&apos;s around.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            She&apos;s smart, kind, thoughtful, and has this quiet strength that grounds me. She listens without judging, supports me without hesitation, and somehow always knows what to say when I need it most. She calls me out when I need it, and always sees the good in me, even when I don&apos;t see it myself.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            We&apos;ve been through a lot together. Life hasn&apos;t always been smooth, but we&apos;ve shown up for each other every step of the way. And the truth is, I wouldn&apos;t want to do life with anyone else. She&apos;s my teammate, my safe space, my best friend, and the woman I get to love for the rest of my life.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            She makes me better. She&apos;s kind to everyone, carries herself with grace, and loves with a full heart. I still catch myself just looking at her sometimes, thinking, &quot;Wow… I really get to marry her.&quot;
          </p>
          <p className="text-lg text-gray-700">
            This isn&apos;t just about a wedding. It&apos;s about building a life with someone I truly love, respect, and admire. And I couldn&apos;t be more excited to walk into that future with her.
          </p>
        </div>
      </div>
    </div>
  );
}