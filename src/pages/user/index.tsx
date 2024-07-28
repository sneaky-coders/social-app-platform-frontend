import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  IconUser, 
  IconMail, 
  IconPhone, 
  IconAddressBook, 
  IconCalendar, 
  IconMap, 
  IconGlobe, 
  IconGenderNeutrois, 
  IconPencil 
} from '@tabler/icons-react';
import { useAuth } from '../../context/AuthContext'; // Adjust the path as necessary

interface UserProfileData {
  username?: string;
  email: string;
  alternateEmail?: string;
  contactNumber?: string;
  alternateContact?: string;
  addressLine1?: string;
  addressLine2?: string;
  bloodGroup?: string;
  dateOfBirth?: string;
  country?: string;
  state?: string;
  religion?: string;
  gender?: string;
}

const UserPage: React.FC = () => {
  const { email } = useAuth(); // Use email instead of username
  console.log('Retrieved email from AuthContext:', email); // Debug log

  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!email) {
        setError('No email found.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<UserProfileData>(`/api/users/by-email/${email}`);
        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  if (loading) return <div className="p-6 bg-white rounded-lg shadow-md">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userData && (
          <>
            <ProfileCard icon={<IconUser size={24} />} title="Username" content={userData.username} />
            <ProfileCard icon={<IconMail size={24} />} title="Email" content={userData.email} />
            <ProfileCard icon={<IconPhone size={24} />} title="Contact Number" content={userData.contactNumber} />
            <ProfileCard icon={<IconAddressBook size={24} />} title="Address" content={`${userData.addressLine1 || ''} ${userData.addressLine2 || ''}`} />
            <ProfileCard icon={<IconCalendar size={24} />} title="Date of Birth" content={userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : 'Not provided'} />
            <ProfileCard icon={<IconGlobe size={24} />} title="Country" content={userData.country} />
            <ProfileCard icon={<IconMap size={24} />} title="State" content={userData.state} />
            <ProfileCard icon={<IconPencil size={24} />} title="Religion" content={userData.religion} />
            <ProfileCard icon={<IconGenderNeutrois size={24} />} title="Gender" content={userData.gender} />
            <ProfileCard icon={<IconPencil size={24} />} title="Blood Group" content={userData.bloodGroup} />
          </>
        )}
      </div>
    </div>
  );
};

const ProfileCard: React.FC<{ icon: React.ReactNode; title: string; content?: string }> = ({ icon, title, content }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-700">{content ? content : 'Not provided'}</p>
  </div>
);

export default UserPage;
