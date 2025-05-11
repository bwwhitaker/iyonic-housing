import React from 'react';
import './App.css';
import WebsiteHeader from './Header/WebsiteHeader';
import Home from './Pages/Home/Home';

function App() {
	return (
		<div>
			<header>
				<WebsiteHeader />
			</header>
			<main>
				<Home />
			</main>
		</div>
	);
}

export default App;
