import {
	HEADER_LOGO_IMG,
	FOOTER_LOGO_IMG
} from '../config.js';

/*
 * @param {Object} payload | evento id 
 * @param {Function} dispatch
*/


export const handleChangeHeaderLogoImg = (store) => {
	return {
		type: HEADER_LOGO_IMG,
		payload: {
			header_logo_img: store
		}
	}
}