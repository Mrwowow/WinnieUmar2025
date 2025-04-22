// src/components/NavDropdown.js
import { ChevronDown } from 'lucide-react';

export default function NavDropdown({ label, items, isOpen, onToggle, onItemClick }) {
  return (
    <div className="relative group">
      <button 
        onClick={onToggle} 
        className="flex items-center text-gray-700 hover:text-teal-700"
      >
        {label} <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          {items.map((item) => (
            <button 
              key={item.section}
              onClick={() => onItemClick(item.section)} 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 w-full text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}