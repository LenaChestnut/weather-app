import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import data from '../data/city.list.json';

const useStyles = makeStyles({
	formInput: {
		width: '100%',
		backgroundColor: 'white',
		borderRadius: '4px',
	},
});

function Form(props) {
	const [location, setLocation] = useState('');
	const [options, setOptions] = useState([]);

	useEffect(() => {
		setLocation('');
	}, [props.errorThrown]);

	const handleChange = (e) => {
		let name = e.target.value;
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
				const optionStr = `${option.name}${option.country}`
					.match(/[\wа-яА-Я]*/g)
					.join('')
					.toLowerCase();
				if (optionStr.startsWith(inputStr)) {
					return option;
				}
				return null;
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

	const classes = useStyles();

	return (
		<form name="search" onSubmit={handleSubmit}>
			<Autocomplete
				autoHighlight
				options={options}
				getOptionLabel={(option) => `${option.name}, ${option.country}`}
				getOptionSelected={(option) => option === options[0]}
				onSelect={(e) => handleChange(e)}
				className={classes.formInput}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="filled"
						label="Search"
						placeholder="London, UK"
						value={location}
					/>
				)}
			/>
			<button id="submit">Go</button>
		</form>
	);
}

Form.propTypes = {
	getWeatherData: PropTypes.func,
	apiKey: PropTypes.string,
	errorThrown: PropTypes.bool,
};

export default Form;
