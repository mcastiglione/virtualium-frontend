import React, { lazy } from 'react';

const Portal = lazy(() => import(/* webpackChunkName: 'Portal' */ '../components/Portal/Portal'));
const Evento = lazy(() => import(/* webpackChunkName: 'Evento' */ '../components/Evento/Evento'));
const Visor = React.lazy(() => import(/* webpackChunkName: 'Visor' */ '../components/Visor/Visor'));
const ConfirmEmail = lazy(() => import(/* webpackChunkName: 'ConfirmEmail' */ '../components/ConfirmEmail'));
const MosaicVideo = React.lazy(() => import(/* webpackChunkName: 'MosaicVideo' */ '../components/MosaicVideo/MosaicVideo'));
const MosaicImages = React.lazy(() => import(/* webpackChunkName: 'MosaicImages' */ '../components/MosaicImages/MosaicImages'));
const MessageDisplay = React.lazy(() => import(/* webpackChunkName: 'MessageDisplay' */ '../components/MessagesDisplay/MessageDisplay'));

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
	{
		exact: true,
		name: 'Messages',
		path: '/messages',
		Component: MessageDisplay,
	},
	{
		exact: true,
		name: 'Selfies',
		path: '/selfies',
		Component: MosaicImages,
	},
	{
		exact: true,
		name: 'MosaicVideo',
		path: '/videos',
		Component: MosaicVideo,
	},
	{
		exact: true,
		name: 'Visor',
		path: '/visor',
		Component: Visor
	},
];

export default PublicRoutes;