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
import ADUCalculatorResult from './Components/ADUCalculatorResult';

export default function Calculator() {
	const [prospectState, setProspectState] = useState('');
	const [prospectCity, setProspectCity] = useState('');
	const [prospectLotSize, setProspectLotSize] = useState('');
	const [prospectHouseSize, setProspectHouseSize] = useState('');
	const [prospectBasementSize, setProspectBasementSize] = useState('');
	const [prospectStories, setProspectStories] = useState('');
	const [prospectAttachedUnits, setProspectAttachedUnits] = useState('');
	const [prospectDetachedUnits, setProspectDetachedUnits] = useState('');
	const [resetCount, setResetCount] = useState(0);
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [pendingCalc, setPendingCalc] = useState(true);
	const [calcLoading, setCalcLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalRentalIncome, setTotalRentalIncome] = useState(0);
	const [totalPropertyTaxes, setTotalPropertyTaxes] = useState(0);
	const [totalUtilitiesAndMaintenance, setTotalUtilitiesAndMaintenance] = useState(0);

	useEffect(() => {
		window.scrollTo(0, 0); // 👈 Scroll to top on mount
	}, []);

	const isNonEmptyString = (val) => typeof val === 'string' && val.trim() !== '';

	useEffect(() => {
		const isReady =
			isNonEmptyString(prospectState) &&
			isNonEmptyString(prospectCity) &&
			Number(prospectLotSize) > 0 &&
			Number(prospectHouseSize) > 0;

		setSubmitDisabled(!isReady);
	}, [prospectState, prospectCity, prospectLotSize, prospectHouseSize]);

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
		setProspectLotSize('');
		setProspectHouseSize('');
		setProspectBasementSize('');
		setProspectStories('');
		setProspectAttachedUnits('');
		setProspectDetachedUnits('');
		setResetCount((prev) => prev + 1);
		setCalcLoading(false);
		setPendingCalc(true);
	};

	const submit = async () => {
		setPendingCalc(true);
		setCalcLoading(true);
		try {
			const response = await fetch('http://localhost:3000/api/aduCalculator', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					state: prospectState,
					city: prospectCity,
					lotSize: Number(prospectLotSize),
					houseSize: Number(prospectHouseSize),
					basementSize: Number(prospectBasementSize) || 0,
					stories: Number(prospectStories) || 0,
					attachedUnits: Number(prospectAttachedUnits) || 0,
					detachedUnits: Number(prospectDetachedUnits) || 0,
				}),
			});
			const data = await response.json();
			console.log('API response:', data);
			const price = data.data.priceToBuild;
			await new Promise((resolve) => setTimeout(resolve, 2000));
			setPendingCalc(false);
			setCalcLoading(false);
			setTotalPrice(price);
			setTotalRentalIncome(data.data.rentalIncome);
			setTotalUtilitiesAndMaintenance(data.data.utilitiesAndMaintenance);
			setTotalPropertyTaxes(data.data.propertyTaxes);
		} catch (error) {
			console.error('Error submitting calculation:', error);
			alert('Error submitting calculation. Check console for details.');
		}
	};
	return (
		<div className='main-container'>
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
				<HouseSquareFootDropdown handleProspectHouseSize={setProspectHouseSize} reset={resetCount} />
				<StoriesDropdown handleProspectStories={setProspectStories} reset={resetCount} />
				<LotSquareFootDropdown handleProspectLotSize={setProspectLotSize} reset={resetCount} />
				<BasementSquareFootDropdown handleProspectBasementSize={setProspectBasementSize} reset={resetCount} />
				<AttachedUnitsDropdown handleProspectAttachedUnits={setProspectAttachedUnits} reset={resetCount} />
				<DetachedUnitsDropdown handleProspectDetachedUnits={setProspectDetachedUnits} reset={resetCount} />
				<div className='calculate-submit-wrapper'>
					<button disabled={submitDisabled} className='calculate-submit' onClick={submit}>
						Calculate
					</button>
				</div>
			</div>
			<ADUCalculatorResult
				pendingCalc={pendingCalc}
				calcLoading={calcLoading}
				totalPrice={totalPrice}
				totalRentalIncome={totalRentalIncome}
				totalPropertyTaxes={totalPropertyTaxes}
				totalUtilitiesAndMaintenance={totalUtilitiesAndMaintenance}
			/>
		</div>
	);
}
