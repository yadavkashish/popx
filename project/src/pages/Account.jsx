import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  // State to store user information
  const [user, setUser] = useState({ fullName: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      // If user exists in localStorage, update state
      setUser(storedUser);
    } else {
      // 🔒 If no user is found, redirect to login page
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen px-6 py-12">
      {/* Page heading */}
      <h1 className="text-lg font-semibold mb-4">Account Settings</h1>

      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <img
            src="https://i.pravatar.cc/300" // Placeholder profile picture
            alt="profile"
            className="object-cover w-full h-full"
          />
          {/* Camera icon overlay */}
          <div className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full text-xs">
            📷
          </div>
        </div>

        {/* User info */}
        <div>
          {/* Display user's full name or fallback to "User" */}
          <h2 className="font-semibold">{user.fullName || 'User'}</h2>
          {/* Display user's email or fallback text */}
          <p className="text-sm text-gray-500">{user.email || 'No email found'}</p>
        </div>
      </div>

      {/* Welcome message */}
      <p className="text-sm text-gray-500">
        Welcome to your account. Manage your profile and preferences here.
      </p>
    </div>
  );
}



