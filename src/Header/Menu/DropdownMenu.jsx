import React from 'react';
import './Menu.css';
import menuItems from './MenuItems.json';

export default function DropdownMenu() {
	return (
		<div className='Mobile-Menu'>
			{menuItems.map((menuItem) => (
				<div className='Menu-Item'>
					<div key={menuItem.Link}>{menuItem.Name}</div>
				</div>
			))}
		</div>
	);
}
