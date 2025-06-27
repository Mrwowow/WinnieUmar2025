import { useState } from 'react';
import { Camera, Upload, X, Save, User, Heart } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import Image from 'next/image';
import { bridalPartyService } from '../services/bridalPartyService';
import { uploadService } from '../services/uploadService';



export default function BridalPartyForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bio: '',
    maritalStatus: '',
    toast: '',
    role: 'bridesmaid',
    imageUrl: '',
    imageFile: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const { isCameraActive, takePhoto } = useCamera();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleImageCapture = async () => {
    try {
      const photoUrl = await takePhoto();
      
      // Convert base64 to blob for upload
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }));
      setImagePreview(photoUrl);
      setShowImageModal(false);
    } catch (error) {
      console.error('Error taking photo:', error);
      setErrors(prev => ({
        ...prev,
        image: 'Failed to take photo'
      }));
    }
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file ? { name: file.name, size: file.size, type: file.type } : 'No file');
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          image: 'Please select an image file'
        }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Image size must be less than 5MB'
        }));
        return;
      }
      
      console.log('Setting image file in form data:', file.name);
      setFormData(prev => {
        const newData = {
          ...prev,
          imageFile: file
        };
        console.log('Updated form data:', { hasImageFile: !!newData.imageFile });
        return newData;
      });
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setShowImageModal(false);
      };
      reader.onerror = () => {
        setErrors(prev => ({
          ...prev,
          image: 'Failed to read file'
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-()]{8,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.bio.trim()) newErrors.bio = 'Short bio is required';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
    if (!formData.toast.trim()) newErrors.toast = 'Toast message is required';
    
    // Make image optional for now while debugging upload issues
    if (process.env.NODE_ENV === 'production') {
      if (!formData.imageFile && !imagePreview) newErrors.image = 'Please upload or take a photo';
    } else {
      // In development, image is optional
      console.log('Dev mode: Image is optional for testing');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors({}); // Clear any previous errors
    
    try {
      console.log('Starting form submission...');
      console.log('Form data at submission:', {
        hasImageFile: !!formData.imageFile,
        imageFileName: formData.imageFile?.name,
        imageFileSize: formData.imageFile?.size,
        imagePreview: !!imagePreview
      });
      
      // First upload the image using admin authentication
      let imageUrl = '';
      if (formData.imageFile) {
        console.log('Uploading image file:', formData.imageFile.name, 'Size:', formData.imageFile.size);
        try {
          console.log('Calling uploadService.uploadBridalPartyImage...');
          const uploadResponse = await uploadService.uploadBridalPartyImage(formData.imageFile);
          console.log('Raw upload response:', uploadResponse);
          console.log('Upload response type:', typeof uploadResponse);
          console.log('Upload response keys:', Object.keys(uploadResponse || {}));
          
          // Handle different response formats
          if (uploadResponse.url) {
            imageUrl = uploadResponse.url;
          } else if (uploadResponse.data && uploadResponse.data.url) {
            imageUrl = uploadResponse.data.url;
          } else if (uploadResponse.imageUrl) {
            imageUrl = uploadResponse.imageUrl;
          } else if (uploadResponse.path) {
            imageUrl = uploadResponse.path;
          } else if (uploadResponse.location) {
            imageUrl = uploadResponse.location;
          } else if (typeof uploadResponse === 'string') {
            imageUrl = uploadResponse;
          } else {
            console.warn('Unknown upload response format:', uploadResponse);
            imageUrl = '';
          }
          
          console.log('Image uploaded successfully:', imageUrl);
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          console.error('Upload error details:', {
            message: uploadError.message,
            status: uploadError.response?.status,
            data: uploadError.response?.data,
            stack: uploadError.stack
          });
          // For now, continue without image rather than failing the whole form
          console.warn('Continuing registration without image due to upload failure');
          imageUrl = ''; // Leave empty, backend should handle this gracefully
        }
      } else {
        console.log('No image file to upload');
      }
      
      // Then submit the form data (also uses admin auth internally)
      const registrationData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        bio: formData.bio,
        maritalStatus: formData.maritalStatus,
        toast: formData.toast,
        role: formData.role
      };
      
      // Only include imageUrl if it's not empty
      if (imageUrl && imageUrl.trim()) {
        // According to BACKEND_INSTRUCTIONS.md, the BridalPartyMember model has imageUrl field
        registrationData.imageUrl = imageUrl;
        console.log('Including image URL in payload (imageUrl field):', imageUrl);
        console.log('Image URL validation - length:', imageUrl.length, 'type:', typeof imageUrl, 'starts with http:', imageUrl.startsWith('http'));
      } else {
        console.log('No image URL to include in payload');
      }
      
      console.log('Submitting registration data:', registrationData);
      console.log('Image URL being sent:', imageUrl);
      console.log('Image URL length:', imageUrl.length);
      console.log('Image URL type:', typeof imageUrl);
      
      const result = await bridalPartyService.registerMember(registrationData);
      console.log('Registration successful!');
      console.log('Registration result:', result);
      
      setShowSuccess(true);
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          bio: '',
          maritalStatus: '',
          toast: '',
          role: 'bridesmaid',
          imageUrl: '',
          imageFile: null
        });
        setImagePreview(null);
        setShowSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMessage;
      
      // Handle specific error types
      if (error.message?.includes('Rate limited')) {
        errorMessage = 'Too many requests. Please wait a few minutes and try again.';
      } else if (error.message?.includes('Authentication failed')) {
        errorMessage = 'Authentication error. Please contact support if this persists.';
      } else if (error.message?.includes('File too large')) {
        errorMessage = 'Image file is too large. Please choose a smaller image (max 5MB).';
      } else if (error.response?.status === 413) {
        errorMessage = 'File is too large. Please choose a smaller image.';
      } else if (error.response?.status === 429) {
        errorMessage = 'Too many requests. Please wait a few minutes and try again.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Authentication failed. Please contact support.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later or contact support.';
      } else {
        errorMessage = error.response?.data?.message || 
                     error.message || 
                     'Failed to submit form. Please try again.';
      }
      
      setErrors(prev => ({
        ...prev,
        form: errorMessage
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-teal-800">Reg Form</h2>
        <p className="text-gray-600 mt-2">Please complete this form to join Winnie & Omar&apos;s Bridal Train and Grooms men</p>
        
      </div>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
          <div className="mr-2">
            <Heart className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="font-medium">Thank you for registering!</p>
            <p className="text-sm">We&apos;re excited to have you be part of our special day.</p>
          </div>
        </div>
      )}
      
      {errors.form && (
        <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1 mb-4 md:mb-0">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="role">
                Your Role
              </label>
              <select 
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="bridesmaid">Bridesmaid</option>
                <option value="maid_of_honor">Maid of Honor</option>
                <option value="groomsman">Groomsman</option>
                <option value="best_man">Best Man</option>
                <option value="men_in_agbada">Men in Agbada</option>
                <option value="asoebi_girls">Asoebi Girls</option>
                <option value="flower_girls">Flower Girls</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="Your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input 
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="Your phone number"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Your Photo <span className="text-red-500">*</span>
              </label>
              <div 
                className={`border-2 border-dashed ${errors.image ? 'border-red-400' : 'border-gray-300'} rounded-lg p-2 flex flex-col items-center justify-center h-48 cursor-pointer hover:border-teal-500 transition-colors`}
                onClick={() => setShowImageModal(true)}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <div className="relative w-full h-full">
                      <Image 
                        src={imagePreview} 
                        alt="Preview" 
                        layout="fill" 
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                    <button 
                      type="button"
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, imageFile: null }));
                        setImagePreview(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <User className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or take a photo</p>
                  </>
                )}
              </div>
              {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="maritalStatus">
                Marital Status <span className="text-red-500">*</span>
              </label>
              <select 
                id="maritalStatus"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className={`w-full border ${errors.maritalStatus ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
              >
                <option value="">Select your status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="engaged">Engaged</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
              {errors.maritalStatus && <p className="mt-1 text-sm text-red-500">{errors.maritalStatus}</p>}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="bio">
            Short Bio <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            className={`w-full border ${errors.bio ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
            placeholder="Tell us a bit about yourself (100-200 words)"
          ></textarea>
          {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio}</p>}
          <p className="text-xs text-gray-500 mt-1">
            {formData.bio.length}/200 characters
          </p>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="toast">
            Toast Message for the Couple <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="toast"
            name="toast"
            value={formData.toast}
            onChange={handleChange}
            rows="4"
            className={`w-full border ${errors.toast ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
            placeholder="Write a heartfelt message or toast for the couple..."
          ></textarea>
          {errors.toast && <p className="mt-1 text-sm text-red-500">{errors.toast}</p>}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-teal-700 text-white px-6 py-3 rounded-md hover:bg-teal-800 transition-colors flex items-center disabled:bg-teal-300"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Submit Registration
              </>
            )}
          </button>
        </div>
      </form>
      
      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-teal-700">Add Your Photo</h3>
              <button 
                onClick={() => setShowImageModal(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
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
                onClick={handleImageCapture} 
                className="flex-1 bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors flex items-center justify-center"
                disabled={isCameraActive}
              >
                <Camera className="h-5 w-5 mr-2" />
                Take Photo
              </button>
              
              <label className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center cursor-pointer">
                <Upload className="h-5 w-5 mr-2" />
                Upload
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                  disabled={isCameraActive}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}