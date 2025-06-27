import { useState, useEffect } from 'react';
import { Users, Heart, Crown, Flower, UserCheck, X, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { bridalPartyService } from '../../services/bridalPartyService';


export default function BridalPartySection() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bridalPartyService.getMembers();
      
      // Handle different response formats
      if (Array.isArray(response)) {
        setMembers(response);
      } else if (response?.members) {
        setMembers(response.members);
      } else if (response?.data) {
        setMembers(response.data);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.error('Error fetching bridal party members:', error);
      
      // In development, show mock data if API fails
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock data for development');
        setMembers([
          {
            _id: '1',
            name: 'Sarah Johnson',
            role: 'maid_of_honor',
            bio: 'Best friend since childhood. We\'ve been through everything together!',
            maritalStatus: 'engaged',
            toast: 'Wishing you both a lifetime of love and happiness!',
            imageUrl: '/images/winniepic.jpg'
          },
          {
            _id: '2',
            name: 'Michael Williams',
            role: 'best_man',
            bio: 'Brothers from another mother. Known each other since college.',
            maritalStatus: 'married',
            toast: 'To the happy couple - may your love story be as legendary as your friendship!',
            imageUrl: '/images/umar.jpg'
          },
          {
            _id: '3',
            name: 'Emily Davis',
            role: 'bridesmaid',
            bio: 'College roommate and partner in crime.',
            maritalStatus: 'single',
            toast: 'So happy to celebrate this special day with you!'
          }
        ]);
        setError(null);
      } else {
        setError('Unable to load bridal party members. Please try again later.');
        setMembers([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'maid_of_honor':
        return <Crown className="h-5 w-5 text-pink-600" />;
      case 'best_man':
        return <Crown className="h-5 w-5 text-blue-600" />;
      case 'bridesmaid':
        return <Heart className="h-5 w-5 text-pink-500" />;
      case 'groomsman':
        return <UserCheck className="h-5 w-5 text-blue-500" />;
      case 'flower_girls':
        return <Flower className="h-5 w-5 text-purple-500" />;
      case 'asoebi_girls':
        return <Heart className="h-5 w-5 text-teal-500" />;
      case 'men_in_agbada':
        return <Users className="h-5 w-5 text-indigo-600" />;
      default:
        return <Users className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRoleLabel = (role) => {
    const labels = {
      'maid_of_honor': 'Maid of Honor',
      'best_man': 'Best Man',
      'bridesmaid': 'Bridesmaid',
      'groomsman': 'Groomsmen',
      'flower_girls': 'Flower Girl',
      'asoebi_girls': 'Asoebi Girl',
      'men_in_agbada': 'Men in Agbada'
    };
    return labels[role] || role;
  };

  const filteredMembers = filter === 'all' 
    ? members 
    : members.filter(member => {
        if (filter === 'bride') {
          return ['maid_of_honor', 'bridesmaid', 'asoebi_girls', 'flower_girls'].includes(member.role);
        } else if (filter === 'groom') {
          return ['best_man', 'groomsman', 'men_in_agbada'].includes(member.role);
        }
        return true;
      });

  const groupedMembers = filteredMembers.reduce((acc, member) => {
    if (!acc[member.role]) {
      acc[member.role] = [];
    }
    acc[member.role].push(member);
    return acc;
  }, {});

  const roleOrder = [
    'maid_of_honor',
    'best_man',
    'bridesmaid',
    'groomsman',
    'asoebi_girls',
    'men_in_agbada',
    'flower_girls'
  ];

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-teal-800 mb-4">Our Bridal Party</h2>
        <div className="w-24 h-1 bg-teal-600 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Meet the amazing friends and family who will stand with us on our special day
        </p>
        
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            filter === 'all' 
              ? 'bg-teal-700 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Members
        </button>
        <button
          onClick={() => setFilter('bride')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            filter === 'bride' 
              ? 'bg-pink-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Bride&apos;s Side
        </button>
        <button
          onClick={() => setFilter('groom')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            filter === 'groom' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Groom&apos;s Side
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchMembers}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center py-16">
          <Users className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600">No bridal party members registered yet.</p>
          <Link href="/bridal-party/register">
            <span className="inline-block mt-6 bg-teal-700 text-white px-6 py-3 rounded-md hover:bg-teal-800 transition-colors cursor-pointer">
              Register Now
            </span>
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {roleOrder.map(role => {
            if (!groupedMembers[role] || groupedMembers[role].length === 0) return null;
            
            return (
              <div key={role} className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
                  {getRoleIcon(role)}
                  <span className="ml-2">{getRoleLabel(role)}{groupedMembers[role].length > 1 ? 's' : ''}</span>
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {groupedMembers[role].map((member, index) => (
                    <div 
                      key={member._id || index} 
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() => {
                        setSelectedMember(member);
                        setShowModal(true);
                      }}
                    >
                      <div className="aspect-w-3 aspect-h-4 bg-gray-100 relative h-64">
                        {member.imageUrl ? (
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            layout="fill"
                            objectFit="cover"
                            className="hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gradient-to-br from-teal-100 to-teal-200">
                            <Users className="h-24 w-24 text-teal-600" />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-1">{member.name}</h4>
                        <p className="text-sm text-gray-600 mb-3 flex items-center">
                          {getRoleIcon(member.role)}
                          <span className="ml-1">{getRoleLabel(member.role)}</span>
                        </p>
                        
                        {member.bio && (
                          <p className="text-sm text-gray-700 mb-3 line-clamp-3">{member.bio}</p>
                        )}
                        
                        {member.maritalStatus && (
                          <p className="text-xs text-gray-500 capitalize">
                            Status: {member.maritalStatus}
                          </p>
                        )}
                        
                        {member.toast && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-600 italic">
                              &quot;{member.toast.length > 100 ? member.toast.substring(0, 100) + '...' : member.toast}&quot;
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 text-center bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-teal-800 mb-4">Want to Join Our Bridal Party?</h3>
        <p className="text-gray-600 mb-6">
          If you&apos;ve been invited to be part of our wedding party, please register your details.
        </p>
        <Link href="/bridal-party/register">
          <span className="inline-flex items-center bg-teal-700 text-white px-6 py-3 rounded-md hover:bg-teal-800 transition-colors cursor-pointer">
            <UserCheck className="h-5 w-5 mr-2" />
            Register as Bridal Party Member
          </span>
        </Link>
      </div>

      {/* Member Details Modal */}
      {showModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-teal-800">{selectedMember.name}</h3>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setSelectedMember(null);
                }}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image Section */}
                <div className="md:w-1/3">
                  <div className="aspect-w-3 aspect-h-4 bg-gray-100 relative h-80 rounded-lg overflow-hidden">
                    {selectedMember.imageUrl ? (
                      <Image
                        src={selectedMember.imageUrl}
                        alt={selectedMember.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-teal-100 to-teal-200">
                        <Users className="h-24 w-24 text-teal-600" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Details Section */}
                <div className="md:w-2/3 space-y-4">
                  <div className="flex items-center mb-4">
                    {getRoleIcon(selectedMember.role)}
                    <span className="ml-2 text-lg font-semibold text-gray-700">
                      {getRoleLabel(selectedMember.role)}
                    </span>
                  </div>
                  
                  {selectedMember.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-2" />
                      <a 
                        href={`mailto:${selectedMember.email}`}
                        className="hover:text-teal-600 transition-colors"
                      >
                        {selectedMember.email}
                      </a>
                    </div>
                  )}
                  
                  {selectedMember.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-5 w-5 mr-2" />
                      <a 
                        href={`tel:${selectedMember.phone}`}
                        className="hover:text-teal-600 transition-colors"
                      >
                        {selectedMember.phone}
                      </a>
                    </div>
                  )}
                  
                  {selectedMember.maritalStatus && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Marital Status</h4>
                      <p className="text-gray-600 capitalize">{selectedMember.maritalStatus}</p>
                    </div>
                  )}
                  
                  {selectedMember.bio && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">About</h4>
                      <p className="text-gray-700 leading-relaxed">{selectedMember.bio}</p>
                    </div>
                  )}
                  
                  {selectedMember.toast && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Toast Message</h4>
                      <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded">
                        <p className="text-gray-700 italic">
                          &quot;{selectedMember.toast}&quot;
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}