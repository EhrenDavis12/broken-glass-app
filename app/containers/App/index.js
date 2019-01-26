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
import styled from 'styled-components';

import HomePage from "containers/HomePage/Loadable";
import ResultPage from 'containers/ResultPage/Loadable';
import NotFoundPage from "containers/NotFoundPage/Loadable";
import Profile from "containers/EhrensPlayGround/Profile";
import Nav from "components/Nav/index";
import Public from "containers/EhrensPlayGround/Public";
import Private from "containers/EhrensPlayGround/Private";
import Review from "containers/EhrensPlayGround/Review";
import Admin from "containers/EhrensPlayGround/Admin";
import Auth from "containers/Auth/SilentAuth";
import PrivateRoute from "containers/Auth/PrivateRoute";
import PublicRoute from "containers/Auth/PublicRoute";
import AuthContext from "containers/Auth/AuthContext";
import Callback from "containers/EhrensPlayGround/Callback";
import pic from "../../images/bar.jpg";

import GlobalStyle from "../../global-styles";

const Wrapper = styled.section`
	background: black;
	height: 100vh;
	overflow-y:auto;
	background-image: url(${pic});
  background-repeat: no-repeat;
  background-attachment: fixed;
	background-position: center; 
	background-size:cover;
`;

//export default function App() {
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: new Auth(this.props.history),
			tokenRenewalComplete: false
		};
	}

	componentDidMount() {
		this.state.auth.renewToken(() =>
			this.setState({ tokenRenewalComplete: true })
		);
	}

	render() {
		const { auth } = this.state;
		if (!this.state.tokenRenewalComplete) return "Loading...";
		return (
			<Wrapper>
				<AuthContext.Provider value={auth}>
					<PublicRoute component={Nav} />
					<div className="body">
						<Switch>
							<PublicRoute exact path="/" component={HomePage} />
							<PublicRoute path="/results" component={ResultPage} />
							<PublicRoute exact path="/callback" component={Callback} />
							<PrivateRoute exact path="/profile" component={Profile} />
							<Route path="/api/v1/public" component={Public} />
							<PrivateRoute exact path="/api/v1/private" component={Private} />
							<PrivateRoute
								exact
								path="/api/v1/review"
								component={Review}
								scopes={["read:review"]}
							/>
							<PrivateRoute exact path="/api/v1/admin" component={Admin} />
							<Route component={NotFoundPage} />
						</Switch>
						<GlobalStyle />
					</div>
				</AuthContext.Provider>
			</Wrapper>
		);
	}
}

export default App;
