import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Autocomplete, {
	createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import data from '../data/city.list.json';

function Form(props) {
	const [location, setLocation] = useState('');
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		if (location.length > 2) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	};

	useEffect(handleOpen, [location]);

	const handleChange = (e) => {
		// let name;
		const name = e.target.value;

		// if (e.nativeEvent.type === 'selectionchange') {
		// 	console.log('selected');
		// } else {
		// 	console.log('other');
		// }

		// if (e.target.className === 'MuiAutocomplete-option') {
		// 	console.log(e.currentTarget);
		// 	name = e.target.textContent;
		// } else {
		// 	name = e.target.value;
		// }

		setLocation(name);

		// if (e.nativeEvent.type === 'selectionchange') {
		// 	console.log(e.nativeEvent.key);
		// 	console.log(e.target.className);
		// }

		// if (
		// 	e.target.className === 'MuiAutocomplete-option' ||
		// 	e.nativeEvent.key === 'Enter'
		// ) {
		// 	setOpen(false);
		// 	handleSubmit(e);
		// } else {
		// 	handleOpen(name);
		// }
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert(location);
		// props.getWeatherData(location);
	};

	const filterOptions = createFilterOptions({
		matchFrom: 'start',
		limit: 5,
	});

	return (
		<form onSubmit={handleSubmit}>
			<Autocomplete
				options={data}
				disableClearable
				autoComplete
				filterOptions={filterOptions}
				getOptionLabel={(option) => `${option.name}, ${option.country}`}
				freeSolo
				open={open}
				// open={true}
				// onInputChange={(e) => handleChange(e)}
				onSelect={(e) => handleChange(e)}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="outlined"
						label="Search"
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
