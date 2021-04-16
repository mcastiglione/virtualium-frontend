import {
	LOGOUT,
	SET_USER,
	START_LOGIN,
	HANDLE_LOGIN,
	SET_ERROR_LOGIN,
	SET_SUCCESS_LOGIN,
	RESTART_ERROR_SET_USER,
	HEADER_LOGO_IMG
} from '../config.js';

const init = {
	user: null,
	isLogin: false,
	errorMsj: null,
	isLoginLoading: false,
	triggerOpenLogin: false,
	header_logo_img: 'company1',
};

const login = (state = init, action) => {
	switch (action.type) {
		case SET_USER:
		case START_LOGIN:
		case HANDLE_LOGIN:
		case SET_ERROR_LOGIN:
		case SET_SUCCESS_LOGIN:
		case RESTART_ERROR_SET_USER:
		case HEADER_LOGO_IMG:
			return { ...state, ...action.payload };
			break;
		case LOGOUT:
			return init;
			break;
		default:
			return state;
	}
};

export default login;
