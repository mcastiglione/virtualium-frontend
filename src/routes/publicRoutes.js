import React, { lazy } from 'react';

const Portal = lazy(() => import(/* webpackChunkName: 'Portal' */ '../components/Portal/Portal'));
const Evento = lazy(() => import(/* webpackChunkName: 'Evento' */ '../components/Evento/Evento'));
const ConfirmEmail = lazy(() => import(/* webpackChunkName: 'ConfirmEmail' */ '../components/ConfirmEmail'));

const PublicRoutes = [
	{
		path: '/',
		exact: true,
		name: 'Portal',
		Component: Portal,
		restricted: false,
	},
	{
		path: '/evento/:id/:slug',
		exact: true,
		name: 'Evento',
		restricted: false,
		Component: Evento
	},
	{
		path: '/confirmarcion/:hash',
		exact: true,
		name: 'ConfirmEmail',
		restricted: false,
		Component: ConfirmEmail
	},
];

export default PublicRoutes;