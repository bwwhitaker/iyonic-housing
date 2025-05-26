import React, { useState, useEffect, useRef } from 'react';
import './StateSearchDropdown.css';

export default function StateSearchDropdown({ handleProspectState }) {
	const [states, setStates] = useState([]);
	const [query, setQuery] = useState('');
	const [filteredStates, setFilteredStates] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [showDropdown, setShowDropdown] = useState(false);
	const inputRef = useRef(null);
	const wrapperRef = useRef(null);
	const justSelected = useRef(false);

	// Fetch states
	useEffect(() => {
		fetch('http://localhost:3000/api/states')
			.then((res) => res.json())
			.then((data) => {
				setStates(data.states);
			})
			.catch((err) => console.error('Error fetching states:', err));
	}, []);

	// Filter states when query changes
	useEffect(() => {
		if (justSelected.current) {
			justSelected.current = false;
			return;
		}
		const q = query.toLowerCase();
		const filtered = states.filter((state) => state.toLowerCase().includes(q));
		setFilteredStates(filtered);
		setShowDropdown(filtered.length > 0 && query !== '');
		setSelectedIndex(-1);
	}, [query, states]);

	const handleSelect = (state) => {
		setQuery(state);
		setShowDropdown(false);
		handleProspectState(state);
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
			setSelectedIndex((prev) => (prev + 1) % filteredStates.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setSelectedIndex((prev) =>
				prev === -1 ? filteredStates.length - 1 : (prev - 1 + filteredStates.length) % filteredStates.length
			);
		} else if (e.key === 'Enter' && selectedIndex !== -1) {
			e.preventDefault();
			handleSelect(filteredStates[selectedIndex]);
			setShowDropdown(false);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			setQuery('');
			setShowDropdown(false);
		}
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
		<div className='state-search-container' ref={wrapperRef}>
			<input
				type='text'
				placeholder='State...'
				className='state-search-input'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={handleKeyDown}
				ref={inputRef}
			/>
			{showDropdown && (
				<ul className='state-search-dropdown'>
					{filteredStates.map((state, index) => (
						<li
							key={state}
							onClick={() => handleSelect(state)}
							className={`state-search-option  ${index === selectedIndex ? 'selected' : ''}`}
						>
							{state}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
