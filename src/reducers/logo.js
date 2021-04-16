import {
	HEADER_LOGO_IMG,
	FOOTER_LOGO_IMG
} from '../config.js';

const init = {
	header_logo_img: null
};

const logo = (state = init, action) => {
	switch (action.type) {
		case HEADER_LOGO_IMG:
		case FOOTER_LOGO_IMG:
			return { ...state, ...action.payload };
			break;
		default:
			return state;
	}
};

export default logo;
