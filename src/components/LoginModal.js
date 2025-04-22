// src/components/LoginModal.js
import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [inviteCode, setInviteCode] = useState('');
  const [guestName, setGuestName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inviteCode || !guestName) {
      setError('Both invite code and name are required');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // In a real app, you would call your API here
      // For this demo, we'll simulate API validation with a timeout
      
      setTimeout(() => {
        // For demo purposes, accept any code
        login(inviteCode, guestName);
        setIsLoading(false);
        onClose();
      }, 1000);
      
      // With a real API, you would do:
      /*
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inviteCode, guestName }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        login(inviteCode, guestName);
        onClose();
      } else {
        setError(data.message || 'Invalid invite code');
      }
      */
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-teal-700">Guest Login</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-600 rounded border border-red-200">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="inviteCode" className="block text-gray-700 mb-2">Invite Code</label>
            <input
              type="text"
              id="inviteCode"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              disabled={isLoading}
              placeholder="Enter your invite code"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="guestName" className="block text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              disabled={isLoading}
              placeholder="Enter your name"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors disabled:bg-teal-300"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-4 text-sm text-gray-500 text-center">
          <p>For demo, use any code like &quot;WEDDING2025&quot;</p>
        </div>
      </div>
    </div>
  );
}