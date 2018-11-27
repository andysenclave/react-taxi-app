/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import PropTypes from 'prop-types';
import { taxi, car, inactiveTaxi, inactiveCar } from '../../assets/icons';
import './card.css';

const getCarIcon = (provider, status) => {
  let carIcon = car;
  if (provider === 'mytaxi') {
    if(status.toLowerCase() === 'inactive') {
      carIcon = inactiveTaxi;
    } else {
      carIcon = taxi
    }
  } else if(status.toLowerCase() === 'inactive') {
    carIcon = inactiveCar;
  }
  return carIcon;
};

const getInfo = (type, vin, engineType) => {
  let info = [];
  if (type) { 
    info.push(<div key='type'><span>type</span>: <span>{type}</span></div>);
  }
  if (vin) { 
    info.push(<div key='vin'><span>vin</span>: <span>{vin}</span></div>);
  }
  if (engineType) { 
    info.push(<div key='engineType'><span>engine type</span>: <span>{engineType}</span></div>);
  }
  return info;
}

const getfuelClass = (fuel) => {
  let className = ``;
  if(fuel < 30) {
    className = `empty-fuel`;
  } else if(fuel >= 30 && fuel < 80) {
    className = `half-fuel`;
  } else {
    className = `full-fuel`;
  }
  return className;
}

const Card = props => {
  const { 
    provider,
    status,
    name,
    id,
    type,
    vin,
    engineType,
    fuel,
    state,
    interior,
    exterior,
    onClick 
  } = props;
  
  return (
    <section className={`card ${provider}`} onClick={() => onClick()}>
      <section className='image-container'>
        <img src={getCarIcon(provider, status)} alt="Car image"/>
      </section>
      <section className='info-container'>
        <h2 className='title'>{ name ? name : id }</h2>
        <h4 className='source'>{ 
          provider === 'car2go' ? 'Car2Go' : 'My Taxi'
        }</h4>
        <div className='more-info'>
          { getInfo(type, vin, engineType) }
        </div>
      </section>
      <section className='highlights-container'>
        { fuel ? (<div className={`${getfuelClass(fuel)} status`}>Fuel</div>) : ''}
        { state ? (
          <div className={`${state === 'ACTIVE' ? `good` : `bad`} status`}>State</div>
        ) : ''}
        { interior ? (
          <div className={`${interior === 'GOOD' ? `good` : `bad`} status`}>Interior</div>
        ) : ''}
        { exterior ? (
          <div className={`${exterior === 'GOOD' ? `good` : `bad`} status`}>Exterior</div>
        ) : ''}
      </section>
    </section>
  )
};

Card.propTypes = {
  onClick: PropTypes.func.isRequired,
  provider: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.number.isRequired,
  type: PropTypes.string,
  vin: PropTypes.string,
  engineType: PropTypes.string,
  fuel: PropTypes.number,
  state: PropTypes.string,
  interior: PropTypes.string,
  exterior: PropTypes.string,
};

export default Card;
