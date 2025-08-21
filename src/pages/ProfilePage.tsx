import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit3, FiUser, FiMail, FiPhone, FiCalendar, FiAward } from 'react-icons/fi';

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  // Mock user data - in production this would come from your state management or API
  const userData = {
    fullName: 'John Doe',
    nickname: 'Johnny',
    email: 'john.doe@example.com',
    phone: '+1 555 123 4567',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    points: 125,
    profileImage: null
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-mobile mx-auto px-4 pt-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-text-primary">Profile</h1>
          <button
            onClick={handleEditProfile}
            className="p-2 rounded-full bg-primary text-white hover:bg-primary-600 transition-colors"
          >
            <FiEdit3 size={20} />
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          {/* Profile Image and Basic Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden">
              {userData.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FiUser size={32} className="text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-text-primary mb-1">
                {userData.fullName}
              </h2>
              <p className="text-text-secondary mb-2">@{userData.nickname}</p>
              <div className="flex items-center gap-2">
                <FiAward size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">
                  {userData.points} points
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <FiMail size={20} className="text-primary" />
              <div className="flex-1">
                <p className="text-xs text-text-secondary mb-1">Email</p>
                <p className="text-text-primary font-medium">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <FiPhone size={20} className="text-primary" />
              <div className="flex-1">
                <p className="text-xs text-text-secondary mb-1">Phone</p>
                <p className="text-text-primary font-medium">{userData.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <FiCalendar size={20} className="text-primary" />
              <div className="flex-1">
                <p className="text-xs text-text-secondary mb-1">Date of Birth</p>
                <p className="text-text-primary font-medium">
                  {new Date(userData.dateOfBirth).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <FiUser size={20} className="text-primary" />
              <div className="flex-1">
                <p className="text-xs text-text-secondary mb-1">Gender</p>
                <p className="text-text-primary font-medium">{userData.gender}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={handleEditProfile}
              className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <FiEdit3 size={20} className="text-primary" />
              <span className="text-text-primary font-medium">Edit Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;