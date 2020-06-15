/* constants */
import { DASHBOARD_URL_ROOT, DASHBOARD_INDEX, ROLES } from '../../config';

export default {
	// PRODUCTOR
	[ROLES[0]]: [
		{
			id: 'vision-general',
			title: 'visión general',
			type: 'item',
			url: DASHBOARD_URL_ROOT + DASHBOARD_INDEX,
		}
	],
	// ESPECTADOR
	[ROLES[1]]: [
		{
			id: 'vision-general',
			title: 'visión general',
			type: 'item',
			url: DASHBOARD_URL_ROOT + DASHBOARD_INDEX,
		}
	],
	// REPORTADOR
	[ROLES[2]]: [
		{
			id: 'vision-general',
			title: 'visión general',
			type: 'item',
			url: DASHBOARD_URL_ROOT + DASHBOARD_INDEX,
		}
	],
	// CONFIGURADOR
	[ROLES[3]]: [
		{
			id: 'vision-general',
			title: 'visión general',
			type: 'item',
			url: DASHBOARD_URL_ROOT + DASHBOARD_INDEX,
		}
	],
	// ADMINISTRADOR
	[ROLES[4]]: [
		{
			id: 'vision-general',
			title: 'visión general',
			type: 'item',
			url: DASHBOARD_URL_ROOT + DASHBOARD_INDEX,
		},
		{
			id: 'messages',
			title: 'messages',
			type: 'item',
			url: '/messages',
		},
		{
			id: 'selfies',
			title: 'selfies',
			type: 'item',
			url: '/selfies',
		},
		{
			id: 'videos',
			title: 'videos',
			type: 'item',
			url: '/videos',
		},
		{
			id: 'agregar-evento',
			title: 'Agregar evento',
			type: 'item',
			url: DASHBOARD_URL_ROOT + 'eventos/agregar',
		}
	],
	// TECNICO MULTICANAL
	[ROLES[5]]: [
		{
			id: 'vision-general',
			title: 'visión general',
			type: 'item',
			url: DASHBOARD_URL_ROOT + DASHBOARD_INDEX,
		}
	]
}