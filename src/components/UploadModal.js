// File: src/components/UploadModal.js
import { useState } from 'react';
import { X, Camera, Upload } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import Image from 'next/image';

export default function UploadModal({ onClose, onPhotoAdded }) {
  const [newPhoto, setNewPhoto] = useState(null);
  const { isCameraActive, takePhoto } = useCamera();

  const handleUpload = async () => {
    // In a real app, you would upload the photo to a server
    if (newPhoto) {
      try {
        // Simulate API call
        setTimeout(() => {
          // After successful upload, add to gallery
          onPhotoAdded(newPhoto);
          onClose();
        }, 1000);
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }
  };

  const simulateTakePhoto = () => {
    takePhoto()
      .then(photoUrl => {
        setNewPhoto(photoUrl);
      })
      .catch(error => {
        console.error('Error taking photo:', error);
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-teal-700">Add to Gallery</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {!newPhoto ? (
          <div className="flex flex-col items-center">
            <div className="mb-6 w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative">
              {isCameraActive ? (
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                  <div className="animate-pulse text-white">Taking photo...</div>
                </div>
              ) : (
                <Camera className="h-16 w-16 text-gray-400" />
              )}
            </div>
            <div className="flex space-x-4 w-full">
              <button 
                onClick={simulateTakePhoto} 
                className="flex-1 bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors flex items-center justify-center"
              >
                <Camera className="h-5 w-5 mr-2" />
                Take Photo
              </button>
              <label 
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center cursor-pointer"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-6 w-full aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <Image 
                src={newPhoto} 
                alt="New photo" 
                layout="fill" 
                objectFit="cover" 
              />
            </div>
            <div className="flex space-x-4 w-full">
              <button 
                onClick={() => setNewPhoto(null)} 
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Retake
              </button>
              <button 
                onClick={handleUpload} 
                className="flex-1 bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors"
              >
                Add to Gallery
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}