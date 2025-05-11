import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Menu from './Menu';
import menuItems from './MenuItems.json';
import '@testing-library/jest-dom/vitest';

describe('Menu is created correctly', () => {
	render(<Menu />);
	it('contains correct number of items'),
		() => {
			expect(menuItems.length === 5);
		};

	it('has first element as Home', () => {
		expect(menuItems[0].Name === 'Home');
	});

	it('has last element as Login', () => {
		expect(menuItems[0].Name === 'Login');
	});
});
