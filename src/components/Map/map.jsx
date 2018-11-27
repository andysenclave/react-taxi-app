import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import ReactDOM from 'react-dom';
import CustomMarker from './marker';
import { apiKey } from '../../constants/app.config';
import './map.css';
import { carPin, taxiPin, inactiveCarPin } from '../../assets/icons';

const mapStyles = {
  position: 'relative',
  width: '100%',
  height: '100%'
};

export class MapContent extends Component {
  
  generateCabMarkers(cabs, google) {
    if(cabs.length === 0) {
      return '';
    } else {
      let CabList = (cabs.map((cab, index) => {
        let icon = carPin;
        let coordinate = {
          lat: '',
          lng: ''
        };
        if(cab.provider && cab.provider.toLowerCase() === 'mytaxi') {
          icon = taxiPin;
        }
        if(cab.status && cab.status.toLowerCase() === 'inactive') {
          icon = inactiveCarPin;
        }
        if(cab.coordinate) {
          coordinate.lat = cab.coordinate.latitude;
          coordinate.lng = cab.coordinate.longitude;
        }
        if(cab.coordinates) {
          coordinate.lat = cab.coordinates[1];
          coordinate.lng = cab.coordinates[0];
        }
        return (
          <CustomMarker 
            name={cab.provider}
            coordinate={coordinate}
            icon={icon}
            google={google}
            loaded={true}
            key={`${index}-${cab.provider}`}
          />
        );
      }));
      return CabList;
    }
  }

  updateMapHeight(ref, height) {
    if(height) {
      ref.style.height = `${height}`;
    } else {
      const { top } = ReactDOM.findDOMNode(ref).getBoundingClientRect();
      // eslint-disable-next-line
      const windowHeight = window.innerHeight;
      ref.style.height = `${windowHeight - top}px`;
    }
  }

  componentDidMount(){
    this.updateMapHeight(this.refs.mapWrapper, this.props.height);
  }

  render() {
    const { cars, google, showCurrentLocation, center } = this.props;
    const CabMarkers = this.generateCabMarkers(cars, google);
    return (
      <section className='map-wrapper' ref='mapWrapper'>
        <Map
          google={google}
          zoom={13}
          style={mapStyles}
          initialCenter={center}
        >
          { CabMarkers }
          {showCurrentLocation ? 
            (<CustomMarker
              name='Your position'
              coordinate={this.props.center}
              google={google}
              loaded={true}
              size={42}
            />) : ''
          }
        </Map>
      </section>
    );
  }
};

MapContent.propTypes = {
  cars: PropTypes.array.isRequired,
  showCurrentLocation: PropTypes.bool,
  center: PropTypes.object.isRequired
};

export default GoogleApiWrapper({
  apiKey
})(MapContent);
