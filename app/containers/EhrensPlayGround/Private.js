import React, { Component } from "react";

class Private extends Component {
	state = {
		message: ""
	};
	componentDidMount() {
		try {
			const IdToken = this.props.auth.getIdToken();
			fetch(`${process.env.REACT_APP_API_URL}/api/v1/private`, {
				headers: { Authorization: `Bearer ${IdToken}` }
			})
				.then(response => {
					if (response.ok) return response.json();
					throw new Error("Network response was not ok.");
				})
				.then(response => {
					this.setState({ message: response });
				});
		} catch (error) {
			this.setState({ message: error.message });
		}
	}
	render() {
		return <p>{this.state.message}</p>;
	}
}

export default Private;
