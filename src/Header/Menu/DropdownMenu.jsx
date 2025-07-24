import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import menuItems from './MenuItems.json';
import { AuthContext } from '../../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function DropdownMenu({ menuOpen }) {
	const { isAuthenticated, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	// Clone menu items so we can modify them safely
	let updatedMenu = [...menuItems];

	// Insert Dashboard at the start if logged in
	if (isAuthenticated) {
		updatedMenu = [{ Name: 'Dashboard', Link: '/dashboard' }, ...updatedMenu];
	}

	// Replace Login with Logout if logged in
	updatedMenu = updatedMenu.map((item) => {
		if (item.Name === 'Login' && isAuthenticated) {
			return { Name: 'Logout', Link: '/logout' };
		}
		return item;
	});

	const handleClick = async (menuItem) => {
		if (menuItem.Name === 'Logout') {
			await logout();
			toast.success('Logged out successfully!');
			navigate('/'); // Redirect to home
		}
		menuOpen(false);
	};

	return (
		<div>
			<div className='Mobile-Menu'>
				{updatedMenu.map((menuItem) => (
					<div className='Menu-Item'>
						<div key={menuItem.Link}>
							<Link to={menuItem.Link} onClick={() => handleClick(menuItem)}>
								{menuItem.Name}
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
