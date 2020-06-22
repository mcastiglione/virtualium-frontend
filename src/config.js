/*********************************************************
* API_KEYS
*********************************************************/
export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
export const SITE_KEY_RECAPTCHA = process.env.SITE_KEY_RECAPTCHA;


/*********************************************************
* Constantes generales
*********************************************************/
export const ASSETS_URL = process.env.ASSETS_URL;

/*********************************************************
* Materialize
*********************************************************/
export const SCALES = ['big', 'small'];
export const SIZES = ['s', 'm', 'l', 'xl'];
export const PLACEMENTS = ['left', 'center', 'right'];
export const STYLES = ['large', 'small', 'floating', 'flat'];
export const ICON_SIZES = ['tiny', 'small', 'medium', 'large'];
export const WAVES = ['light', 'red', 'yellow', 'orange', 'purple', 'green', 'teal'];

/*********************************************************
* Reducers - Actions
*********************************************************/
export const LOGOUT = 'LOGOUT';
export const BUYING = 'BUYING';
export const SET_USER = 'SET_USER';
export const GET_EVENTO = 'GET_EVENTO';
export const SET_EVENTO = 'SET_EVENTO';
export const SET_MESSAGE = 'SET_MESSAGE';
export const START_LOGIN = 'START_LOGIN';
export const RESET_EVENTO = 'RESET_EVENTO';
export const HANDLE_LOGIN = 'HANDLE_LOGIN';
export const SET_ERROR_LOGIN = 'SET_ERROR_LOGIN';
export const STARTING_PURCHASE = 'STARTING_PURCHASE';
export const TOGGLE_CATEGORIES = 'TOGGLE_CATEGORIES';
export const SET_SUCCESS_LOGIN = 'SET_SUCCESS_LOGIN';
export const RESTART_ERROR_SET_USER = 'RESTART_ERROR_SET_USER';

/*********************************************************
* Backend endpoint url
*********************************************************/
export const API_CAKEPHP = process.env.API_CAKEPHP;
export const API_PY = 'https://api.virtualium.ttde.com.ar/';
export const CAMERA_URL = 'https://d3myw7lup9h3o.cloudfront.net/';

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
 * - si se hacen cambios en el back-end (modelo de la DB) deberán ajustarse los roles según corresponda
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

/**
 * Categorias de los eventos
 *--------------------------------------
 * NOTAS:
 * - si se hacen cambios en el back-end (modelo de la DB) deberá ajustarse según corresponda
 * - Respetar el orden en que están declaradas las categorías
 * - si se cambia el orden puede generar inconsistencias en la app
*/
export const CATEGORIAS_EVENTO = [
	'Cine',
	'Música',
	'Teatro',
	'Familia',
	'Especiales',
];