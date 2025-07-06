import React, { useState, useEffect, useRef } from 'react';
import './CalculatorDropdown.css';

export default function HouseSquareFootDropdown({ handleProspectHouseSize, reset }) {
	const houseSizes = [1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000, 3250, 3500, 3750, 4000];
	const [query, setQuery] = useState('');
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [showDropdown, setShowDropdown] = useState(false);
	const inputRef = useRef(null);
	const wrapperRef = useRef(null);
	const justSelected = useRef(false);
	const itemRefs = useRef([]);

	// Scroll selected item into view
	useEffect(() => {
		if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
			itemRefs.current[selectedIndex].scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
			});
		}
	}, [selectedIndex]);

	const handleSelect = (houseSize) => {
		setQuery(houseSize);
		setShowDropdown(false);
		handleProspectHouseSize(houseSize);
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
			setSelectedIndex((prev) => (prev + 1) % houseSizes.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setSelectedIndex((prev) =>
				prev === -1 ? houseSizes.length - 1 : (prev - 1 + houseSizes.length) % houseSizes.length
			);
		} else if (e.key === 'Enter' && selectedIndex !== -1) {
			e.preventDefault();
			handleSelect(houseSizes[selectedIndex]);
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

	useEffect(() => {
		if (reset) {
			setQuery('');
		}
	}, [reset]);

	return (
		<div className='calculator-dropdown-container' ref={wrapperRef}>
			<input
				/* onFocus={setShowDropdown(true)} */
				type='number'
				placeholder='House Size...'
				className='calculator-dropdown-input'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={handleKeyDown}
				ref={inputRef}
				onClick={handleClickInside}
				onWheel={(e) => e.target.blur()}
			/>
			{showDropdown && (
				<ul className='calculator-dropdown-dropdown'>
					{houseSizes.map((houseSize, index) => (
						<li
							ref={(el) => (itemRefs.current[index] = el)}
							key={houseSize}
							onClick={() => handleSelect(houseSize)}
							className={`calculator-dropdown-option  ${index === selectedIndex ? 'selected' : ''}`}
						>
							{houseSize}
						</li>
					))}
				</ul>
			)}
			{query !== '' && <span className='input-label'>House Size</span>}
		</div>
	);
}
