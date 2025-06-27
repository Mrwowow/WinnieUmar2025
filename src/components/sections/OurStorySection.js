// File: src/components/sections/OurStorySection.js
import Image from 'next/image';

export default function OurStorySection() {
  return (
    <div className="bg-white">
      {/* Main Title */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-800 text-center mb-4">
          Our Story
        </h1>
        <div className="w-24 h-1 bg-teal-600 mx-auto mb-12"></div>
      </div>

      {/* About Her Section - From Omar's Perspective */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-teal-800 mb-2 text-center">About Her</h2>
          <p className="text-center text-gray-600 mb-8 italic">From Omar&apos;s perspective</p>
          
          <div className="flex flex-col md:flex-row-reverse items-center max-w-6xl mx-auto">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
              <div className="bg-gray-200 h-96 rounded-lg overflow-hidden relative shadow-lg">
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
      </div>

      {/* Decorative Divider */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="h-px bg-gray-300 flex-grow"></div>
          <div className="px-4">
            <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="h-px bg-gray-300 flex-grow"></div>
        </div>
      </div>

      {/* About Him Section - From Winnie's Perspective */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-teal-800 mb-2 text-center">About Him</h2>
          <p className="text-center text-gray-600 mb-8 italic">From Winnie&apos;s perspective</p>
          
          <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="bg-gray-200 h-96 rounded-lg overflow-hidden relative shadow-lg">
                <Image 
                  src="/images/umar.jpg" 
                  alt="Omar" 
                  layout="fill" 
                  objectFit="cover" 
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <p className="text-lg text-gray-700 mb-6">
                When people talk about love at first sight, I laugh, because this was definitely not that kind of story for me.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                I met Omar at a time when I had zero interest in romance. I wasn&apos;t looking for anything serious. I had just finally gone on leave from work and needed a break from the same old routine. So I opened my Bumble app, swiped, and thought, &quot;Let me meet a stranger, gist over drinks, and then go back to my life. No strings, no stories.&quot;
              </p>
              <p className="text-lg text-gray-700 mb-6">
                That stranger turned out to be Omar. We talked over the phone and agreed he could come pick me up in the evening for drinks.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                He came to pick me up from my house. I got in the car, saw what he was wearing, this man looked like he was on his way to paint a house. No effort. No style. Just…chaos. I, on the other hand, wasn&apos;t dressed to impress, but I wore a simple, nice dress. One look at him and I went back inside, changed into jeans and a t-shirt, and told myself, &quot;Let me not waste this dress on this one.&quot;
              </p>
              <p className="text-lg text-gray-700 mb-6">
                By the time I came back out my kid sister had finished interrogating him and we were off to the weirdest first date ever. We got to the place, and the gist began and it just flowed.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                There was something about him; the way he listened, the way he laughed, the way it felt like I had known him for years. I&apos;d never felt so comfortable, so quickly. It didn&apos;t feel like a first date. It felt like catching up with someone who had always been in my life, there was no pressure.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Still, I ran emotionally. I wasn&apos;t trying to fall for anyone, but Omar? He was and still is consistent, gentle, and Intentional. He just always said &quot;keep running o. I will still marry you&quot; and i always thought to myself and even told him &quot;can never be me!&quot;. Guess who the joke is on now and I don&apos;t know if I&apos;ll ever hear the last of it.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                He never gave up. And that&apos;s just who he is. Whether it&apos;s love, work, or faith, he stays. He tries. He believes. Until things work.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                He&apos;s a man of bold faith, the kind that sometimes scares me with how real and grounded it is. He&apos;s incredibly humble, And stubborn? Whew. Like a goat. 😂 But that same stubbornness is what makes him unwavering. Loyal. Solid.
              </p>
              <p className="text-lg text-gray-700">
                I like him so much. I trust him. I admire him. I laugh with him. I cry with him. He&apos;s my friend. And somehow through one random swipe on a hopeless app, and a date that wasn&apos;t supposed to mean anything, I found the love of my life.
              </p>
              <p className="text-lg text-gray-700 mt-6">
                I&apos;m so grateful it&apos;s him. So happy I stopped running. So excited for everything ahead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}