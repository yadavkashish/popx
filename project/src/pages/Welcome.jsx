import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    // Full-screen centered container with padding and white background
    <div className="flex items-center justify-center h-screen bg-white px-4">
      <div className="w-full max-w-xs text-center">
        {/* Heading */}
        <h1 className="text-xl font-bold mb-2">Welcome to PopX</h1>

        {/* Subtext/description */}
        <p className="text-sm text-gray-500 mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        {/* Link to Registration Page */}
        <Link
          to="/register"
          className="block w-full bg-purple-600 text-white py-3 rounded-md font-medium mb-3"
        >
          Create Account
        </Link>

        {/* Link to Login Page */}
        <Link
          to="/login"
          className="block w-full bg-purple-200 text-purple-900 py-3 rounded-md font-medium"
        >
          Already Registered? Login
        </Link>
      </div>
    </div>
  );
}

