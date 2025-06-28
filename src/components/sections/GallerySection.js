import { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, Trash2, RefreshCw, Search, Calendar, User, Heart, Eye, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import UploadModal from '../UploadModal';
import Image from 'next/image';
import { galleryService } from '../../services/galleryService';

export default function GallerySection() {
  const { isLoggedIn, user } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        console.log('Fetching gallery photos, page:', page);
        const response = await galleryService.getPhotos(page);
        console.log('Fetch response:', response);
        
        if (page === 1) {
          console.log('Setting photos for page 1:', response.photos?.length || 0, 'photos');
          setPhotos(response.photos || []);
        } else {
          console.log('Appending photos for page', page, ':', response.photos?.length || 0, 'photos');
          setPhotos(prev => [...prev, ...(response.photos || [])]);
        }
        
        setHasMore(response.hasMore || false);
        console.log('Has more photos:', response.hasMore || false);
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
    // Show success message
    setTimeout(() => {
      alert('Photo added successfully!');
    }, 500);
  };

  const refreshGallery = async () => {
    setRefreshing(true);
    setPage(1);
    setPhotos([]);
    try {
      console.log('Refreshing gallery...');
      const response = await galleryService.getPhotos(1);
      console.log('Refresh response:', response);
      setPhotos(response.photos || []);
      setHasMore(response.hasMore || false);
    } catch (error) {
      console.error('Error refreshing gallery:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    setShowLightbox(false);
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const photoDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - photoDate) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return photoDate.toLocaleDateString();
  };

  // Filter and sort photos
  const filteredAndSortedPhotos = photos
    .filter(photo => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        photo.caption?.toLowerCase().includes(searchLower) ||
        photo.uploadedBy?.name?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt || a.timestamp) - new Date(b.createdAt || b.timestamp);
        case 'newest':
        default:
          return new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp);
      }
    });

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
        
        {/* Stats Bar */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-md px-6 py-3 flex items-center space-x-6">
            <div className="flex items-center text-gray-600">
              <ImageIcon className="h-5 w-5 mr-2" />
              <span className="font-medium">{photos.length} Photos</span>
            </div>
            {photos.length > 0 && (
              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">
                  {new Set(photos.map(p => p.uploadedBy?.name).filter(Boolean)).size} Contributors
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button 
            onClick={() => setShowUploadModal(true)} 
            className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition-colors flex items-center shadow-lg transform hover:scale-105 transition-transform"
          >
            <Camera className="h-6 w-6 mr-2" />
            <span className="font-semibold">Add Your Photos</span>
          </button>
          
          <button 
            onClick={refreshGallery}
            disabled={refreshing}
            className="bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
        
        {/* Search and Filter Controls */}
        {photos.length > 0 && (
          <div className="max-w-2xl mx-auto mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by caption or photographer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            
            {/* Sort Options */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setSortBy('newest')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'newest'
                    ? 'bg-teal-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Newest First
              </button>
              <button
                onClick={() => setSortBy('oldest')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'oldest'
                    ? 'bg-teal-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Oldest First
              </button>
            </div>
          </div>
        )}
      </div>
      
      {loading && page === 1 ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse text-teal-700">Loading gallery...</div>
        </div>
      ) : filteredAndSortedPhotos.length === 0 && searchTerm ? (
        <div className="text-center py-16">
          <Search className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-2">No photos found</p>
          <p className="text-gray-500 mb-6">Try adjusting your search terms</p>
          <button
            onClick={() => setSearchTerm('')}
            className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : filteredAndSortedPhotos.length === 0 ? (
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
            {filteredAndSortedPhotos.map((photo) => (
              <div key={photo.id || photo._id} className="bg-white rounded-lg overflow-hidden shadow-md relative group hover:shadow-xl transition-shadow duration-300">
                <div className="w-full aspect-square relative cursor-pointer" onClick={() => openLightbox(photo)}>
                  <Image 
                    src={photo.url} 
                    alt={photo.caption || `Gallery photo`} 
                    layout="fill" 
                    objectFit="cover" 
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Overlay with view icon */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {user?.role === 'admin' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePhoto(photo.id || photo._id);
                      }}
                      disabled={deleteLoading[photo.id || photo._id]}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:bg-gray-400 hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  
                  {/* New indicator for recent photos */}
                  {new Date(photo.createdAt || photo.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000) && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      New
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  {photo.caption && (
                    <p className="text-sm text-gray-700 mb-2 font-medium line-clamp-2">{photo.caption}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>{photo.uploadedBy?.name || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{getTimeAgo(photo.createdAt || photo.timestamp)}</span>
                    </div>
                  </div>
                  
                  {/* Like button (placeholder for future feature) */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <button className="flex items-center text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4 mr-1" />
                      <span className="text-xs">Like</span>
                    </button>
                    <button 
                      onClick={() => openLightbox(photo)}
                      className="text-teal-600 hover:text-teal-700 transition-colors text-xs font-medium"
                    >
                      View Full
                    </button>
                  </div>
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
      
      {/* Photo Lightbox Modal */}
      {showLightbox && selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl max-h-full w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 text-white">
              <div>
                <h3 className="text-lg font-semibold">{selectedPhoto.caption || 'Wedding Photo'}</h3>
                <p className="text-sm text-gray-300">
                  By {selectedPhoto.uploadedBy?.name || 'Anonymous'} • {getTimeAgo(selectedPhoto.createdAt || selectedPhoto.timestamp)}
                </p>
              </div>
              <button
                onClick={closeLightbox}
                className="text-white hover:text-gray-300 p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Image */}
            <div className="flex-1 relative">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || 'Wedding photo'}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
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