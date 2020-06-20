import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Redirect, Switch, Route, Link } from 'react-router-dom';

/* style */
import style from './dashboard.css';

/* constants */
import { ROLES, DASHBOARD_INDEX, DASHBOARD_URL_ROOT } from '../../config';
import menuRoles from './menuRoles.js';

/* context */
import connect from '../../context/connect';

/* Components */
import Overview from './Overview';
import Preloader  from '../Preloader';
import PrivateRoute from '../PrivateRoute';
import Navigation from './Navigation/Navigation';

/* Routes */
import dashboardRoutes from '../../routes/dashboardRoutes';

const Dashboard = ({ user, isLogin }) => {

	const ROL = ROLES.find((el) => el === user.rol);
	/*
	 * Si el rol es undefined significa que hay inconsistencia con la DB
	 * verificar el fichero src/config.js y corroborar que esté
	 * actualizado con el modelo de la DB (backend CakePHP)
	 * IMPLEMENTAR UN CORRECTO MENSAJE PARA EL USUARIO EN ESTE CASO BORDE
	*/
	if(ROL === undefined) return <Redirect to="/" />;

	const menu = menuRoles[ROL];

	const _privateRoutes = dashboardRoutes[ROL].map((route, index) => {
		let {
			path,
			exact,
			name,
			Component,
		} = route;

		return (Component) ? (
			<PrivateRoute
				rol={ROL}
				key={index}
				path={path}
				name={name}
				exact={exact}
				isLogin={isLogin}
				component={Component}
			/>
		) : (null);
	});

	const loading = (
		<div className={style.loading}>
			<Preloader
				active
				size="big"
				color="blue"
			/>
		</div>
	);

	return(
		<div className={style.mainContent} >
			<Navigation className={style.sidenavContent} navContent={menu} />

			<Suspense fallback={loading} >
				<section className={style.panelContent} >
					<Switch>
						{_privateRoutes}
						<Route path="*">
							<Overview />
						</Route>
					</Switch>
				</section>
			</Suspense>
		</div>
	);
}

const mapStateToProps = (store) => ({
	user: store.login.user,
	isLogin: store.login.isLogin
});

export default connect(mapStateToProps)(Dashboard);