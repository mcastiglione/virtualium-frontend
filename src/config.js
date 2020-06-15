export const URL_API = process.env.URL_API;
export const ASSETS_URL = process.env.ASSETS_URL;
export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
export const SITE_KEY_RECAPTCHA = process.env.SITE_KEY_RECAPTCHA;

/*********************************************************
* Constantes y configuraciones del dashboard
*********************************************************/
export const DASHBOARD_URL_ROOT = '/dashboard/';
export const DASHBOARD_INDEX = 'vision-general';

/**
 * Roles del usuario
 * (1) PRODUCTOR
 * - Solo lectura o ejecución de reportes específicos para el productor.
 *--------------------------------------------------------------------------
 * (2) ESPECTADOR
 * - Visualiza información del evento. Comprar entradas.
 *--------------------------------------------------------------------------
 * (3) REPORTADOR
 * - Permisos de solo lectura.
 *--------------------------------------------------------------------------
 * (4) CONFIGURADOR
 * - Solo crea y administra los eventos que tiene permisos.
 * - Adiciona a artistas a los eventos que tienen asignados.
 *--------------------------------------------------------------------------
 * (5) ADMINISTRADOR
 * - Da permisos sobre eventos al configurador.
 * - Tiene todos los permisos sobre el sistema.
 * - Adiciona artistas a eventos.
 *--------------------------------------------------------------------------
 * (6) TECNICO MULTICANAL
 * - Registra histórico de incidentes en el evento.
 *--------------------------------------------------------------------------
 * NOTAS:
 * - si se hacen cambios en el back-end (modelo de la DB) deberán ajustarses los roles según corresponda
 * - Respetar el orden en que están declarados los roles, si se cambia el orden puede generar inconsistencias en la app
 */
export const ROLES = [
	'productor',
	'espectador',
	'reportador',
	'configurador',
	'administrador',
	'tecnico multicanal',
];