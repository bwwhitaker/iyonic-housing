import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WebsiteHeader from './WebsiteHeader';
import '@testing-library/jest-dom/vitest';

describe('App Name Appears in NavBar Component', () => {
	render(<WebsiteHeader />);
	it('renders with default props', () => {
		expect(screen.getByText('Iyonic Housing')).toBeInTheDocument();
	});

	it('renders logomark', () => {});
});
