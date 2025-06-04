import React, { useState } from 'react';

export default function Register() {
  // State to manage all form fields
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    isAgency: '', // 'yes' or 'no'
  });

  // Update form state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Send POST request to backend API
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json(); // Parse response

      if (!res.ok) {
        // Show error message from backend or fallback
        alert(data.msg || 'Registration failed');
      } else {
        // Show success message and prompt user to login
        alert('Registration successful! Please login.');
      }
    } catch (err) {
      // Handle server or network errors
      alert('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen flex items-end px-6 pb-12 bg-white">
      <div className="w-full max-w-xs mx-auto">
        {/* Heading */}
        <h1 className="text-[20px] font-semibold leading-tight mb-6">
          Create your <br /> PopX account
        </h1>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Dynamically render input fields for common fields */}
          {[
            { name: 'fullName', label: 'Full Name*' },
            { name: 'phone', label: 'Phone number*' },
            { name: 'email', label: 'Email address*' },
            { name: 'password', label: 'Password*', type: 'password' },
            { name: 'company', label: 'Company name' },
          ].map(({ name, label, type = 'text' }) => (
            <div className="relative" key={name}>
              {/* Floating label */}
              <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-purple-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={label.replace('*', '').trim()}
                required={label.includes('*')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          ))}

          {/* Radio buttons for "Are you an Agency?" */}
          <div>
            <p className="text-sm font-medium mb-2">
              Are you an Agency? <span className="text-red-500">*</span>
            </p>
            <div className="flex gap-6 items-center">
              {/* Yes option */}
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="isAgency"
                  value="yes"
                  onChange={handleChange}
                  className="accent-purple-600"
                  required
                />
                <span>Yes</span>
              </label>

              {/* No option */}
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="isAgency"
                  value="no"
                  onChange={handleChange}
                  className="accent-purple-600"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold text-sm"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
