import React from 'react';

/* constants */
import { ROLES } from '../config';

/* conponents */
const Logs = React.lazy(() => import(/* webpackChunkName: 'Logs' */ '../views/Logs/Logs'));
const Dashboard = React.lazy(() => import(/* webpackChunkName: 'Dashboard' */ '../components/Dashboard/Dashboard'));

/*
 * Routes para ser renderizados con <PrivateRoute/> lo que evita que los componentes
 * sean renderizados sin que el usuario esté previamente logueado.
 * Si es necesario un nivel más de restricción para el renderizado de los componentes
 * privados es requerido utilizar la clave 'isAuthorized' la cúal deberá ser un arraý
 * con los roles que están autorizados para acceder al componente.
 * EJEMPLO: 
 * {
 * 	path: '/',
 * 	Component: MyComponent,
 * 	isAuthorized: [ROLES[0], ROLES[1], ROLES[2]]
 * }
 * si la clave 'isAuthorized' no está presente no será tomada en cuenta
*/

const privateRoutes = [
	{
		exact: false,
		name: 'Dashboard',
		path: '/dashboard*',
		Component: Dashboard
	},
	{
		exact: true,
		name: 'logs',
		path: '/logs',
		Component: Logs,
		isAuthorized: [ROLES[4]]
	},
];

export default privateRoutes;