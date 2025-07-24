import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import WebsiteHeader from './Header/WebsiteHeader';
import Footer from './Footer/Footer';
import ProtectedRoute from './Auth/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = lazy(() => import('./Pages/Login/Login'));
const Home = lazy(() => import('./Pages/Home/Home'));
const About = lazy(() => import('./Pages/About/About'));
const Calculator = lazy(() => import('./Pages/Calculator/Calculator'));
const NotFound = lazy(() => import('./Pages/NotFound/NotFound'));
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));

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
							<Route path='/login' element={<Login />} />
							<Route
								path='/dashboard'
								element={
									<ProtectedRoute>
										<Dashboard />
									</ProtectedRoute>
								}
							/>
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Suspense>
				</main>
				<footer>
					<Footer />
				</footer>
				<ToastContainer position='top-right' autoClose={3000} />
			</div>
		</Router>
	);
}

export default App;
