import React, { lazy } from 'react';

const Portal = lazy(() => import(/* webpackChunkName: 'Portal' */ '../components/Portal/Portal'));
const Evento = lazy(() => import(/* webpackChunkName: 'Evento' */ '../components/Evento/Evento'));
const Visor = React.lazy(() => import(/* webpackChunkName: 'Visor' */ '../components/Visor/Visor'));
const Messages = React.lazy(() => import(/* webpackChunkName: 'Messages' */ '../views/Messages/Messages'));
const Stream = React.lazy(() => import(/* webpackChunkName: 'Dashboard' */ '../components/Stream/Stream'));
const ConfirmEmail = lazy(() => import(/* webpackChunkName: 'ConfirmEmail' */ '../components/ConfirmEmail'));
const MosaicVideo = React.lazy(() => import(/* webpackChunkName: 'MosaicVideo' */ '../components/MosaicVideo/MosaicVideo'));
const MosaicImages = React.lazy(() => import(/* webpackChunkName: 'MosaicImages' */ '../components/MosaicImages/MosaicImages'));
const Company = React.lazy(() => import(/* webpackChunkName: 'Company' */ '../components/Company/Company'));

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
		Component: Messages,
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
	{
		exact: true,
		name: 'Stream',
		path: '/stream',
		Component: Stream
	},

	{
		exact: true,
		name: 'Company',
		path: '/company',
		Component: Company
	},
];

export default PublicRoutes;