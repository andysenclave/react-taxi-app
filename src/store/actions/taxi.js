import {
  FETCH_TAXI_STARTED,
  FETCH_TAXI_SUCCESS,
  FILTER_TAXIS
} from '../actionTypes';
import { baseUri, car2goUri, mytaxiUri, corsConfig } from '../../constants/app.config';
import axios from 'axios';

const categorizeTaxis = (response, provider) => {
  response.map(taxi => {
    taxi.provider = provider;
    if(!taxi.state) {
      if(taxi.interior === 'UNACCEPTABLE' && taxi.exterior === 'UNACCEPTABLE') {
        taxi.status = 'INACTIVE';
      } else {
        taxi.status = 'ACTIVE';
      }
    } else {
      taxi.status = taxi.state;
    }
    return taxi;
  });
  return response;
};

export const fetchTaxiData = () => {
  return async dispatch => {
    dispatch({ type: FETCH_TAXI_STARTED });
    const car2goApi = `${baseUri}${car2goUri}`;
    const mytaxiApi = `${baseUri}${mytaxiUri}`;

    let car2goResponse = await axios.get(car2goApi, corsConfig);
    car2goResponse = categorizeTaxis(car2goResponse.data.placemarks, 'car2go');
    let myTaxiResponse = await axios.get(mytaxiApi, corsConfig);
    myTaxiResponse = categorizeTaxis(myTaxiResponse.data.poiList, 'mytaxi');
    
    const response = [...car2goResponse, ...myTaxiResponse];
    dispatch({ 
      type: FETCH_TAXI_SUCCESS,
      payload: {
        response: response,
        cars: response
      }
     });
  }
};

export const filterData = (filter) => {
  return (dispatch, getState) => {
    const { response, filterBy } = getState().taxi;
    let { provider, status } = filter;
    let filteredCars = response;
    provider = provider ? provider : filterBy.provider;
    status = status ? status : filterBy.status;
    let updatedFilterBy = {
      provider, status
    };
    if(provider.toLowerCase() !== 'all') {
      filteredCars = filteredCars.filter(car => car.provider.toLowerCase() === provider.toLowerCase());
    }
    if(status.toLowerCase() !== 'all') {
      filteredCars = filteredCars.filter(car => car.status.toLowerCase() === status.toLowerCase());
    }
    dispatch({
      type: FILTER_TAXIS,
      cars: filteredCars,
      filterBy: updatedFilterBy
    });
  }
};
