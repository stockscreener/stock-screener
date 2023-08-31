import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminRoute({ isAdmin, children }) {
  if (!isAdmin) {
    toast.error("Only For Admins!")
    return <Navigate to="/" replace />
  }
  return children
}

export default AdminRoute;