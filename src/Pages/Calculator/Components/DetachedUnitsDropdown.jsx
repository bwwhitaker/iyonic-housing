import React, { useState, useEffect, useRef } from 'react';
import './CalculatorDropdown.css';

export default function DetachedUnitsDropdown({ handleProspectDetachedUnits, reset }) {
	const detachedUnits = [0, 1, 2, 3];
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

	const handleSelect = (detachedUnits) => {
		setQuery(detachedUnits);
		setShowDropdown(false);
		handleProspectDetachedUnits(detachedUnits);
		justSelected.current = true; // prevent dropdown from reopening
		inputRef.current?.blur();
	};

	const handleKeyDown = (e) => {
		if (!showDropdown && e.key === 'ArrowDown') {
			setShowDropdown(true);
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setSelectedIndex((prev) => (prev + 1) % filteredUnits.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setSelectedIndex((prev) =>
				prev === -1 ? filteredUnits.length - 1 : (prev - 1 + filteredUnits.length) % filteredUnits.length
			);
		} else if (e.key === 'Enter' || e.key === 'Tab') {
			e.preventDefault();
			const parsedQuery = Number(query);

			if (!isNaN(parsedQuery) && detachedUnits.includes(parsedQuery)) {
				handleSelect(parsedQuery); // exact match from input
			} else if (selectedIndex !== -1) {
				handleSelect(filteredUnits[selectedIndex]); // fallback to selected item
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

	const filteredUnits = detachedUnits.filter((unit) => unit.toString().includes(query.toString()));

	return (
		<div className='calculator-dropdown-container' ref={wrapperRef}>
			<input
				/* onFocus={setShowDropdown(true)} */
				type='number'
				placeholder='Number of detached units (750 sqft each)...'
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
					{filteredUnits.map((detachedUnit, index) => (
						<li
							ref={(el) => (itemRefs.current[index] = el)}
							key={detachedUnit}
							onClick={() => handleSelect(detachedUnit)}
							className={`calculator-dropdown-option  ${index === selectedIndex ? 'selected' : ''}`}
						>
							{detachedUnit}
						</li>
					))}
				</ul>
			)}
			{query !== '' && query === 1 && <span className='input-label'>Detached Unit</span>}
			{query !== '' && query !== 1 && <span className='input-label'>Detached Units</span>}
		</div>
	);
}
