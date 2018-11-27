import React from 'react';
import PropTypes from 'prop-types';
import Map from '../Map/map.jsx';
import './modalMap.css';

const closeThisModal = (event, callParentClose) => {
  event.preventDefault();
  if(event.target.className === 'close-modal'){
    callParentClose(true);
  }
}

const ModalMapContainer = ({ carInfo, showModal, closeModal }) => {
  let mapHeight = `50vh`;
  let center = {
    lat: '',
    lng: ''
  };
  if(carInfo.length > 0){
    if(carInfo[0].coordinate) {
      center.lat = carInfo[0].coordinate.latitude;
      center.lng = carInfo[0].coordinate.longitude;
    }
    if(carInfo[0].coordinates) {
      center.lat = carInfo[0].coordinates[1];
      center.lng = carInfo[0].coordinates[0];
    }
  }
  // eslint-disable-next-line
  if(window.innerWidth <= 375) {
    mapHeight = `79vh`;
  }
  return (
    <div>
      {showModal ? 
        (<section className='modalContainer' onClick={event => closeThisModal(event, closeModal)}>
          <section className='modal'>
            <span className='close-modal' />
            <Map 
              cars={carInfo} 
              showCurrentLocation={false} 
              height={mapHeight}
              center={center}
            />
          </section>
        </section>) : ''
      }
    </div>
  );
};

ModalMapContainer.propTypes = {
  carInfo: PropTypes.array.isRequired,
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ModalMapContainer;
