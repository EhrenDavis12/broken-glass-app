import auth0 from "auth0-js";

const REDIRECT_ON_LOGIN = "redirect_on_login";

let _idToken = null;
let _accessToken = null;
let _scopes = null;
let _roles = null;
let _expiresAt = null;

export default class Auth {
	constructor(history) {
		this.history = history;
		this.userProfile = null;
		this.requestedScopes = "openid profile email read:review";
		/* console.log(process.env); */
		this.auth0 = new auth0.WebAuth({
			domain: process.env.REACT_APP_AUTH0_DOMAIN,
			clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
			redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
			audience: process.env.REACT_APP_AUTH0_AUDIENCE,
			responseType: "token id_token",
			scope: this.requestedScopes,
			role: "unverified"
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
				console.log(err);
			}
			localStorage.removeItem(REDIRECT_ON_LOGIN);
		});
	};

	setSession = authResult => {
		/* console.log(authResult); */
		_expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

		_scopes = authResult.scope || this.requestedScopes || "";
		_roles =
			authResult.idTokenPayload[`${process.env.REACT_APP_URL}/roles`] === undefined
				? "unverified"
				: authResult.idTokenPayload[`${process.env.REACT_APP_URL}/roles`].join(" ");
		_accessToken = authResult.accessToken;
		_idToken = authResult.idToken;
		this.scheduleTokenRenewal();
	};

	isAuthenticated = () => {
		return new Date().getTime() < _expiresAt;
	};

	logout = () => {
		this.auth0.logout({
			clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
			returnTo: process.env.REACT_APP_URL
		});
	};

	getAccessToken = () => {
		if (!_accessToken) {
			throw new Error("Not Authorized!");
		}
		return _accessToken;
	};

	getIdToken = () => {
		if (!_idToken) {
			throw new Error("Not Authorized!");
		}
		return _idToken;
	};

	getProfile = cd => {
		if (this.userProfile) return cd(this.userProfile);
		this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
			if (profile) this.userProfile = profile;
			cd(profile, err);
		});
	};

	userHasScopes = scopes => {
		const grantedScopes = (_scopes || "").split(" ");
		return scopes.every(scope => grantedScopes.includes(scope));
	};

	userHasRole = roles => {
		const grantedRoles = (_roles || "").split(" ");
		return roles.every(role => grantedRoles.includes(role));
	};

	renewToken = cb => {
		this.auth0.checkSession({}, (err, result) => {
			if (err) {
				console.log(`Error: ${err.error} - ${err.error_description}.`);
			} else {
				this.setSession(result);
			}
			if (cb) cb(err, result);
		});
	};

	scheduleTokenRenewal() {
		const delay = _expiresAt - Date.now();
		if (delay > 0) setTimeout(() => this.renewToken(), delay);
	}
}
