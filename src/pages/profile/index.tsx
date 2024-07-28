import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    IconUser, IconMail, IconPhone, IconAddressBook, 
    IconCalendar, IconGlobe, IconMap, IconGenderNeutrois, 
    IconPencil, IconLoader 
} from '@tabler/icons-react';

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

const UserProfile: React.FC = () => {
    const [formData, setFormData] = useState<UserProfileData>({
        username: '',
        email: '',
        alternateEmail: '',
        contactNumber: '',
        alternateContact: '',
        addressLine1: '',
        addressLine2: '',
        bloodGroup: '',
        dateOfBirth: '',
        country: '',
        state: '',
        religion: '',
        gender: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get<UserProfileData>('/api/users/details', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log('Profile data:', response.data);
                setFormData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Error fetching profile.');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return (
        <div className="p-8 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg shadow-lg flex items-center justify-center min-h-screen">
            <IconLoader size={32} className="animate-spin text-white" />
        </div>
    );
    if (error) return (
        <div className="p-8 text-red-600 bg-white rounded-lg shadow-lg">
            <p className="text-lg font-semibold">{error}</p>
        </div>
    );

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center mb-8">
                <img 
                    src="https://via.placeholder.com/120" // Placeholder for profile picture
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-teal-400 mb-4"
                />
                <h1 className="text-4xl font-semibold text-gray-900">{formData.username || 'User Name'}</h1>
                <p className="text-xl text-gray-700">{formData.email || 'user@example.com'}</p>
            </div>

            {/* Profile Details */}
            <div className="bg-white rounded-lg shadow-xl p-6">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Profile Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries({
                        'Username': { key: 'username', icon: <IconUser size={24} className="text-teal-500" /> },
                        'Email': { key: 'email', icon: <IconMail size={24} className="text-teal-500" /> },
                        'Alternate Email': { key: 'alternateEmail', icon: <IconMail size={24} className="text-teal-500" /> },
                        'Contact': { key: 'contactNumber', icon: <IconPhone size={24} className="text-teal-500" /> },
                        'Alternate Contact': { key: 'alternateContact', icon: <IconPhone size={24} className="text-teal-500" /> },
                        'Address Line 1': { key: 'addressLine1', icon: <IconAddressBook size={24} className="text-teal-500" /> },
                        'Address Line 2': { key: 'addressLine2', icon: <IconAddressBook size={24} className="text-teal-500" /> },
                        'Date of Birth': { key: 'dateOfBirth', icon: <IconCalendar size={24} className="text-teal-500" /> },
                        'Country': { key: 'country', icon: <IconGlobe size={24} className="text-teal-500" /> },
                        'State': { key: 'state', icon: <IconMap size={24} className="text-teal-500" /> },
                        'Gender': { key: 'gender', icon: <IconGenderNeutrois size={24} className="text-teal-500" /> },
                        'Religion': { key: 'religion', icon: <IconPencil size={24} className="text-teal-500" /> },
                        'Blood Group': { key: 'bloodGroup', icon: <IconPencil size={24} className="text-teal-500" /> },
                    }).map(([label, { key, icon }]) => (
                        <div key={key} className="bg-gray-100 p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center space-x-4">
                                <div className="text-teal-500">
                                    {icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
                                    <p className="text-gray-600">{formData[key as keyof UserProfileData] || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
