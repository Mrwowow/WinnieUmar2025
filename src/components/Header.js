// src/components/Header.js
import { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import NavDropdown from './NavDropdown';
import { useAuth } from '../hooks/useAuth';

export default function Header({ setActiveSection, setShowLoginModal }) {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    about: false,
    programme: false,
    photoshoot: false
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (menu) => {
    // Close all other dropdowns when opening a new one
    const allClosed = Object.keys(dropdownOpen).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    
    setDropdownOpen({
      ...allClosed,
      [menu]: !dropdownOpen[menu]
    });
  };

  const navItems = {
    about: {
      label: 'About Us',
      items: [
        { label: 'About Him', section: 'aboutHim' },
        { label: 'About Her', section: 'aboutHer' }
      ]
    },
    programme: {
      label: 'Programme',
      items: [
        { label: 'Traditional Wedding', section: 'traditional' },
        { label: 'Church Wedding', section: 'church' }
      ]
    },
    photoshoot: {
      label: 'Photoshoot',
      items: [
        { label: 'Pre-wedding', section: 'preWedding' },
        { label: 'Live Event Gallery', section: 'gallery' }
      ]
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 
            className="text-2xl font-bold text-teal-700 cursor-pointer" 
            onClick={() => setActiveSection('home')}
          >
            Winnie & Omar
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => setActiveSection('home')} 
            className="text-gray-700 hover:text-teal-700"
          >
            Home
          </button>
          
          {Object.entries(navItems).map(([key, { label, items }]) => (
            <NavDropdown 
              key={key}
              label={label}
              items={items}
              isOpen={dropdownOpen[key]}
              onToggle={() => toggleDropdown(key)}
              onItemClick={(section) => {
                setActiveSection(section);
                setDropdownOpen(prev => ({
                  ...prev,
                  [key]: false
                }));
              }}
            />
          ))}
          
          {isLoggedIn ? (
            <button 
              onClick={logout} 
              className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={() => setShowLoginModal(true)} 
              className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors"
            >
              Guest Login
            </button>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          <Menu className="h-6 w-6 text-teal-700" />
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <button 
            onClick={() => { 
              setActiveSection('home'); 
              setIsMenuOpen(false); 
            }} 
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50"
          >
            Home
          </button>
          
          {Object.entries(navItems).map(([key, { label, items }]) => (
            <div key={key} className="border-t border-gray-100">
              <button 
                onClick={() => toggleDropdown(key)} 
                className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-teal-50"
              >
                {label} 
                <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen[key] ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen[key] && (
                <div className="bg-gray-50 pl-8">
                  {items.map((item) => (
                    <button 
                      key={item.section}
                      onClick={() => { 
                        setActiveSection(item.section); 
                        setIsMenuOpen(false); 
                      }} 
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="border-t border-gray-100 px-4 py-2">
            {isLoggedIn ? (
              <button 
                onClick={logout} 
                className="w-full bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button 
                onClick={() => {
                  setShowLoginModal(true); 
                  setIsMenuOpen(false);
                }} 
                className="w-full bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors"
              >
                Guest Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}