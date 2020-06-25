import React, { useRef, useState, useEffect } from 'react';

/* config */
import { API_PY } from '../../config.js';

/* components */
import MessageDisplay from '../../components/MessageDisplay/MessageDisplay';

/* style */
// import style from './componentname.css';

const Logs = () => {
	return(
		<div>
			<MessageDisplay
				fetchMessage={`${API_PY}message/process_logs`}
				alert='No se encontró ningún log... Pero no te preocupes, llegarán pronto!!!'
			/>
		</div>
	);
}
export default Logs;