import React from 'react';
import './ProjectCards.css';
import ProjectCardItem from './ProjectCardItem';
import cardItems from './CardItems.json';
import './projectCards.css';

export default function ProjectCards() {
	return (
		<div className='project-cards-container'>
			{cardItems.map((cardItem) => (
				<ProjectCardItem cardItem={cardItem} />
			))}
		</div>
	);
}
