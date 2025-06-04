import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // State to store form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send login request to backend API
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Send email and password
      });

      const data = await res.json(); // Parse JSON response

      if (!res.ok) {
        // Show error message if login failed
        alert(data.msg || 'Login failed');
      } else {
        // If login successful, store token and user data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Show welcome alert and navigate to account page
        alert(`Welcome, ${data.user.fullName}`);
        navigate('/account');
      }
    } catch (err) {
      // Catch any errors like server down, network failure, etc.
      alert('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-xs">
        {/* Page Title */}
        <h1 className="text-xl font-bold mb-1">
          Signin to your<br />PopX account
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Email Input */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-purple-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-purple-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-md font-semibold text-sm"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
