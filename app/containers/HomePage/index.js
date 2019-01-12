/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from "react";
import { FormattedMessage } from "react-intl";
import SearchBar from "containers/SearchBar/Loadable";
import messages from "./messages";
import { Link } from "react-router-dom";

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
	render() {
		const { isAuthenticated, login } = this.props.auth;
		return (
			<div className="container">
				<h1>
					<FormattedMessage {...messages.header} />
				</h1>
				<SearchBar />
			</div>
		);
	}
}
