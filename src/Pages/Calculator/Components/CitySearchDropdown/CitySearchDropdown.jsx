import React, { useState, useEffect, useRef } from 'react';
import './CitySearchDropdown.css';

export default function CitySearchDropdown({ state: selectedState, handleProspectCity }) {
	const [cities, setCities] = useState([]);
	const [query, setQuery] = useState('');
	const [filteredCities, setFilteredCities] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [showDropdown, setShowDropdown] = useState(false);
	const inputRef = useRef(null);
	const wrapperRef = useRef(null);
	const justSelected = useRef(false);
	const itemRefs = useRef([]);

	// Fetch cities

	useEffect(() => {
		if (selectedState === '') return;

		fetch(`http://localhost:3000/api/cities?state=${selectedState}`)
			.then((res) => res.json())
			.then((data) => {
				setCities(data.cities);
				setQuery('');
				setFilteredCities([]);
				setSelectedIndex(-1);
				setShowDropdown(false);
			})
			.catch((err) => console.error('Error fetching states:', err));
	}, [selectedState]);

	// Filter cities when query changes
	useEffect(() => {
		if (justSelected.current) {
			justSelected.current = false;
			return;
		}
		const q = query.toLowerCase();
		const filtered = cities.filter((city) => city.toLowerCase().includes(q));
		setFilteredCities(filtered);
		setShowDropdown(filtered.length > 0 && query !== '');
		setSelectedIndex(-1);
		itemRefs.current = [];
	}, [query, cities]);

	// Scroll selected item into view
	useEffect(() => {
		if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
			itemRefs.current[selectedIndex].scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
			});
		}
	}, [selectedIndex]);

	const handleSelect = (city) => {
		setQuery(city);
		setShowDropdown(false);
		handleProspectCity(city);
		justSelected.current = true; // prevent dropdown from reopening
		inputRef.current?.blur();
	};

	const handleKeyDown = (e) => {
		/* if (!showDropdown) return; */

		if (!showDropdown && e.key === 'ArrowDown') {
			setShowDropdown(true);
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setSelectedIndex((prev) => (prev + 1) % filteredCities.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setSelectedIndex((prev) =>
				prev === -1 ? filteredCities.length - 1 : (prev - 1 + filteredCities.length) % filteredCities.length
			);
		} else if (e.key === 'Enter' && selectedIndex !== -1) {
			e.preventDefault();
			handleSelect(filteredCities[selectedIndex]);
			setShowDropdown(false);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			setQuery('');
			setShowDropdown(false);
		}
	};

	const handleClickInside = () => {
		setShowDropdown(true);
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
				setShowDropdown(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='city-search-container' ref={wrapperRef}>
			<input
				type='text'
				placeholder='City...'
				className='city-search-input'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={handleKeyDown}
				onClick={handleClickInside}
				ref={inputRef}
			/>
			{showDropdown && (
				<ul className='city-search-dropdown'>
					{filteredCities.map((city, index) => (
						<p
							key={city}
							ref={(el) => (itemRefs.current[index] = el)}
							onClick={() => handleSelect(city)}
							className={`city-search-option  ${index === selectedIndex ? 'selected' : ''}`}
						>
							{city}
						</p>
					))}
				</ul>
			)}
		</div>
	);
}
