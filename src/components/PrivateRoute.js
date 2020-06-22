import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, propsComponent, isLogin, rol, isAuthorized, ...rest}) => {
	/* El usuario no tiene autorización sobre este componente */
	if(!isLogin || isAuthorized && !isAuthorized.includes(rol)) return <Redirect to="/" />;
	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to / page
		<Route {...rest} render={props => (
				<Component {...props} {...propsComponent} />
		)} />
	);
};

export default PrivateRoute;