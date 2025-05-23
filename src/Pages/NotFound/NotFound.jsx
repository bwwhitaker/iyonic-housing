import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<div>
			Sorry that page doesn't exist! Return <Link to={'/'}>Home</Link>
		</div>
	);
}
