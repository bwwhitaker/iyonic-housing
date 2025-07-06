import React, { useState, useEffect, useRef } from 'react';
import './CalculatorDropdown.css';

export default function LotSquareFootDropdown({ handleProspectLotSize, reset }) {
	const lotSizes = [2500, 5000, 7500, 10000, 12500, 15000, 17500, 20000, 25000, 30000, 35000, 40000];
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

	const handleSelect = (lotSize) => {
		setQuery(lotSize);
		setShowDropdown(false);
		handleProspectLotSize(lotSize);
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
			setSelectedIndex((prev) => (prev + 1) % lotSizes.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setSelectedIndex((prev) => (prev === -1 ? lotSizes.length - 1 : (prev - 1 + lotSizes.length) % lotSizes.length));
		} else if (e.key === 'Enter' && selectedIndex !== -1) {
			e.preventDefault();
			handleSelect(lotSizes[selectedIndex]);
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
				placeholder='Lot Size...'
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
					{lotSizes.map((lotSize, index) => (
						<li
							ref={(el) => (itemRefs.current[index] = el)}
							key={lotSize}
							onClick={() => handleSelect(lotSize)}
							className={`calculator-dropdown-option  ${index === selectedIndex ? 'selected' : ''}`}
						>
							{lotSize}
						</li>
					))}
				</ul>
			)}
			{query !== '' && <span className='input-label'>Lot Size</span>}
		</div>
	);
}
