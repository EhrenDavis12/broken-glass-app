/**
 *
 * RatingBox
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import Button from "components/Button/index";
import RateTag from "components/RateTag/index";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectRatingBox, { setReview } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
export class RatingBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userid: "",
			reviewValid: false,
			JobTypeId: props.Review !== undefined ? props.Review.JobTypeId : "",
			JobTypeDesc: props.Review !== undefined ? props.Review.JobType.JobTypeDescription : "",
			PayTypeId: props.Review !== undefined ? props.Review.PayTypeId : "",
			PayTypeDesc: props.Review !== undefined ? props.Review.PayType.PayTypeDescription : "",

			shiftPayComment:
				props.Review !== undefined ? props.Review.shiftPayComment : "",
			shiftPayRating: props.Review !== undefined ? props.Review.shiftPayRating : 0,
			managementComment:
				props.Review !== undefined ? props.Review.managementComment : "",
			managementRating:
				props.Review !== undefined ? props.Review.managementRating : 0,
			busyComment: props.Review !== undefined ? props.Review.busyComment : "",
			busyRating: props.Review !== undefined ? props.Review.busyRating : 0,
			customerComment:
				props.Review !== undefined ? props.Review.customerComment : "",
			customerRating: props.Review !== undefined ? props.Review.customerRating : 0,
			overallComment:
				props.Review !== undefined ? props.Review.overallComment : "",
			overallRating: props.Review !== undefined ? props.Review.overallRating : 0
		};
	}

	ValidateReview = () => {
		if (this.state.JobTypeId !== 0 && this.state.PayTypeId !== 0 && this.state.overallComment !== "" && this.state.overallRating !== 0) {
			this.setState({ reviewValid: true })
		}
		else {
			this.setState({ reviewValid: false })
		}
	}
	componentDidMount() {
		if (this.props.auth !== undefined) {
			this.props.auth.getProfile((profile, error) => {
				this.setState({ userid: profile.sub });
			});
		}
	}

	onChangeUserComment = (UserComment, Type) => {
		switch (Type) {
			case "JOBTYPE":
				this.setState({ JobTypeId: UserComment });
				break;
			case "PAYTYPE":
				this.setState({ PayTypeId: UserComment });
				break;
			case "AVERAGE":
				this.setState({ shiftPayComment: UserComment });
				break;
			case "MANAGEMENT":
				this.setState({ managementComment: UserComment });
				break;
			case "BUSY":
				this.setState({ busyComment: UserComment });
				break;
			case "CUSTOMERS":
				this.setState({ customerComment: UserComment });
				break;
			case "OVERALL":
				this.setState({ overallComment: UserComment });
				break;
		}
		this.ValidateReview();
	};

	onClickRating = (Rating, Type) => {
		switch (Type) {
			case "AVERAGE":
				this.setState({ shiftPayRating: Rating });
				break;
			case "MANAGEMENT":
				this.setState({ managementRating: Rating });
				break;
			case "BUSY":
				this.setState({ busyRating: Rating });
				break;
			case "CUSTOMERS":
				this.setState({ customerRating: Rating });
				break;
			case "OVERALL":
				this.setState({ overallRating: Rating });
				break;
		}
		this.ValidateReview();
	};

	Submit = evt => {
		
		evt.preventDefault();

		const review = {
			company: {
				id: this.props.storeId,
				companyName: this.props.storeName
			},

			review: {
				userId: this.state.userid,
				shiftPayComent: this.state.shiftPayComment,
				shiftPayRating: this.state.shiftPayRating,
				managementComment: this.state.managementComment,
				managementRating: this.state.managementRating,
				busyComment: this.state.busyComment,
				busyRating: this.state.busyRating,
				customerComment: this.state.customerComment,
				customerRating: this.state.customerRating,
				overallComment: this.state.overallComment,
				overallRating: this.state.overallRating,
				JobTypeId: this.state.JobTypeId,
				PayTypeId: this.state.PayTypeId
			}
		};
		this.PostReview(review);
		this.props.onSubmit();
	};

	PostReview = review => {
		try {
			const accessToken = this.props.auth.getAccessToken();

			fetch(`${process.env.REACT_APP_API_URL}/api/v1/review`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`
				},
				body: JSON.stringify(review)
			}).then(response => {
				if (response.ok) {
					this.props.reload(true);
					return;
				}
				throw new Error("Network response was not ok.");
			});
		} catch (error) {
			console.debug(error.message);
		}
	};

	renderButton = () => {

		if (!this.props.ReadOnly) {
			return (<Button className={!this.state.reviewValid ? 'disabled' : ''} onClick={!this.state.reviewValid ? ()=>{} : this.Submit}>Submit</Button>);
		}
		else {
			return (<></>);
		}
	}

	render() {
		const { ReadOnly } = { ...this.props };
		return (
			<div>
				<div className="border p-2">
					<RateTag
						Label="Job Types "
						Text={this.state.JobTypeDesc}
						Type={ReadOnly ? "Text" : "DropDown"}
						ReadOnly={ReadOnly}
						onClickRating={this.onClickRating}
						onChangeComment={this.onChangeUserComment}
						RatingFor="JOBTYPE"
						DropDownOptions={this.props.JobDropDownOptions}
						HideRatingBar={true}
					/>
					<RateTag
						Label="Pay Types "
						Text={this.state.PayTypeDesc}
						Type={ReadOnly ? "Text" : "DropDown"}
						onChangeComment={this.onChangeUserComment}
						ReadOnly={ReadOnly}
						RatingFor="PAYTYPE"
						DropDownOptions={this.props.PayDropDownOptions}
						HideRatingBar={true}
					/>
					<RateTag
						Label="Average Shift $ "
						Text={this.state.shiftPayComment}
						Rating={this.state.shiftPayRating}
						Type="Text"
						ReadOnly={ReadOnly}
						onClickRating={this.onClickRating}
						onChangeComment={this.onChangeUserComment}
						RatingFor="AVERAGE"
						HideRatingBar={false}
					/>
					<RateTag
						Label="Management "
						Text={this.state.managementComment}
						Rating={this.state.managementRating}
						Type="Text"
						ReadOnly={ReadOnly}
						onClickRating={this.onClickRating}
						onChangeComment={this.onChangeUserComment}
						RatingFor="MANAGEMENT"
						HideRatingBar={false}
					/>
					<RateTag
						Label="Busy "
						Text={this.state.busyComment}
						Rating={this.state.busyRating}
						Type="Text"
						ReadOnly={ReadOnly}
						onClickRating={this.onClickRating}
						onChangeComment={this.onChangeUserComment}
						RatingFor="BUSY"
						HideRatingBar={false}
					/>
					<RateTag
						Label="Customers "
						Text={this.state.customerComment}
						Rating={this.state.customerRating}
						Type="Text"
						ReadOnly={ReadOnly}
						onClickRating={this.onClickRating}
						onChangeComment={this.onChangeUserComment}
						RatingFor="CUSTOMERS"
						HideRatingBar={false}
					/>
					<RateTag
						Label="Over All "
						Text={this.state.overallComment}
						Rating={this.state.overallRating}
						Type="Text"
						ReadOnly={ReadOnly}
						onClickRating={this.onClickRating}
						onChangeComment={this.onChangeUserComment}
						RatingFor="OVERALL"
						HideRatingBar={false}
					/>
					{this.renderButton()}
				</div>
			</div>
		);
	}
}

RatingBox.propTypes = {
	ReadOnly: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired,
	Review: PropTypes.object,
	StoreId: PropTypes.string,
	StoreName: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
	ratingBox: makeSelectRatingBox()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

const withReducer = injectReducer({ key: "ratingBox", reducer });
const withSaga = injectSaga({ key: "ratingBox", saga });

export default compose(
	withReducer,
	withSaga,
	withConnect
)(RatingBox);
