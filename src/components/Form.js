import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import data from '../data/city.list.json';

function Form(props) {
	const [location, setLocation] = useState('');
	const [options, setOptions] = useState([]);

	const handleChange = (e) => {
		const name = e.target.value;
		setLocation(name);
	};

	const filterOptions = () => {
		setOptions([]);

		const inputStr = location
			.match(/[\wа-яА-Я]*/g)
			.join('')
			.toLowerCase();

		if (location !== '') {
			const filteredData = data.filter((option) => {
				const optionStr = `${option.name}${option.country}`.toLowerCase();
				if (optionStr.startsWith(inputStr)) {
					return option;
				}
			});
			const shortenedData = filteredData.slice(0, 5);
			setOptions(shortenedData);
		}
	};

	useEffect(filterOptions, [location]);

	const handleSubmit = (e) => {
		e.preventDefault();
		props.getWeatherData(location);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Autocomplete
				options={options}
				getOptionLabel={(option) => `${option.name}, ${option.country}`}
				freeSolo
				onSelect={(e) => handleChange(e)}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="outlined"
						label="Search"
						placeholder="London, UK"
						value={location}
					/>
				)}
			/>
			<button>Go</button>
		</form>
	);
}

Form.propTypes = {
	getWeatherData: PropTypes.func,
	apiKey: PropTypes.string,
};

export default Form;
