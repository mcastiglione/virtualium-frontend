/*
 * Todos los componentes de este fichero serán renderizados
 * dentro del Dashboard. El acceso estará restringido 
 * Dependiendo del rol del usuario logueado.
*/
import React from 'react';

/* constants */
import { DASHBOARD_URL_ROOT, DASHBOARD_INDEX, ROLES } from '../config';

/* components */
const Overview = React.lazy(() => {
	return import(/* webpackChunkName: 'Overview' */ '../components/Dashboard/Overview')
});
const AddEvent = React.lazy(() => {
	return import(/* webpackChunkName: 'AddEvent' */ '../components/Dashboard/ManageEvents/AddEvent')
});

export default {
	// PRODUCTOR
	[ROLES[0]]: [
		{
			exact: true,
			name: 'overview',
			path: DASHBOARD_URL_ROOT + DASHBOARD_INDEX,
			Component: Overview,
		}
	],
	// ESPECTADOR
	[ROLES[1]]: [],
	// REPORTADOR
	[ROLES[2]]: [
		{
			exact: true,
			name: 'overview',
			path: DASHBOARD_URL_ROOT + DASHBOARD_INDEX,
			Component: Overview,
		}
	],
	// CONFIGURADOR
	[ROLES[3]]: [
		{
			exact: true,
			name: 'overview',
			path: DASHBOARD_URL_ROOT + DASHBOARD_INDEX,
			Component: Overview,
		}
	],
	// ADMINISTRADOR
	[ROLES[4]]: [
		{
			exact: true,
			name: 'overview',
			path: DASHBOARD_URL_ROOT + DASHBOARD_INDEX,
			Component: Overview,
		},
		{
			exact: true,
			name: 'Agregar un evento',
			path: DASHBOARD_URL_ROOT + 'eventos/agregar',
			Component: AddEvent
		}
	],
	// TECNICO MULTICANAL
	[ROLES[5]]: [
		{
			exact: true,
			name: 'overview',
			path: DASHBOARD_URL_ROOT + DASHBOARD_INDEX,
			Component: Overview,
		}
	]
}