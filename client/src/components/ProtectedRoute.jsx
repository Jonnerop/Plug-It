import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../routes/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log('ProtectedRoute user:', user);
  console.log('ProtectedRoute user.isAdmin:', user.isAdmin);

  if (!user) {
    return <Navigate to="/" />; //direct to home if not authenticated
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />; //direct to home if not admin
  }

  return children; //render the protected content if the user is an admin
};

export default ProtectedRoute;
