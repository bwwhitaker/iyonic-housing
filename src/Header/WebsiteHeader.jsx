import React from 'react';
import logo from '../assets/IyonicLogo2.svg';
import './WebsiteHeader.css';

export default function WebsiteHeader() {
	return (
		<div className='header-container'>
			<div>
				<h1>
					<img src={logo} className='svg-image' alt-='iyonic logo' />
					iyonic housing
				</h1>
			</div>
		</div>
	);
}
