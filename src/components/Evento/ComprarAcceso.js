import React from 'react';
import { NavLink, Link } from 'react-router-dom';

/* style */
import cx from 'classnames';
import style from './evento.css';

/* Components */
import Select from '../Select';

const ComprarAcceso = () => {
	return(
		<div className={style.CA} >
			<section className={style.header} >
			 	<h2>Compra tu acceso</h2>
			</section>
			<section className={style.form} >
				<Select
					selectClassName={style.select}
					label='SHOWS'
					s={12}
					name='shows'
					onChange={() => {}}
					value={'demo1'}
				>
					<option value="demo1">Demo 1</option>
					<option value="demo2">Demo 2</option>
					<option value="demo3">Demo 3</option>
				</Select>

				<Select
					selectClassName={style.select}
					label='ACCESO'
					s={12}
					name='campo'
					onChange={() => {}}
					value={'Campo1'}
				>
					<option value="Campo1">Campo 1</option>
					<option value="Campo2">Campo 2</option>
					<option value="Campo3">Campo 3</option>
				</Select>

				<Select
					selectClassName={style.select}
					label='CANTIDAD'
					s={12}
					name='cantidad'
					onChange={() => {}}
					value={'cantidad'}
				>
					<option value="cantidad1">1</option>
					<option value="cantidad2">2</option>
					<option value="cantidad3">3</option>
				</Select>

				<Select
					selectClassName={style.select}
					label='MEDIOS DE PAGO'
					s={12}
					name='MEDIOPAGO'
					onChange={() => {}}
					value={'medio1'}
				>
					<option value="MEDIO1">VISA</option>
					<option value="MEDIO2">MASTER CARD</option>
					<option value="MEDIO3">SANTANDER</option>
				</Select>
				<Link to='/visor' className={cx(style.btnSalaVirtual)} > ir a sala virtual </Link>
			</section>
		</div>
	);
}

export default ComprarAcceso;