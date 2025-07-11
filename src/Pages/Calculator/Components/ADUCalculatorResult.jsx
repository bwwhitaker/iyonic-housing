import React, { useState, useEffect } from 'react';
import './ADUCalculatorResult.css';

export default function ADUCalculatorResult({
	pendingCalc,
	calcLoading,
	totalPrice,
	totalRentalIncome,
	totalPropertyTaxes,
}) {
	const [neighborsInvested, setNeighborsInvested] = useState(6);
	const [individualExpense, setIndividualExpense] = useState(totalPrice / neighborsInvested);
	const [increaseDisabled, setIncreaseDisabled] = useState(false);
	const [decreaseDisabled, setDecreaseDisabled] = useState(false);

	const increaseNeighbors = () => {
		setNeighborsInvested((prev) => prev + 1);
	};

	const decreaseNeighbors = () => {
		setNeighborsInvested((prev) => Math.max(prev - 1, 1));
	};

	const formatUSD = (amount) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(amount);

	const formatFloat = (amount) => {
		const number = amount.toFixed(2);
		return number;
	};

	useEffect(() => {
		if (neighborsInvested > 0) {
			setIndividualExpense(totalPrice / neighborsInvested);
		}
	}, [totalPrice, neighborsInvested]);

	useEffect(() => {
		if (neighborsInvested > 49) {
			setIncreaseDisabled(true);
		}
		if (neighborsInvested <= 49) {
			setIncreaseDisabled(false);
		}
		if (neighborsInvested < 2) {
			setDecreaseDisabled(true);
		}
		if (neighborsInvested >= 2) {
			setDecreaseDisabled(false);
		}
	}, [neighborsInvested]);

	const totalAnnualIncome = 12 * totalRentalIncome - totalPropertyTaxes - totalPrice * 0.03;

	return (
		<div className='resultContainer'>
			{pendingCalc && (
				<div>
					<h3>Cost to Build per neighbor</h3>
					<div className='costResultPlaceholder'>
						{!calcLoading && `Pending Calculation...`}
						{calcLoading && `Loading...`}
					</div>
					<h3>Potential Earnings per neighbor</h3>
					<div className='earningsResultPlaceholder'>
						{!calcLoading && `Pending Calculation...`}
						{calcLoading && `Loading...`}
					</div>
				</div>
			)}
			{!pendingCalc && (
				<div>
					<h3>Cost to Build</h3>
					<div>
						<div className='results-row'>
							<div className='results-label'>Total Price</div>
							<div className='results-value'>{formatUSD(totalPrice)}</div>
						</div>
						<div className='results-row'>
							<div className='results-label'>Neighbors Invested</div>
							<div className='neighbors-row'>
								<div className='results-value'>{neighborsInvested}</div>
								<button disabled={decreaseDisabled} onClick={decreaseNeighbors}>
									-
								</button>
								<button disabled={increaseDisabled} onClick={increaseNeighbors}>
									+
								</button>
							</div>
						</div>
						<div className='results-row'>
							<div className='results-label'>Expense per Invested Neighbor</div>
							<div className='results-value'>{formatUSD(individualExpense)}</div>
						</div>
					</div>
					<h3>Potential Earnings</h3>
					<div>
						<div className='results-row'>
							<div className='results-label'>Total Annual Rent</div>
							<div className='results-value'>{formatUSD(12 * totalRentalIncome)}</div>
						</div>
						<div className='results-row'>
							<div className='results-label'>Total Property Taxes</div>
							<div className='results-value'>{formatUSD(totalPropertyTaxes)}</div>
						</div>
						<div className='results-row'>
							<div className='results-label'>Total Annual Maintenance</div>
							<div className='results-value'>{formatUSD(totalPrice * 0.03)}</div>
						</div>
						<div className='results-row'>
							<div className='results-label'>Total Annual Profit</div>
							<div className='results-value'>{formatUSD(totalAnnualIncome)}</div>
						</div>
						<div className='results-row'>
							<div className='results-label'>Annual Income per Invested Neighbor</div>
							<div className='results-value'>{formatUSD(totalAnnualIncome / neighborsInvested)}</div>
						</div>
						<div className='results-row'>
							<div className='results-label'>Break Even After</div>
							<div className='results-value'>{formatFloat(totalPrice / totalAnnualIncome)} years</div>
						</div>
						<div className='results-row'>
							<div className='results-label'>ROI post break even</div>
							<div className='results-value'>{formatFloat(totalAnnualIncome / totalRentalIncome)}%</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
