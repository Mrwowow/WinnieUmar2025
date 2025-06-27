import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AdminLogin from './AdminLogin';

export default function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('WinnieOmar@love.com');
  const [password, setPassword] = useState('WinnieOmar2025');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    const result = await login(email, password);
    
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleQuickFill = (type) => {
    if (type === 'admin') {
      setEmail('admin@wedding.com');
      setPassword('admin123');
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
        
        {process.env.NODE_ENV === 'development' && (
          <AdminLogin onClose={onClose} />
        )}
        
        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-600 rounded border border-red-200">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              disabled={isLoading}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              disabled={isLoading}
              placeholder="Enter your password"
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
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-xs text-gray-600 font-semibold mb-2">Quick Fill (Dev Only):</p>
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded mr-2"
            >
              Admin Credentials
            </button>
          </div>
        )}
        
        <div className="mt-4 text-sm text-gray-500 text-center">
          <p>Don&apos;t have an account? Contact the wedding organizers for access.</p>
        </div>
      </div>
    </div>
  );
}