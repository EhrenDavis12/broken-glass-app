import React, { Component } from "react";

class Public extends Component {
	state = {
		message: ""
	};
	componentDidMount() {
		fetch(`${process.env.REACT_APP_API_URL}/api/v1/public`)
			.then(response => {
				if (response.ok) {
					return response.json();
				}

				console.log("Network response was not ok.");
				throw new Error("Network response was not ok.");
			})
			.then(response => {
				console.log(`response.message:${response.message}`);
				console.log(`response:${response}`);
				this.setState({ message: response });
			})
			.catch(error => {
				console.log(`error:${error}`);
				this.setState({ message: error.message });
			});
	}
	render() {
		return <p>{this.state.message}</p>;
	}
}

export default Public;
