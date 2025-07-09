import React from 'react';
import { useState, useEffect, useRef } from 'react';
import logo from '../assets/IyonicLogo2.svg';
import './WebsiteHeader.css';
import Menu from './Menu/Menu';
import DropdownMenu from './Menu/DropdownMenu';
import hamburger from '../assets/HamburgerMenu.svg';
import './Menu/Menu.css';
import { Link } from 'react-router-dom';

export default function WebsiteHeader() {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return (
		<div className='header-container'>
			<div className='title-row'>
				<h1>
					<Link to='/'>
						<img src={logo} className='svg-image' alt='iyonic logo' />{' '}
					</Link>
					iyonic housing
				</h1>
				<div className='dropdown' ref={dropdownRef}>
					<img src={hamburger} className='hamburger-svg' onClick={toggleDropdown} />
					<div className={`dropdown-Menu-Content ${isOpen ? 'show' : ''}`}>
						<DropdownMenu isOpen={isOpen} menuOpen={setIsOpen} />
					</div>
				</div>
			</div>
			<div className='menu-container'>
				<Menu />
			</div>
		</div>
	);
}
