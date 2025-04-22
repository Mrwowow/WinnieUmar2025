import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  // Check for existing login on page load
  useEffect(() => {
    const storedAuth = localStorage.getItem('weddingGuestAuth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsLoggedIn(true);
      setGuestName(authData.name);
      setInviteCode(authData.code);
    }
  }, []);

  const login = (code, name) => {
    // In a real app, you would validate the invite code with your backend
    setIsLoggedIn(true);
    setGuestName(name);
    setInviteCode(code);
    
    // Store auth data in localStorage
    localStorage.setItem('weddingGuestAuth', JSON.stringify({
      code,
      name
    }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setGuestName('');
    setInviteCode('');
    localStorage.removeItem('weddingGuestAuth');
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      guestName, 
      inviteCode,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}