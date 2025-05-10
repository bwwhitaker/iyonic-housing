import React from 'react';
import './Menu.css';

export default function Menu() {
	const menuItems = [
		{ Name: 'Home', Link: '12' },
		{ Name: 'About', Link: '123' },
		{ Name: 'Projects', Link: '1234' },
		{ Name: 'Contact', Link: '12345' },
		{ Name: 'Invest', Link: '123456' },
		{ Name: 'Login', Link: '1234567' },
	];
	return (
		<div className='Desktop-Menu'>
			{menuItems.map((menuItem) => (
				<div className='Menu-Item'>
					<div key={menuItem.Link}>{menuItem.Name}</div>
				</div>
			))}
		</div>
	);
}
