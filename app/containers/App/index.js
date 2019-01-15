/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "containers/HomePage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import Profile from "containers/EhrensPlayGround/Profile";
import Nav from "containers/EhrensPlayGround/Nav";
import Public from "containers/EhrensPlayGround/Public";
import Private from "containers/EhrensPlayGround/Private";
import Auth from "containers/Auth/Auth";
import Callback from "containers/EhrensPlayGround/Callback";

import GlobalStyle from "../../global-styles";

//export default function App() {
class App extends Component {
	constructor(props) {
		super(props);
		this.auth = new Auth(this.props.history);
	}

	render() {
		const { isAuthenticated } = this.auth;
		return (
			<div>
				<Nav auth={this.auth} />
				<div className="body">
					<Switch>
						<Route
							exact
							path="/"
							render={props => <HomePage auth={this.auth} {...props} />}
						/>
						<Route
							exact
							path="/callback"
							render={props => <Callback auth={this.auth} {...props} />}
						/>
						<Route
							exact
							path="/profile"
							render={props =>
								isAuthenticated() ? (
									<Profile auth={this.auth} {...props} />
								) : (
									<Redirect to="/" />
								)
							}
						/>
						<Route path="/api/v1/public" component={Public} />
						<Route
							exact
							path="/api/v1/private"
							render={props =>
								isAuthenticated() ? (
									<Private auth={this.auth} {...props} />
								) : (
									this.auth.login()
								)
							}
						/>
						<Route component={NotFoundPage} />
					</Switch>
					<GlobalStyle />
				</div>
			</div>
		);
	}
}

export default App;
