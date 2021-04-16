import React from 'react';
import Grid from '@material-ui/core/Grid';
import Table from './Table';
import Form from './Form';

const Company = ({ open }) => {
	return (
		<Grid container>
			<Grid item xs={12} sm={4}>
				<Form />
			</Grid>
			<Grid item xs={12} sm={8}>
				<Table />
			</Grid>
		</Grid>
	)
}

export default Company;