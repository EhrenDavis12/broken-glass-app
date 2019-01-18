import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";

function PublicRoute({ component: Component, scopes, ...rest }) {
	return (
		<AuthContext.Consumer>
			{auth => (
				<Route
					{...rest}
					render={props => {
						return <Component auth={auth} {...props} />;
					}}
				/>
			)}
		</AuthContext.Consumer>
	);
}

PublicRoute.propTypes = {
	component: PropTypes.func.isRequired,
	scopes: PropTypes.array
};

PublicRoute.defaultProps = {
	scopes: []
};

export default PublicRoute;
