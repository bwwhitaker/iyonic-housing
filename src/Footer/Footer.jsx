import React from 'react';
import facebook from '../assets/facebook.svg';
import insta from '../assets/insta.svg';
import yelp from '../assets/yelp.svg';
import './Footer.css';

export default function WebsiteHeader() {
	return (
		<div className='footer-container'>
			<div className='social-container'>
				<div className='social-container-item'>
					<img src={facebook} alt='facebook link' />
				</div>
				<div className='social-container-item'>
					<img src={insta} alt='instagram link' />
				</div>
				<div className='social-container-item'>
					<img src={yelp} alt='yelp link' />
				</div>
			</div>
			<h3>Building a Better Future Together</h3>
			<form>
				<input type='email' name='email' id='mailing-list-input' placeholder='email address' />
				<button type='submit' name='subscribe-submit'>
					Subscribe
				</button>
			</form>
			<p>123 Community Lane, Suite 456, Metropolis</p>
			<p>contact@iyonichousing.com</p>
		</div>
	);
}
