import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiCamera, FiCalendar, FiMail, FiPhone, FiUser, FiAward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { profileService, ProfileData } from '../services/profileService';

interface ProfileFormData {
  name: string;
  username: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  countryCode: string;
  gender: string;
  points: number;
}

const ProfileFormPage = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    username: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    countryCode: '+1',
    gender: '',
    points: 0
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});

  // ID du profil - en production, cela viendrait de l'authentification
  const profileId = 1;

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setInitialLoading(true);
        const profile = await profileService.getProfile(profileId);
        
        if (profile) {
          // Convertir la date ISO en format yyyy-MM-dd pour l'input date
          const formatDateForInput = (dateString: string) => {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
          };

          setFormData({
            name: profile.name,
            username: profile.username,
            dateOfBirth: formatDateForInput(profile.dateOfBirth),
            email: profile.email,
            phone: profile.phone,
            countryCode: '+1', // Par défaut
            gender: profile.gender,
            points: profile.points
          });

          // Charger l'image de profil si elle existe
          if (profile.profileImage) {
            setProfileImage(`http://localhost:5000${profile.profileImage}`);
          }
        }
      } catch (err) {
        console.error('Erreur lors du chargement du profil:', err);
        // Continuer avec un formulaire vide en cas d'erreur
      } finally {
        setInitialLoading(false);
      }
    };

    loadProfile();
  }, [profileId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        setProfileImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof ProfileFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      const profileData: Omit<ProfileData, 'id'> = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as 'Male' | 'Female' | 'Other',
        points: formData.points
      };

      // Utiliser saveProfile qui gère automatiquement POST vs PUT avec image
      await profileService.saveProfile(profileId, profileData, profileImageFile || undefined);

      alert('Profil sauvegardé avec succès!');
      navigate('/profile');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde du profil. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  const countryCodes = [
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+33', country: 'FR', flag: '🇫🇷' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+49', country: 'DE', flag: '🇩🇪' },
    { code: '+81', country: 'JP', flag: '🇯🇵' },
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-mobile mx-auto px-4 pt-12 pb-32">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiArrowLeft size={24} className="text-text-primary" />
          </button>
          <h1 className="text-xl font-semibold text-text-primary">Fill Your Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiUser size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 transition-colors shadow-lg">
                <FiCamera size={20} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your name"
                className={`w-full px-4 py-4 bg-white rounded-xl border-2 transition-colors focus:outline-none ${
                  errors.name 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-primary'
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Enter your username"
                className={`w-full px-4 py-4 bg-white rounded-xl border-2 transition-colors focus:outline-none ${
                  errors.username 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-primary'
                }`}
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className={`w-full px-4 py-4 bg-white rounded-xl border-2 transition-colors focus:outline-none ${
                  errors.dateOfBirth 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-primary'
                }`}
              />
              <FiCalendar size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                className={`w-full px-4 py-4 bg-white rounded-xl border-2 transition-colors focus:outline-none ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-primary'
                }`}
              />
              <FiMail size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Phone Number
            </label>
            <div className="flex gap-3">
              <select
                value={formData.countryCode}
                onChange={(e) => handleInputChange('countryCode', e.target.value)}
                className="px-3 py-4 bg-white rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <div className="relative flex-1">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="000 000 000"
                  className={`w-full px-4 py-4 bg-white rounded-xl border-2 transition-colors focus:outline-none ${
                    errors.phone 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-primary'
                  }`}
                />
                <FiPhone size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Gender
            </label>
            <div className="relative">
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className={`w-full px-4 py-4 bg-white rounded-xl border-2 transition-colors focus:outline-none appearance-none ${
                  errors.gender 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-primary'
                }`}
              >
                <option value="">Select your gender</option>
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
            )}
          </div>

          {/* Points Display */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Points
            </label>
            <div className="relative">
              <div className="w-full px-4 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 flex items-center justify-between">
                <span className="text-text-primary font-medium">{formData.points} points</span>
                <FiAward size={20} className="text-accent" />
              </div>
              <p className="mt-1 text-xs text-text-secondary">
                Points increase by +1 each time you gain something
              </p>
            </div>
          </div>

          {/* Additional Action Button */}
          <div className="pt-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors border-2 ${
                loading 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed border-gray-400' 
                  : 'bg-gray-100 text-text-primary hover:bg-gray-200 border-gray-200'
              }`}
            >
              {loading ? 'Sauvegarde...' : 'Modifier le profil'}
            </button>
          </div>
        </form>
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-[env(safe-area-inset-bottom)] z-50">
        <div className="max-w-mobile mx-auto">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors ${
              loading 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-primary text-white hover:bg-primary-600'
            }`}
          >
            {loading ? 'Sauvegarde...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileFormPage;