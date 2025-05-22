import React from 'react';
import './ProjectCardItem.css';
import dataIcon from '../../assets/dataicon.png';

export default function ProjectCardItem(props) {
	var itemDetails = props.cardItem;
	return (
		<div className='project-card'>
			<div className='card-content'>
				<div className='card-icon'>
					<img src={dataIcon} alt='data icon' />
				</div>
				<div className='card-text'>
					<div className='card-title'>{itemDetails.Title}</div>
					<div className='card-subtitle'>{itemDetails.Body}</div>
				</div>
			</div>
		</div>
	);
}
