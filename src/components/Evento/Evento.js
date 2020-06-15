import React, {
	lazy,
	Suspense,
	useEffect,
	useState,
	useRef,
	Fragment
} from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

/* Components */
import ComprarAcceso from './ComprarAcceso';

/* Style */
import cx from 'classnames';
import style from './evento.css';

/* utils */
import httpClient from '../../utils/axios';

/* Actions */
import { setEvento, resetEvento } from '../../actions/eventoAction';
/* config | constants */
import { ASSETS_URL } from '../../config.js';

/* connect */
import connect from '../../context/connect';

const Evento = ({ evento, isFetching, resetEvento, setEvento }) => {
	const params = useParams();
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		if(!isFetching) {
			setEvento({...params, history});
		}
		return () => {
			resetEvento();
		}
	}, [location])

	return(
		<div className={style.mainContent} >
			<section>
				<img src="http://testing.gallbers.uy/img/2.png" alt=""/>
			</section>
			<section>
				<h3>Descripción</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam impedit earum labore in repellendus laboriosam voluptate cupiditate beatae, doloremque suscipit soluta iure expedita officiis magni minus quam pariatur nemo cum?</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam impedit earum labore in repellendus laboriosam voluptate cupiditate beatae, doloremque suscipit soluta iure expedita officiis magni minus quam pariatur nemo cum?</p>
			</section>
			<section>
				<ComprarAcceso/>
			</section>
		</div>
	);
}

const mapStateToProps = (store) => ({
	evento: store.evento,
	isFetching: store.evento.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
	resetEvento: () => dispatch(resetEvento()),
	setEvento: (param) => dispatch(setEvento(param, dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Evento);