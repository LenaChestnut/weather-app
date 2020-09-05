import React, { useState } from 'react';
import Form from './components/Form';
import './App.css';
import WeatherCard from './components/WeatherCard';
import LoadingScreen from './components/LoadingScreen';

function App() {
	const [apiKey] = useState('322163d169cf09cdd079a313e33c1a3a');
	const [weatherData, setWeatherData] = useState(null);
	const [errorThrown, setErrorThrown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getWeatherData = async (location) => {
		setIsLoading(true);
		try {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
			const response = await fetch(url, { mode: 'cors' });
			if (response.ok) {
				const data = await response.json();
				setWeatherData(data);
				console.log(data);
			} else {
				setErrorThrown(true);
			}
		} catch (err) {
			throw new Error(err);
		} finally {
			setErrorThrown(false);
			setIsLoading(false);
		}
	};

	return (
		<div className="App">
			<Form
				getWeatherData={getWeatherData}
				apiKey={apiKey}
				errorThrown={errorThrown}
			/>
			{isLoading ? <LoadingScreen /> : null}
			{weatherData && !isLoading ? (
				<WeatherCard data={weatherData} />
			) : null}
		</div>
	);
}

export default App;
