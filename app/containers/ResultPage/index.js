/**
 *
 * ResultPage
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import styled from "styled-components";

import Footer from "components/Footer/index";
import Button from "components/Button/index";
import RatingBox from "containers/RatingBox/Loadable";
import RatingBoxes from "components/RatingBoxes/index";
import Modal from "components/Modal/index";
import RatingBar from "components/RatingBar/index";
import RateTag from "components/RateTag/index";
import SearchBar from "containers/SearchBar/Loadable";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { toggleModal, setReviews } from "./actions";
import {
	makeSelectResultPage,
	makeToggleModal,
	makeSetReviews,
	makeSelectSearch
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import MapContainer from "containers/EhrensPlayGround/GoogleMap";
import { debug } from "util";

const Container = styled.div`
	opacity: 0.8;
	background-color: #f5f5f0;
	margin-top: 25px;
	padding: 8px;
`;

const Title = styled.h1`
	size: 6em;
	color: black;
	weight: bold;
`;

/* eslint-disable react/prefer-stateless-function */
export class ResultPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			response: null,
			PayDropDownOptions: null,
			JobDropDownOptions: null,
			selection: null,
			reSearch: false,
		};
	}

	componentDidMount() {
		this.props.setToggleModal();
		let api = "/api/v1/jobs";
		fetch(`${process.env.REACT_APP_API_URL}${api}`)
			.then(response => {
				if (response.ok) return response.json();
				throw new Error("Network response was not ok.");
			})
			.then(response => {
				const stat = [];
				response.forEach(type => {
					stat.push({ Id: type.id, Text: type.JobTypeDescription });
				});
				this.setState({ JobDropDownOptions: stat });
			})
			.catch(error => {
				console.log(error);
			});

		api = "/api/v1/pay";
		fetch(`${process.env.REACT_APP_API_URL}${api}`)
			.then(response => {
				if (response.ok) return response.json();
				throw new Error("Network response was not ok.");
			})
			.then(response => {
				const stat = [];
				response.forEach(type => {
					stat.push({ Id: type.id, Text: type.PayTypeDescription });
				});
				this.setState({ PayDropDownOptions: stat });
			})
			.catch(error => {
				console.log(error);
			});
	}

	loadReviews = multi => {
		const store = this.state.selection.place_id;
		let api = "/api/v1/onereview/";
		let allFlg = multi === undefined ? true : false;
		if (allFlg) {
			//set the search for all
			api = "/api/v1/allreviews/";
		}
		fetch(`${process.env.REACT_APP_API_URL}${api}${store}`)
			.then(response => {
				if (response.ok) return response.json();
				throw new Error("Network response was not ok.");
			})
			.then(response => {
				this.setState({ response: response });
			})
			.catch(error => {
				console.log(error);
			});
	};

	loadRatingBox = response => {
		if (response === null) {
			return <></>;
		} else {
			return response.map(review => {
				<RatingBox {...review} ReadOnly={true} />;
			});
		}
	};

	loadMapResults = x => {
		this.setState({ selection: x });
		this.loadReviews(false);
	};

	loadAll = () => {
		this.loadReviews(true);
	};

	displayMap = () => {
		return (
			<MapContainer
				searchPlace={this.props.search}
				callBack={this.loadMapResults}
				runSearch={false}
			/>
		);
	};

	

	displayMapReSearch = () => {
		this.setState({reSearch:false});
		return (
			<MapContainer
				searchPlace={this.props.search}
				callBack={this.loadMapResults}
				runSearch={true}
			/>
		);
	};

	toggleReSearch = () =>{
		this.setState({reSearch: true});
	}

	render() {
		const { resultsPage, showModal, onToggleModal, reviews, search } = this.props;
		const loggedOut = !this.props.auth.isAuthenticated();
		return (
			<div>
				<Modal onClick={onToggleModal} ShowModal={showModal}>
					<RatingBox
						ReadOnly={false}
						auth={this.props.auth}
						storeName={this.state.selection === null ? "" : this.state.selection.name}
						storeId={
							this.state.selection === null ? "" : this.state.selection.place_id
						}
						JobDropDownOptions={this.state.JobDropDownOptions}
						PayDropDownOptions={this.state.PayDropDownOptions}
					/>
				</Modal>

				<div className="container">
					<div className="text-right mb-3">
						<SearchBar onEnter={this.toggleReSearch} />
					</div>
					{this.state.reSearch? this.displayMapReSearch() : this.displayMap()}
					<Container hidden={this.state.selection === null}>
						<img
							src={this.state.selection === null ? "" : this.state.selection.icon}
						/>
						<Title>
							{this.state.selection === null ? "" : this.state.selection.name}
						</Title>
						{/* <p>{this.state.selection === null ? "" : this.state.selection.id}</p>
            <p>{this.state.selection === null ? "" : this.state.selection.place_id}</p> */}
						<p>
							Address:{" "}
							{this.state.selection === null ? "" : this.state.selection.vicinity}
						</p>
						<p>
							Google Reviews:{" "}
							{this.state.selection === null
								? 0
								: this.state.selection.user_ratings_total}
						</p>

						<RatingBar
							Rating={this.state.selection === null ? 0 : this.state.selection.rating}
							ReadOnly={true}
						/>
						<Button
							className="mt-1"
							hidden={loggedOut}
							onClick={this.props.onToggleModal}
							toggle={this.props.showModal}
							style="dark"
						>
							Rate for Yourself
						</Button>

						<RatingBoxes Reviews={this.state.response} />

						<Button hidden={loggedOut} onClick={this.loadAll} style="dark">
							View More
						</Button>
					</Container>
				</div>
				{/* <Footer /> */}
			</div>
		);
	}
}

ResultPage.propTypes = {
	resultPage: PropTypes.any,
	dispatch: PropTypes.func.isRequired,
	showModal: PropTypes.bool,
	onToggleModal: PropTypes.func,
	setToggleModal: PropTypes.func,
	apiFindOneReview: PropTypes.func,
	search: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
	resultPage: makeSelectResultPage(),
	showModal: makeToggleModal(),
	search: makeSelectSearch()
});

function mapDispatchToProps(dispatch) {
	return {
		onToggleModal: evt => {
			dispatch(toggleModal(evt.target.dataset.toggle === "true" ? false : true));
		},
		dispatch,
		setToggleModal: flag => {
			dispatch(toggleModal(false));
		}
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withReducer = injectReducer({ key: "resultPage", reducer });
const withSaga = injectSaga({ key: "resultPage", saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(ResultPage);
