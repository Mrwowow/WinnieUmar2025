// src/components/Footer.js
import { Heart, Calendar, Image as ImageIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Winnie & Omar</h2>
            <p className="text-teal-200">Forever & Always</p>
          </div>
          <div className="flex space-x-4">
            <Heart className="h-6 w-6 text-teal-200" aria-hidden="true" />
            <Calendar className="h-6 w-6 text-teal-200" aria-hidden="true" />
            <ImageIcon className="h-6 w-6 text-teal-200" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-6 text-center text-teal-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Winnie & Omar&apos;s Wedding. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}