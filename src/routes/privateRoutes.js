import React from 'react';

const Visor = React.lazy(() => import(/* webpackChunkName: 'Visor' */ '../components/Visor/Visor'));
const Dashboard = React.lazy(() => import(/* webpackChunkName: 'Dashboard' */ '../components/Dashboard/Dashboard'));
const MosaicVideo = React.lazy(() => import(/* webpackChunkName: 'MosaicVideo' */ '../components/MosaicVideo/MosaicVideo'));
const MosaicImages = React.lazy(() => import(/* webpackChunkName: 'MosaicImages' */ '../components/MosaicImages/MosaicImages'));
const MessageDisplay = React.lazy(() => import(/* webpackChunkName: 'MessageDisplay' */ '../components/MessagesDisplay/MessageDisplay'));

const privateRoutes = [
	{
		exact: true,
		name: 'Messages',
		path: '/messages',
		Component: MessageDisplay
	},
	{
		exact: true,
		name: 'Dashboard',
		path: '/dashboard',
		Component: Dashboard
	},
	{
		exact: true,
		name: 'Selfies',
		path: '/selfies',
		Component: MosaicImages
	},
	{
		exact: true,
		name: 'MosaicVideo',
		path: '/videos',
		Component: MosaicVideo
	},
	{
		exact: true,
		name: 'Visor',
		path: '/visor',
		Component: Visor
	}
];

export default privateRoutes;