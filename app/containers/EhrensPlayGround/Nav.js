import React, { Component } from "react";
import { Link } from "react-router-dom";
import "containers/EhrensPlayGround/index.css";

class Nav extends Component {
	render() {
		const {
			isAuthenticated,
			userHasScopes,
			userHasRole,
			login,
			logout
		} = this.props.auth;
		return (
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/profile">Profile</Link>
					</li>
					<li>
						<Link to="/api/v1/public">Public</Link>
					</li>
					{isAuthenticated() && (
						<li>
							<Link to="/api/v1/private">Private</Link>
						</li>
					)}
					{isAuthenticated() && userHasScopes(["read:review"]) && (
						<li>
							<Link to="/api/v1/review">Review</Link>
						</li>
					)}
					{isAuthenticated() && userHasRole(["admin"]) && (
						<li>
							<Link to="/api/v1/admin">Admin</Link>
						</li>
					)}
					<li>
						<button onClick={isAuthenticated() ? logout : login}>
							{isAuthenticated() ? "Log Out" : "Log In"}
						</button>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Nav;
