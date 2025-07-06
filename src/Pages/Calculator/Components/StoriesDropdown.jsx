import React, { useState, useEffect, useRef } from 'react';
import './CalculatorDropdown.css';

export default function StoriesDropdown({ handleProspectStories, reset }) {
	const stories = [1, 2, 3];
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

	const handleSelect = (stories) => {
		setQuery(stories);
		setShowDropdown(false);
		handleProspectStories(stories);
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
			setSelectedIndex((prev) => (prev + 1) % stories.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setSelectedIndex((prev) => (prev === -1 ? stories.length - 1 : (prev - 1 + stories.length) % stories.length));
		} else if (e.key === 'Enter' && selectedIndex !== -1) {
			e.preventDefault();
			handleSelect(stories[selectedIndex]);
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
				placeholder='Stories..'
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
					{stories.map((story, index) => (
						<li
							ref={(el) => (itemRefs.current[index] = el)}
							key={story}
							onClick={() => handleSelect(story)}
							className={`calculator-dropdown-option  ${index === selectedIndex ? 'selected' : ''}`}
						>
							{story}
						</li>
					))}
				</ul>
			)}
			{query !== '' && query === 1 && <span className='input-label'>Story</span>}
			{query !== '' && query > 1 && <span className='input-label'>Stories</span>}
		</div>
	);
}
