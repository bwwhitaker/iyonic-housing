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

	return (
		<div className='calculator-container'>
			<h1>Investment Calculator</h1>

			<StateSearchDropdown handleProspectState={setProspectState} />
			<CitySearchDropdown state={prospectState} handleProspectCity={setProspectCity} />
			<LotSquareFootDropdown handleProspectLotSize={setProspectLotSize} />
			<HouseSquareFootDropdown handleProspectHouseSize={setProspectHouseSize} />
			<BasementSquareFootDropdown handleProspectBasementSize={setProspectBasementSize} />
			<StoriesDropdown handleProspectStories={setProspectStories} />
			<AttachedUnitsDropdown handleProspectAttachedUnits={setProspectAttachedUnits} />
			<DetachedUnitsDropdown handleProspectDetachedUnits={setProspectDetachedUnits} />
		</div>
	);
}
