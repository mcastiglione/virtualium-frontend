/* Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import reducers from './reducers/';
import Provider from './context/provider';
import { SITE_KEY_RECAPTCHA } from './config.js';
import { BrowserRouter } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


/* Components */
import App from './App';

const Main = (
	<GoogleReCaptchaProvider
		language='es-419'
		reCaptchaKey={SITE_KEY_RECAPTCHA}
	>
		<BrowserRouter basename='/'>
			<Provider reducer={reducers}>
				<App/>
			</Provider>
		</BrowserRouter>
	</GoogleReCaptchaProvider>
);

ReactDOM.render(Main, document.getElementById('app'));