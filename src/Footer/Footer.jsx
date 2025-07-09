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
					<a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
						<img src={facebook} alt='facebook link' />
					</a>
				</div>
				<div className='social-container-item'>
					<a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
						<img src={insta} alt='instagram link' />
					</a>
				</div>
				<div className='social-container-item'>
					<a href='https://www.yelp.com' target='_blank' rel='noopener noreferrer'>
						<img src={yelp} alt='yelp link' />
					</a>
				</div>
			</div>
			<h3>Building a Better Future Together</h3>
			<form>
				<input type='email' name='email' id='mailing-list-input' placeholder='email address' />
				<button type='submit' name='subscribe-submit'>
					Subscribe
				</button>
			</form>
			<div className='footer-contact-container'>
				<p>Portland, Oregon</p>
				<p>contact@iyonichousing.com</p>
			</div>
		</div>
	);
}
