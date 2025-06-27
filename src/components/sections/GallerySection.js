import { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import UploadModal from '../UploadModal';
import Image from 'next/image';
import { galleryService } from '../../services/galleryService';

export default function GallerySection() {
  const { isLoggedIn, user } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState({});

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await galleryService.getPhotos(page);
        
        if (page === 1) {
          setPhotos(response.photos || []);
        } else {
          setPhotos(prev => [...prev, ...(response.photos || [])]);
        }
        
        setHasMore(response.hasMore || false);
      } catch (error) {
        console.error('Error fetching gallery photos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchPhotos();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, page]);

  const loadMorePhotos = () => {
    setPage(prev => prev + 1);
  };

  const handlePhotoAdded = (newPhoto) => {
    setPhotos([newPhoto, ...photos]);
  };

  const handleDeletePhoto = async (photoId) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    setDeleteLoading(prev => ({ ...prev, [photoId]: true }));
    
    try {
      await galleryService.deletePhoto(photoId);
      setPhotos(photos.filter(photo => photo.id !== photoId));
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo');
    } finally {
      setDeleteLoading(prev => ({ ...prev, [photoId]: false }));
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="max-w-md text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-teal-800 mb-4">Guest Access Required</h2>
          <p className="text-gray-700 mb-6">
            Please log in to view and contribute to the live event gallery.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-teal-800 text-center mb-4">Live Event Gallery</h2>
        <p className="text-gray-600 text-center mb-6">Share your favorite moments from our special day!</p>
        <div className="flex justify-center">
          <button 
            onClick={() => setShowUploadModal(true)} 
            className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition-colors flex items-center shadow-lg transform hover:scale-105 transition-transform"
          >
            <Camera className="h-6 w-6 mr-2" />
            <span className="font-semibold">Add Your Photos</span>
          </button>
        </div>
      </div>
      
      {loading && page === 1 ? (
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
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div key={photo.id || photo._id} className="bg-white rounded-lg overflow-hidden shadow-md relative group">
                <div className="w-full aspect-square relative">
                  <Image 
                    src={photo.url} 
                    alt={photo.caption || `Gallery photo`} 
                    layout="fill" 
                    objectFit="cover" 
                  />
                  {user?.role === 'admin' && (
                    <button
                      onClick={() => handleDeletePhoto(photo.id || photo._id)}
                      disabled={deleteLoading[photo.id || photo._id]}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:bg-gray-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="p-3">
                  {photo.caption && (
                    <p className="text-sm text-gray-700 mb-1">{photo.caption}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    By: {photo.uploadedBy?.name || 'Anonymous'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(photo.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition-colors disabled:bg-gray-400"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}

      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)} 
          onPhotoAdded={handlePhotoAdded}
        />
      )}
      
      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => setShowUploadModal(true)}
        className="fixed bottom-6 right-6 bg-teal-700 text-white p-4 rounded-full shadow-lg hover:bg-teal-800 transition-colors transform hover:scale-110 transition-transform md:hidden z-40"
        aria-label="Add photo"
      >
        <Camera className="h-6 w-6" />
      </button>
    </div>
  );
}