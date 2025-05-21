import React from 'react';
import './App.css';
import WebsiteHeader from './Header/WebsiteHeader';
import Home from './Pages/Home/Home';
import Footer from './Footer/Footer';

function App() {
	return (
		<div>
			<header>
				<WebsiteHeader />
			</header>
			<main>
				<Home />
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}

export default App;
