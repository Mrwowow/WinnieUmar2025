import { useState } from 'react';
import { X, Camera, Upload } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import Image from 'next/image';
import { galleryService } from '../services/galleryService';

export default function UploadModal({ onClose, onPhotoAdded }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const { isCameraActive, takePhoto } = useCamera();

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a photo');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      if (caption) {
        formData.append('caption', caption);
      }

      const response = await galleryService.uploadPhoto(formData);
      onPhotoAdded(response.photo);
      onClose();
    } catch (error) {
      console.error('Error uploading photo:', error);
      setError(error.response?.data?.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const simulateTakePhoto = async () => {
    try {
      const photoUrl = await takePhoto();
      
      // Convert base64 to blob for upload
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      setSelectedFile(file);
      setPreview(photoUrl);
    } catch (error) {
      console.error('Error taking photo:', error);
      setError('Failed to take photo');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
      setError('');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    setCaption('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-teal-700">Add to Gallery</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-600 rounded border border-red-200">
            {error}
          </div>
        )}
        
        {!preview ? (
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
                disabled={uploading}
                className="flex-1 bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors flex items-center justify-center disabled:bg-gray-400"
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
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="mb-4 w-full aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <Image 
                src={preview} 
                alt="New photo" 
                layout="fill" 
                objectFit="cover" 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="caption" className="block text-gray-700 mb-2">
                Caption (optional)
              </label>
              <input
                type="text"
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Add a caption..."
                disabled={uploading}
              />
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={resetSelection} 
                disabled={uploading}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors disabled:bg-gray-100"
              >
                Choose Different
              </button>
              <button 
                onClick={handleUpload} 
                disabled={uploading}
                className="flex-1 bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors disabled:bg-gray-400"
              >
                {uploading ? 'Uploading...' : 'Add to Gallery'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}