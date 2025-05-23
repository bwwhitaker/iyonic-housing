import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import adu1 from '../../assets/adu1.png';
import adu2 from '../../assets/adu2.png';
import adu3 from '../../assets/adu3.png';
import nieghborhood from '../../assets/neighborhood.png';
import ProjectCards from '../../Components/ProjectCards/ProjectCards';
import ContactForm from '../../Components/ContactForm/ContactForm';

export default function Home() {
	return (
		<div>
			<div className='body'>
				<div>
					<div className='hero'>Create Positive Change in Your Communities</div>
					<div className='calculator-cta-container'>
						<div className='adu-image-container'>
							<img src={adu1} className='adu1-image' alt='an example of an adu' />
							<div className='stacked-image-container'>
								<img src={adu2} className='adu2-image' alt='an example of an adu' />
								<img src={adu3} className='adu3-image' alt='an example of an adu' />
							</div>
						</div>
						<div className='calculator-cta-card'>
							<h2>An Average ADU costs $150,000</h2>
							<p>What if you split the cost 6 ways?</p>
							<p>Earn a 14% return on your share to break even in 7 years.</p>
							<p>
								Customize results based on region, unit size, bedrooms, and other amenities. Try our{' '}
								<Link to={'/calculator'}>calculator</Link> today.
							</p>
						</div>
					</div>
					<div className='neighborhood-effort-cta-container'>
						<h2>Team up with neighbors to build housing together.</h2>
						<img src={nieghborhood} className='neighborhood-image' alt='neighborhood image' />
					</div>
					<div className='project-cards-container'>
						<ProjectCards />
					</div>
					<div className='contact-form-container'>
						<ContactForm />
					</div>
					<div className='choose-us-container'>
						<div className='choose-us-title'>Why Choose Us?</div>
						<div className='choose-us-body'>
							We connect investors with high-potential community housing projects, ensuring sustainable and impactful
							returns
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
