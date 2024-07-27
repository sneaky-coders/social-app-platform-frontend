import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { 
    IconUser, IconMail, IconPhone, IconAddressBook, 
    IconCalendar, IconGlobe, IconMap, IconGenderNeutrois, 
    IconPencil 
} from '@tabler/icons-react';

interface UserProfileData {
    username?: string;
    email: string;
    alternateEmail?: string;
    contact?: string;
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
        email: '',
        alternateEmail: '',
        contact: '',
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
    const [editing, setEditing] = useState<boolean>(false);
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
                setFormData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching profile.');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            await axios.post('/api/users/details', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            alert('Profile updated successfully!');
            setEditing(false);
        } catch (err) {
            setError('Error updating profile.');
        }
    };

    if (loading) return <div className="p-6 bg-white rounded-lg shadow-md">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <div className="md:w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Render form fields with optional editing */}
                    {Object.entries({
                        'Email': { key: 'email', icon: <IconMail size={24} className="text-gray-500 mr-2" /> },
                        'Alternate Email': { key: 'alternateEmail', icon: <IconMail size={24} className="text-gray-500 mr-2" /> },
                        'Contact': { key: 'contact', icon: <IconPhone size={24} className="text-gray-500 mr-2" /> },
                        'Alternate Contact': { key: 'alternateContact', icon: <IconPhone size={24} className="text-gray-500 mr-2" /> },
                        'Address Line 1': { key: 'addressLine1', icon: <IconAddressBook size={24} className="text-gray-500 mr-2" /> },
                        'Address Line 2': { key: 'addressLine2', icon: <IconAddressBook size={24} className="text-gray-500 mr-2" /> },
                        'Date of Birth': { key: 'dateOfBirth', icon: <IconCalendar size={24} className="text-gray-500 mr-2" /> },
                        'Country': { key: 'country', icon: <IconGlobe size={24} className="text-gray-500 mr-2" /> },
                        'State': { key: 'state', icon: <IconMap size={24} className="text-gray-500 mr-2" /> },
                        'Gender': { key: 'gender', icon: <IconGenderNeutrois size={24} className="text-gray-500 mr-2" /> },
                        'Religion': { key: 'religion', icon: <IconPencil size={24} className="text-gray-500 mr-2" /> },
                        'Blood Group': { key: 'bloodGroup', icon: <IconPencil size={24} className="text-gray-500 mr-2" /> },
                    }).map(([label, { key, icon }]) => (
                        <div key={key} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
                            <label className="block text-gray-700 mb-2 flex items-center">
                                {icon}
                                {label}
                            </label>
                            {editing ? (
                                <input
                                    type={key === 'dateOfBirth' ? 'date' : 'text'}
                                    name={key}
                                    value={formData[key as keyof UserProfileData] || ''}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                />
                            ) : (
                                <p>{formData[key as keyof UserProfileData] || 'Not provided'}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    {editing ? (
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditing(true)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
