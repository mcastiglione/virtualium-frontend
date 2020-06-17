import {
	LOGOUT,
	SET_USER,
	START_LOGIN,
	SET_ERROR_LOGIN,
	SET_SUCCESS_LOGIN,
	RESTART_ERROR_SET_USER,
} from '../constants';

const init = {
	user: {},
	isLogin: false,
	errorMsj: null,
	isLoginLoading: false,
};

const login = (state = init, action) => {
	switch(action.type) {
		case SET_USER:
		case START_LOGIN:
		case SET_ERROR_LOGIN:
		case SET_SUCCESS_LOGIN:
		case RESTART_ERROR_SET_USER:
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
