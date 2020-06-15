import React from 'react';

/* constants */
import { ROLES } from '../config';

/* conponents */
const Visor = React.lazy(() => import(/* webpackChunkName: 'Visor' */ '../components/Visor/Visor'));
const Dashboard = React.lazy(() => import(/* webpackChunkName: 'Dashboard' */ '../components/Dashboard/Dashboard'));
const MosaicVideo = React.lazy(() => import(/* webpackChunkName: 'MosaicVideo' */ '../components/MosaicVideo/MosaicVideo'));
const MosaicImages = React.lazy(() => import(/* webpackChunkName: 'MosaicImages' */ '../components/MosaicImages/MosaicImages'));
const MessageDisplay = React.lazy(() => import(/* webpackChunkName: 'MessageDisplay' */ '../components/MessagesDisplay/MessageDisplay'));

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
		exact: true,
		name: 'Messages',
		path: '/messages',
		Component: MessageDisplay,
		isAuthorized: [ROLES[4]]
	},
	{
		exact: false,
		name: 'Dashboard',
		path: '/dashboard*',
		Component: Dashboard
	},
	{
		exact: true,
		name: 'Selfies',
		path: '/selfies',
		Component: MosaicImages,
		isAuthorized: [ROLES[4]]
	},
	{
		exact: true,
		name: 'MosaicVideo',
		path: '/videos',
		Component: MosaicVideo,
		isAuthorized: [ROLES[4]]
	},
	{
		exact: true,
		name: 'Visor',
		path: '/visor',
		Component: Visor
	}
];

export default privateRoutes;