import React, { useState, useEffect } from 'react';
import StateSearchDropdown from './Components/StateSearchDropdown/StateSearchDropdown';
import CitySearchDropdown from './Components/CitySearchDropdown/CitySearchDropdown';
import LotSquareFootDropdown from './Components/LotSquareFoot/LotSquareFootDropdown';
import HouseSquareFootDropdown from './Components/HouseSquareFootDropdown/HouseSquareFootDropdown';

export default function Calculator() {
	const [prospectState, setProspectState] = useState('');
	const [prospectCity, setProspectCity] = useState('');
	const [prospectLotSize, setProspectLotSize] = useState();
	const [prospectHouseSize, setProspectHouseSize] = useState();

	useEffect(() => {
		console.log(prospectState);
		console.log(prospectCity);
		console.log(prospectLotSize);
		console.log(prospectHouseSize);
	}, [prospectState, prospectCity, prospectLotSize, prospectHouseSize]);

	return (
		<div>
			<StateSearchDropdown handleProspectState={setProspectState} />
			<CitySearchDropdown state={prospectState} handleProspectCity={setProspectCity} />
			<LotSquareFootDropdown handleProspectLotSize={setProspectLotSize} />
			<HouseSquareFootDropdown handleProspectHouseSize={setProspectHouseSize} />
		</div>
	);
}
