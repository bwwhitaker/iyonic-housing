import { defineConfig } from 'vite';

export default defineConfig({
	test: {
		environment: 'jsdom',
		coverage: {
			enabled: true,
			reporter: ['text', 'html'],
			reportsDirectory: './coverage',
			exclude: ['node_modules/', 'tests/', './vite.config.js', './vitest.config.js', './eslint.config.js'],
		},
	},
});
