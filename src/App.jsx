import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import WebsiteHeader from './Header/WebsiteHeader';
const Home = lazy(() => import('./Pages/Home/Home'));
const About = lazy(() => import('./Pages/About/About'));
const Calculator = lazy(() => import('./Pages/Calculator/Calculator'));
const NotFound = lazy(() => import('./Pages/NotFound/NotFound'));
import Footer from './Footer/Footer';

function App() {
	return (
		<Router>
			<div>
				<header>
					<WebsiteHeader />
				</header>
				<main>
					<Suspense
						fallback={
							<div>
								<h4>Loading...</h4>
							</div>
						}
					>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/about' element={<About />} />
							<Route path='/calculator' element={<Calculator />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Suspense>
				</main>
				<footer>
					<Footer />
				</footer>
			</div>
		</Router>
	);
}

export default App;
