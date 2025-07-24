import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function ProtectedRoute({ children }) {
	const { isAuthenticated, loading } = useContext(AuthContext);

	if (loading) return <p>Loading...</p>;

	return isAuthenticated ? children : <Navigate to='/login' replace />;
}
