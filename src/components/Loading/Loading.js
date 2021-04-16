import React, { useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
/* Components */
import Preloader from '../Preloader';
import connect from '../../context/connect';
import httpClient from '../../utils/axios';
const { BRAND_ID } = require('../../config');

/* Style */
import style from './loading.css';


const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const Loading = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const [header_logo_img, setHeaderLogoImg] = React.useState('');
	const [compaies, setCompanies] = React.useState([]);

	useEffect(() => {
		console.log('BRAND_ID--->', BRAND_ID)
		setHeaderLogoImg(window.localStorage.getItem('header_logo_img'));
		handleGetCompaies();
	}, [])

	const handleGetCompaies = () => {
		let companies = httpClient.apiCompanyGet('/brands');
		let brand_id = httpClient.apiCompanyGet(`/brand/${BRAND_ID}`);
		console.log('compaies--->', companies.brands)
		localStorage.setItem('companies', []);
	}

	return (
		<div className={style.loading} >
			{/* <Preloader
				active
				color="blue"
				size="big"
			/> */}
			<img src={header_logo_img === 'company1' ? "/img/virtualium.png" : "/img/virtualium1.png"} alt="/img/virtualium.png" style={{ width: 300, height: 120 }} />
			<Backdrop className={classes.backdrop} open={open}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	)
}

export default Loading;