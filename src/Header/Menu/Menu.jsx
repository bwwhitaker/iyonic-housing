import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import menuItems from './MenuItems.json';

export default function Menu() {
	return (
		<div className='Desktop-Menu'>
			{menuItems.map((menuItem) => (
				<div className='Menu-Item' key={menuItem.Link}>
					<Link to={menuItem.Link}>{menuItem.Name}</Link>
				</div>
			))}
		</div>
	);
}
