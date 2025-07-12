import React, { useState, useEffect, useRef } from 'react';
import './CalculatorDropdown.css';

export default function BasementSquareFootDropdown({ handleProspectBasementSize, reset }) {
	const basementSizes = [0, 400, 450, 500, 550, 600, 650, 700];
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

	const handleSelect = (basementSize) => {
		setQuery(basementSize);
		setShowDropdown(false);
		handleProspectBasementSize(basementSize);
		justSelected.current = true; // prevent dropdown from reopening
		inputRef.current?.blur();
	};

	const filteredSizes = basementSizes.filter((unit) => unit.toString().includes(query.toString()));

	const handleKeyDown = (e) => {
		if (!showDropdown && e.key === 'ArrowDown') {
			setShowDropdown(true);
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setSelectedIndex((prev) => (prev + 1) % filteredSizes.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setSelectedIndex((prev) =>
				prev === -1 ? filteredSizes.length - 1 : (prev - 1 + filteredSizes.length) % filteredSizes.length
			);
		} else if (e.key === 'Enter' || e.key === 'Tab') {
			e.preventDefault();
			const parsedQuery = Number(query);

			if (!isNaN(parsedQuery) && basementSizes.includes(parsedQuery)) {
				handleSelect(parsedQuery); // exact match from input
			} else if (selectedIndex !== -1) {
				handleSelect(filteredSizes[selectedIndex]); // fallback to selected item
			}

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
				placeholder='Basement Square Footage (if converting)...'
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
					{basementSizes.map((basementSize, index) => (
						<li
							ref={(el) => (itemRefs.current[index] = el)}
							key={basementSize}
							onClick={() => handleSelect(basementSize)}
							className={`calculator-dropdown-option  ${index === selectedIndex ? 'selected' : ''}`}
						>
							{basementSize}
						</li>
					))}
				</ul>
			)}
			{query !== '' && <span className='input-label'>Basement Size</span>}
		</div>
	);
}
