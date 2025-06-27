import { useState } from 'react';
import { Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin({ onClose }) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdminLogin = async () => {
    setIsLoading(true);
    setError('');

    // Use default admin credentials
    const result = await login('admin@wedding.com', 'admin123');
    
    if (result.success) {
      onClose && onClose();
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <Shield className="h-5 w-5 text-yellow-600 mr-2" />
        <h3 className="font-semibold text-yellow-800">Development Admin Access</h3>
      </div>
      
      <p className="text-sm text-yellow-700 mb-3">
        Quick admin login for development testing
      </p>
      
      {error && (
        <div className="mb-3 p-2 bg-red-50 text-red-600 rounded border border-red-200 text-sm">
          {error}
        </div>
      )}
      
      <button
        onClick={handleAdminLogin}
        disabled={isLoading}
        className="w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors disabled:bg-yellow-400 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging in as Admin...
          </>
        ) : (
          <>
            <Shield className="h-4 w-4 mr-2" />
            Login as Admin
          </>
        )}
      </button>
      
      <div className="mt-2 text-xs text-yellow-600">
        Email: admin@wedding.com | Password: admin123
      </div>
    </div>
  );
}