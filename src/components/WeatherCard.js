import React from 'react';
import PropTypes from 'prop-types';

function WeatherCard(props) {
	// const {
	// 	name,
	// 	sys: { country },
	// 	main: { temp },
	// 	weather: [{ description: weather }],
	// } = props.data;

	// const convertTemperature = () => {

	// }

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
				<p className="temp">290.15</p>
			</div>
			{/* <input className="temp-display"></input> */}
			<label className="switch">
				<input type="checkbox"></input>
				<span className="toggle"></span>
			</label>
		</div>
	);
}

WeatherCard.propTypes = {
	data: PropTypes.object,
};

export default WeatherCard;
