import React, { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';

export default function Dashboard() {
	const { user } = useContext(AuthContext);
	return <div>This is protected for {user.email}</div>;
}
