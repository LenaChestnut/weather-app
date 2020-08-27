import React from 'react';
import Form from './components/Form';

function App() {
	//get location
	const userLocation = prompt('Please enter your location');
	const key = '322163d169cf09cdd079a313e33c1a3a';
	//get weather for that location
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${key}`;

	const getWeatherData = async (url) => {
		try {
			const response = await fetch(url, { mode: 'cors' });
			const promise = await response.json();
			console.log(promise);
		} catch (err) {
			console.log(err);
		}
	};

	getWeatherData(url);

	return (
		<div className="App">
			<h1>Weather App</h1>
			<Form />
		</div>
	);
}

export default App;
