import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import LoginModal from './LoginModal';
import MusicPlayer from './MusicPlayer';
import { useAuth } from '../hooks/useAuth';

export default function Layout({ children, setActiveSection }) {
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Header 
        setActiveSection={setActiveSection} 
        setShowLoginModal={setShowLoginModal} 
      />
      <main className="flex-grow">{children}</main>
      <Footer />
      
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
        />
      )}
      
      <MusicPlayer />
    </div>
  );
}