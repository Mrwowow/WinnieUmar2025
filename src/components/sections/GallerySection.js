// File: src/components/sections/GallerySection.js
import { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import UploadModal from '../UploadModal';
import Image from 'next/image';

export default function GallerySection() {
  const { isLoggedIn } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch photos from the API
    const fetchPhotos = async () => {
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          // This would be replaced with actual API data
          setPhotos([]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching gallery photos:', error);
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchPhotos();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const handleAddPhoto = (photoUrl) => {
    // In a real app, this would come from the server after upload
    const newPhoto = {
      id: Date.now().toString(),
      url: photoUrl,
      uploadedBy: "You",
      timestamp: new Date().toISOString()
    };
    
    setPhotos([newPhoto, ...photos]);
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="max-w-md text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-teal-800 mb-4">Guest Access Required</h2>
          <p className="text-gray-700 mb-6">
            Please log in with your invite code to view and contribute to the live event gallery.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-teal-800">Live Event Gallery</h2>
        <button 
          onClick={() => setShowUploadModal(true)} 
          className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors flex items-center"
        >
          <Camera className="h-5 w-5 mr-2" />
          Add Photo
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse text-teal-700">Loading gallery...</div>
        </div>
      ) : photos.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <ImageIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" aria-hidden="true" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">No Photos Yet</h3>
          <p className="text-gray-600 mb-6">Be the first to add photos to the live gallery!</p>
          <button 
            onClick={() => setShowUploadModal(true)} 
            className="bg-teal-700 text-white px-6 py-3 rounded-md hover:bg-teal-800 transition-colors"
          >
            Upload a Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="w-full aspect-square relative">
                <Image 
                  src={photo.url} 
                  alt={`Gallery photo by ${photo.uploadedBy}`} 
                  layout="fill" 
                  objectFit="cover" 
                />
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-500">Uploaded by: {photo.uploadedBy}</p>
                <p className="text-xs text-gray-400">
                  {new Date(photo.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)} 
          onPhotoAdded={handleAddPhoto}
        />
      )}
    </div>
  );
}