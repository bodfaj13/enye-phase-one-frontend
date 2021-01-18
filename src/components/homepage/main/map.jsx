import React, { Component } from 'react'
import {
  Map,
  Marker,
  GoogleApiWrapper
} from 'google-maps-react';
import { googleapikey } from '../../../appdetails';

class Location extends Component {
  render() {
    const { currentProfile } = this.props
    return (
      <div className="map-holer">
        <Map
          google={this.props.google}
          initialCenter={{
            lat: currentProfile.Latitude,
            lng: currentProfile.Longitude
          }}
          zoom={12}
        >
          <Marker
            name={`${currentProfile.FirstName} ${currentProfile.LastName}'s Location`}
            position={{
              lat: currentProfile.Latitude,
              lng: currentProfile.Longitude
            }}
          />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: googleapikey,
})(Location)