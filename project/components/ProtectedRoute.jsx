// /client/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute is a wrapper component that restricts access to routes
 * based on the user's authentication status.
 *
 * @param {ReactNode} children - The component(s) to render if the user is authenticated
 * @returns {ReactNode} - Either the child component(s) or a redirect to the login page
 */
export default function ProtectedRoute({ children }) {
  // Attempt to retrieve the 'user' object from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // If no user is found, redirect to the login page
  if (!user) {
    // 'replace' prevents the current entry from being added to the history stack
    return <Navigate to="/" replace />;
  }

  // If a user is authenticated, render the protected component(s)
  return children;
}

