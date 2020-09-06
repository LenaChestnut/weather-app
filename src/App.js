import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import './App.css';
import WeatherCard from './components/WeatherCard';
import LoadingScreen from './components/LoadingScreen';
import ErrorMessage from './components/ErrorMessage';

function App() {
	const [apiKey] = useState('322163d169cf09cdd079a313e33c1a3a');
	const [weatherData, setWeatherData] = useState(null);
	const [errorThrown, setErrorThrown] = useState(false);
	const [background] = useState(document.getElementById('root'));
	const [backgroundUrl, setBackgroundUrl] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const getBackgroundImage = async (weather) => {
		const keywords = weather.split(' ').join(',');
		try {
			const response = await fetch(
				`https://source.unsplash.com/featured/?${keywords}`,
				{ mode: 'cors' }
			);
			if (response.ok) {
				const bgUrl = response.url;
				return bgUrl;
			} else {
				return '#f4e8c1';
			}
		} catch (err) {
			console.log(err);
		}
	};

	const getWeatherData = async (location) => {
		setIsLoading(true);
		try {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
			const response = await fetch(url, { mode: 'cors' });
			if (response.ok) {
				const data = await response.json();
				setWeatherData(data);
				const bg = await getBackgroundImage(
					data.weather[0].description
				);
				setBackgroundUrl(bg);
			} else {
				setErrorThrown(true);
				setWeatherData(null);
			}
		} catch (err) {
			throw new Error(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		background.style.backgroundImage = `url(${backgroundUrl})`;
	}, [backgroundUrl]);

	return (
		<div className="App">
			<Form getWeatherData={getWeatherData} apiKey={apiKey} />
			{errorThrown && !weatherData ? <ErrorMessage /> : null}
			{isLoading ? <LoadingScreen /> : null}
			{weatherData && !isLoading ? (
				<WeatherCard data={weatherData} />
			) : null}
		</div>
	);
}

export default App;
