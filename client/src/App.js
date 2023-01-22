import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import LandingPage from './components/LandingPage';

import './App.css';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login' element={<Login />} />
					<Route path='/home' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
