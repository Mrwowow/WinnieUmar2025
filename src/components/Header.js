// src/components/Header.js
import { useState } from 'react';
import { Menu, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Header({ setActiveSection, setShowLoginModal }) {
  const { isLoggedIn, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: 'Home', section: 'home' },
    { label: 'Our Story', section: 'ourStory' },
    { label: 'Wedding Programme', section: 'programme' },
    { label: 'Bridal Party', section: 'bridalParty' },
    { label: 'Pre-wedding', section: 'preWedding' },
    { label: 'Live Event Gallery', section: 'gallery' }
  ];

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
        <nav className="hidden md:flex items-center space-x-4">
          {menuItems.map((item) => (
            <button 
              key={item.section}
              onClick={() => setActiveSection(item.section)} 
              className="text-gray-700 hover:text-teal-700 whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-3 ml-4">
              {user?.role === 'admin' && (
                <div className="flex items-center text-yellow-600">
                  <Shield className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">Admin</span>
                </div>
              )}
              <button 
                onClick={logout} 
                className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowLoginModal(true)} 
              className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors ml-4"
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
          {menuItems.map((item) => (
            <button 
              key={item.section}
              onClick={() => { 
                setActiveSection(item.section); 
                setIsMenuOpen(false); 
              }} 
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 border-b border-gray-100"
            >
              {item.label}
            </button>
          ))}
          
          <div className="border-t border-gray-200 px-4 py-2">
            {isLoggedIn ? (
              <div className="space-y-2">
                {user?.role === 'admin' && (
                  <div className="flex items-center justify-center text-yellow-600 py-2">
                    <Shield className="h-5 w-5 mr-1" />
                    <span className="text-sm font-medium">Admin Mode</span>
                  </div>
                )}
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }} 
                  className="w-full bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors"
                >
                  Logout
                </button>
              </div>
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