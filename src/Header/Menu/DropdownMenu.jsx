import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import menuItems from './MenuItems.json';

export default function DropdownMenu({ menuOpen }) {
	return (
		<div>
			<div className='Mobile-Menu'>
				{menuItems.map((menuItem) => (
					<div className='Menu-Item'>
						<div key={menuItem.Link}>
							<Link to={menuItem.Link} onClick={() => menuOpen(false)}>
								{menuItem.Name}
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
