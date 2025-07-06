import React, { useState, useEffect } from 'react';
import './Calculator.css';
import StateSearchDropdown from './Components/StateSearchDropdown';
import CitySearchDropdown from './Components/CitySearchDropdown';
import LotSquareFootDropdown from './Components/LotSquareFootDropdown';
import HouseSquareFootDropdown from './Components/HouseSquareFootDropdown';
import BasementSquareFootDropdown from './Components/BasementSquareFootDropdown';
import StoriesDropdown from './Components/StoriesDropdown';
import AttachedUnitsDropdown from './Components/AttachedUnitsDropdown';
import DetachedUnitsDropdown from './Components/DetachedUnitsDropdown';

export default function Calculator() {
	const [prospectState, setProspectState] = useState('');
	const [prospectCity, setProspectCity] = useState('');
	const [prospectLotSize, setProspectLotSize] = useState();
	const [prospectHouseSize, setProspectHouseSize] = useState();
	const [prospectBasementSize, setProspectBasementSize] = useState();
	const [prospectStories, setProspectStories] = useState();
	const [prospectAttachedUnits, setProspectAttachedUnits] = useState();
	const [prospectDetachedUnits, setProspectDetachedUnits] = useState();
	const [resetCount, setResetCount] = useState(0);

	useEffect(() => {
		window.scrollTo(0, 0); // 👈 Scroll to top on mount
	}, []);

	useEffect(() => {
		console.log(prospectState);
		console.log(prospectCity);
		console.log(prospectLotSize);
		console.log(prospectHouseSize);
		console.log(prospectBasementSize);
		console.log(prospectStories);
		console.log(prospectAttachedUnits);
		console.log(prospectDetachedUnits);
	}, [
		prospectState,
		prospectCity,
		prospectLotSize,
		prospectHouseSize,
		prospectBasementSize,
		prospectStories,
		prospectAttachedUnits,
		prospectDetachedUnits,
	]);

	const resetForm = () => {
		setProspectState('');
		setProspectCity('');
		setProspectLotSize();
		setProspectHouseSize();
		setProspectBasementSize();
		setProspectStories();
		setProspectAttachedUnits();
		setProspectDetachedUnits();
		setResetCount((prev) => prev + 1);
	};

	return (
		<div className='calculator-container'>
			<div className='calculator-header-row'>
				<div>
					<h2>Investment Calculator</h2>
				</div>
				<div>
					<button onClick={() => resetForm()}>Reset</button>
				</div>
			</div>
			<StateSearchDropdown handleProspectState={setProspectState} reset={resetCount} />
			<CitySearchDropdown state={prospectState} handleProspectCity={setProspectCity} reset={resetCount} />
			<LotSquareFootDropdown handleProspectLotSize={setProspectLotSize} reset={resetCount} />
			<HouseSquareFootDropdown handleProspectHouseSize={setProspectHouseSize} reset={resetCount} />
			<BasementSquareFootDropdown handleProspectBasementSize={setProspectBasementSize} reset={resetCount} />
			<StoriesDropdown handleProspectStories={setProspectStories} reset={resetCount} />
			<AttachedUnitsDropdown handleProspectAttachedUnits={setProspectAttachedUnits} reset={resetCount} />
			<DetachedUnitsDropdown handleProspectDetachedUnits={setProspectDetachedUnits} reset={resetCount} />
		</div>
	);
}
