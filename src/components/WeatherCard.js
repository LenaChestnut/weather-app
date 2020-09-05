import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function WeatherCard(props) {
	// const {
	// 	name,
	// 	sys: { country },
	// 	main: { temp },
	// 	weather: [{ description: weather }],
	// } = props.data;
	const [tempK] = useState(290.15);
	const [tempDisplayed, setTempDisplayed] = useState('');
	const [tempSystem, setTempSystem] = useState('C');

	const convertTemperature = () => {
		if (tempSystem === 'C') {
			setTempDisplayed(tempK - 273.15);
		} else {
			setTempDisplayed((tempK - 273.15) * 1.8 + 32);
		}
	};

	useEffect(convertTemperature, [tempSystem]);

	const handleChange = (e) => {
		if (e.target.checked) {
			setTempSystem('F');
		} else {
			setTempSystem('C');
		}
	};

	return (
		// <div className="weather-card">
		// 	<h2 className="location">
		// 		{name}, {country}
		// 	</h2>
		// 	<div>
		// 		<p className="weather">
		// 			{weather.charAt(0).toUpperCase() + weather.slice(1)}
		// 		</p>
		// 		<p className="temp">{temp}</p>
		// 	</div>
		// 	<button>Temp</button>
		// </div>
		<div className="weather-card">
			<h2 className="location">Kazan, RU</h2>
			<div>
				<p className="weather">Clear sky</p>
				<p className="temp">
					{tempDisplayed}
					&#176;
					{tempSystem === 'C' ? 'C' : 'F'}
				</p>
			</div>
			<label className="switch">
				<input
					type="checkbox"
					id="switch-input"
					onChange={handleChange}
				></input>
				<span className="toggle"></span>
			</label>
		</div>
	);
}

WeatherCard.propTypes = {
	data: PropTypes.object,
};

export default WeatherCard;
