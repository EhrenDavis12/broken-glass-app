/*global google*/
import React from "react";
import { compose, withProps, withHandlers, withState } from "recompose";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";

const MyMapComponent = compose(
	withProps({
		googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${
			process.env.REACT_APP_GOOGLE_API_KEY
		}&libraries=geometry,drawing,places`,
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `400px` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withScriptjs,
	withGoogleMap,
	withState("places", "updatePlaces", ""),
	withHandlers(() => {
		const refs = {
			map: undefined
		};

		return {
			onMapMounted: () => ref => {
				refs.map = ref;
			},
			fetchPlaces: ({ updatePlaces }) => searchPlace => {
				debugger;
				const bounds = refs.map.getBounds();
				const service = new google.maps.places.PlacesService(
					refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
				);
				const request = {
					bounds: bounds,
					type: ["restaurants"],
					keyword: searchPlace
				};
				service.nearbySearch(request, (results, status) => {
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						console.log(results);
						updatePlaces(results);
					}
				});
			},
			clickedMe: () => (place, callBack) => {
				console.log(`callBack3:${callBack}`);
				console.log(`place_id:${place.place_id}`);
				console.log(`vicinity:${place.vicinity}`);
				console.log(`rating:${place.rating}`);
				console.log(`photos:${place.photos[0].html_attributions[0]}`);
				console.log(`user_ratings_total:${place.user_ratings_total}`);
				callBack(place);
			}
		};
	})
)(props => {
	console.log(`searchPlace:${props.searchPlace}`);
	console.log(`callBack2:${props.callBack}`);
	return (
		<GoogleMap
			/* onTilesLoaded={props.fetchPlaces} */
			ref={props.onMapMounted}
			onBoundsChanged={() => props.fetchPlaces(props.searchPlace)}
			defaultZoom={8}
			defaultCenter={{ lat: 33.448376, lng: -112.074036 }}
		>
			{props.places &&
				props.places.map((place, i) => (
					<Marker
						key={i}
						onClick={() => props.callBack(place)}
						position={{
							lat: place.geometry.location.lat(),
							lng: place.geometry.location.lng()
						}}
					/>
				))}
		</GoogleMap>
	);
});

export default class MyFancyComponent extends React.PureComponent {
	render() {
		console.log(`callBack:${this.props.callBack}`);
		return (
			<MyMapComponent
				searchPlace={this.props.searchPlace}
				callBack={this.props.callBack}
			/>
		);
	}
}