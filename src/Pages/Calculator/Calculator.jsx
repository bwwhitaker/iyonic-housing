import React, { useState, useEffect } from 'react';
import StateSearchDropdown from '../../Components/StateSearchDropdown/StateSearchDropdown';
import CitySearchDropdown from '../../Components/CitySearchDropdown/CitySearchDropdown';

export default function Calculator() {
	const [prospectState, setProspectState] = useState('');
	const [prospectCity, setProspectCity] = useState('');

	useEffect(() => {
		console.log(prospectState);
		console.log(prospectCity);
	}, [prospectState, prospectCity]);

	return (
		<div>
			<StateSearchDropdown handleProspectState={setProspectState} />
			<CitySearchDropdown state={prospectState} handleProspectCity={setProspectCity} />
		</div>
	);
}
