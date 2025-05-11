import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WebsiteHeader from './WebsiteHeader';
import '@testing-library/jest-dom/vitest';

describe('App Name Appears in NavBar Component', () => {
	render(<WebsiteHeader />);
	it('renders with default props', () => {
		expect(screen.getByText('iyonic housing')).toBeInTheDocument();
	});
});

describe('iyonic logo is handled correctly', () => {
	it('displays the iyonic logo image'),
		() => {
			render(<WebsiteHeader />);
			const image = screen.getAllByAltText('iyonic logo');
			expect(image).toHaveAttribute('src', 'logo');
		};

	it('has correct alt text'),
		() => {
			render(<WebsiteHeader />);
			const image = screen.getAllByAltText('iyonic logo');
			expect(image).toHaveAttribute('alt', 'iyonic logo');
		};
});
