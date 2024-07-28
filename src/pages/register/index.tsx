import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const steps = [
  { label: 'Personal Info', fields: ['username', 'email', 'contactNumber'] },
  { label: 'Account Details', fields: ['password', 'confirmPassword'] },
  { label: 'Additional Info', fields: ['alternateEmail', 'alternateContact', 'addressLine1', 'addressLine2', 'bloodGroup', 'dateOfBirth', 'country', 'state', 'religion', 'gender'] }
];

const initialFormData = {
  username: '',
  email: '',
  contactNumber: '',
  password: '',
  confirmPassword: '',
  alternateEmail: '',
  alternateContact: '',
  addressLine1: '',
  addressLine2: '',
  bloodGroup: '',
  dateOfBirth: '',
  country: '',
  state: '',
  religion: '',
  gender: ''
};

const RegistrationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      handleSubmit();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log('Registration successful:', response.data);
      // Clear form data after successful registration
      setFormData(initialFormData);
      // Optionally, navigate to a different page or show a success message
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 md:p-12 lg:p-16">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          {steps[currentStep].label}
        </h1>
        <form>
          {steps[currentStep].fields.map((field) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block text-gray-700 text-sm font-medium mb-2 capitalize">
                {field.replace(/([A-Z])/g, ' $1').toUpperCase()}
              </label>
              <input
                type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
                id={field}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
          ))}
          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
        <p className="text-gray-600 mt-6 text-center">
          Already have an account? <Link to="/" className="text-blue-500 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
