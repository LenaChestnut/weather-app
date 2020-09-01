import React, { useState } from 'react';
import Form from './components/Form';

function App() {
	const [apiKey] = useState('322163d169cf09cdd079a313e33c1a3a');

	const getWeatherData = async (location) => {
		try {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
			const response = await fetch(url, { mode: 'cors' });
			const data = await response.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="App">
			<h1>Weather App</h1>
			<Form getWeatherData={getWeatherData} apiKey={apiKey} />
		</div>
	);
}

export default App;
