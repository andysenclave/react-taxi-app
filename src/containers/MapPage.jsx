import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../components/Map/map.jsx';
import { currentLocation } from '../constants/app.config';

class MapContainer extends Component {
  render() {
    const { cars } = this.props;
    const renderMap = cars.length > 0;
    return(
      <div>
        { renderMap ? (<Map cars={cars} showCurrentLocation={true} center={currentLocation}/>) : ''}        
      </div>
    );
  } 
}

const mapStateToProps = ({ taxi }) => ({
  cars: taxi.cars
});

export default connect(mapStateToProps, null)(MapContainer);
