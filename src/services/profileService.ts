export interface ProfileData {
  id?: number;
  name: string;
  username: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  gender: string;
  points: number;
  profileImage?: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

class ProfileService {
  async getProfile(id?: number): Promise<ProfileData | null> {
    try {
      if (id) {
        // Fetch specific profile by ID
        const response = await fetch(`${API_BASE_URL}/profiles/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return await response.json();
      } else {
        // Fetch first available profile (existing behavior)
        const response = await fetch(`${API_BASE_URL}/profiles`);
        if (!response.ok) {
          throw new Error('Failed to fetch profiles');
        }
        const profiles = await response.json();
        return profiles.length > 0 ? profiles[0] : null;
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Fallback to mock data if API is unavailable
      return {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        dateOfBirth: '1990-01-01',
        email: 'john@example.com',
        phone: '+1234567890',
        gender: 'male',
        points: 150
      };
    }
  }

  async getProfileById(id: string): Promise<ProfileData | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/profiles/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  async createProfile(profileData: ProfileData, imageFile?: File): Promise<ProfileData> {
    try {
      const formData = new FormData();
      
      // Append profile data
      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== undefined && key !== 'id') {
          formData.append(key, value);
        }
      });

      // Append image file if provided
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }

      const response = await fetch(`${API_BASE_URL}/profiles`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  async updateProfile(id: string, profileData: ProfileData, imageFile?: File): Promise<ProfileData> {
    try {
      const formData = new FormData();
      
      // Append profile data
      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== undefined && key !== 'id') {
          formData.append(key, value);
        }
      });

      // Append image file if provided
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }

      const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  async deleteProfile(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw error;
    }
  }

  async saveProfile(id: number, profileData: Omit<ProfileData, 'id'>, imageFile?: File): Promise<ProfileData> {
    try {
      // Check if profile exists
      const existingProfile = await this.getProfile(id);
      
      if (existingProfile && existingProfile.id) {
        // Update existing profile
        return await this.updateProfile(id.toString(), { ...profileData, id }, imageFile);
      } else {
        // Create new profile
        return await this.createProfile({ ...profileData, id }, imageFile);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  }
}

export const profileService = new ProfileService();
