import auth0 from "auth0-js";

const REDIRECT_ON_LOGIN = "redirect_on_login";

export default class Auth {
	constructor(history) {
		this.history = history;
		this.userProfile = null;
		this.requestedScopes = "openid profile email read:review";
		this.auth0 = new auth0.WebAuth({
			domain: process.env.REACT_APP_AUTH0_DOMAIN,
			clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
			redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
			audience: process.env.REACT_APP_AUTH0_AUDIENCE,
			responseType: "token id_token",
			scope: this.requestedScopes,
			roles: "unverified"
		});
	}

	login = () => {
		localStorage.setItem(
			REDIRECT_ON_LOGIN,
			JSON.stringify(this.history.location)
		);
		this.auth0.authorize();
	};

	handleAuthentication = () => {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
				const redirectLocation =
					localStorage.getItem(REDIRECT_ON_LOGIN) === "undefined"
						? "/"
						: JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN));
				this.history.push(redirectLocation);
			} else if (err) {
				this.history.push("/");
				alert(`Error: ${err.error}. Check the console for further details.`);
				console.debug(err);
			}
			localStorage.removeItem(REDIRECT_ON_LOGIN);
		});
	};

	setSession = authResult => {
		const expiresAt = JSON.stringify(
			authResult.expiresIn * 1000 + new Date().getTime()
		);
		const scopes = authResult.scope || this.requestedScopes || "";
		const roles =
			authResult.idTokenPayload[`${process.env.REACT_APP_URL}/roles`] === undefined
				? "unverified"
				: authResult.idTokenPayload[`${process.env.REACT_APP_URL}/roles`].join(" ");
		localStorage.setItem("access_token", authResult.accessToken);
		localStorage.setItem("id_token", authResult.idToken);
		localStorage.setItem("expires_at", expiresAt);
		localStorage.setItem("scopes", JSON.stringify(scopes));
		localStorage.setItem("roles", JSON.stringify(roles));
		this.scheduleTokenRenewal();
	};

	isAuthenticated = () => {
		const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
		return new Date().getTime() < expiresAt;
	};

	logout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("id_token");
		localStorage.removeItem("expires_at");
		localStorage.removeItem("scopes");
		localStorage.removeItem("roles");
		this.userProfile = null;
		this.auth0.logout({
			clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
			returnTo: process.env.REACT_APP_URL
		});
	};

	getAccessToken = () => {
		const accessToken = localStorage.getItem("access_token");
		if (!accessToken) {
			throw new Error("Not Authorized!");
		}
		return accessToken;
	};

	getIdToken = () => {
		const idToken = localStorage.getItem("id_token");
		if (!idToken) {
			throw new Error("Not Authorized!");
		}
		return idToken;
	};

	getProfile = cd => {
		if (this.userProfile) return cd(this.userProfile);
		this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
			if (profile) this.userProfile = profile;
			cd(profile, err);
		});
	};

	userHasScopes = scopes => {
		const grantedScopes = (
			JSON.parse(localStorage.getItem("scopes")) || ""
		).split(" ");
		return scopes.every(scope => grantedScopes.includes(scope));
	};

	userHasRole = roles => {
		const grantedRoles = (JSON.parse(localStorage.getItem("roles")) || "").split(
			" "
		);
		return roles.every(role => grantedRoles.includes(role));
	};

	renewToken = cb => {
		this.auth0.checkSession({}, (err, result) => {
			if (err) {
				console.debug(`Error: ${err.error} - ${err.error_description}.`);
			} else {
				this.setSession(result);
			}
			if (cb) cb(err, result);
		});
	};

	scheduleTokenRenewal() {
		const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
		const delay = expiresAt - Date.now();
		if (delay > 0) setTimeout(() => this.renewToken(), delay);
	}
}
