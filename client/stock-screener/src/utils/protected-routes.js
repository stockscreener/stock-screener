import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProtectedRoute({ authenticated, children }) {
  if (!authenticated) {
    toast.error("Please Login first to use this feature!")
    return <Navigate to="/" replace />
  }
  return children
}

export default ProtectedRoute;