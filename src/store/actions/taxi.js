import axios from 'axios';
import {
  FETCH_TAXI_STARTED,
  FETCH_TAXI_SUCCESS,
  FILTER_TAXIS,
  FETCH_TAXI_FAILED,
} from '../actionTypes';
import {
  baseUri, car2goUri, mytaxiUri, corsConfig,
} from '../../constants/app.config';

const categorizeTaxis = (response, provider) => {
  response.map((taxi) => {
    const categorizedTaxi = taxi;
    categorizedTaxi.provider = provider;
    if (!taxi.state) {
      if (taxi.interior === 'UNACCEPTABLE' && taxi.exterior === 'UNACCEPTABLE') {
        categorizedTaxi.status = 'INACTIVE';
      } else {
        categorizedTaxi.status = 'ACTIVE';
      }
    } else {
      categorizedTaxi.status = taxi.state;
    }
    return categorizedTaxi;
  });
  return response;
};

export const fetchTaxiData = () => async (dispatch) => {
  dispatch({ type: FETCH_TAXI_STARTED });
  const car2goApi = `${baseUri}${car2goUri}`;
  const mytaxiApi = `${baseUri}${mytaxiUri}`;
  try {
    let car2goResponse = await axios.get(car2goApi, corsConfig);
    car2goResponse = categorizeTaxis(car2goResponse.data.placemarks, 'car2go');
    let myTaxiResponse = await axios.get(mytaxiApi, corsConfig);
    myTaxiResponse = categorizeTaxis(myTaxiResponse.data.poiList, 'mytaxi');
    const response = [...car2goResponse, ...myTaxiResponse];
    dispatch({
      type: FETCH_TAXI_SUCCESS,
      payload: {
        response,
        cars: response,
      },
    });
  } catch (error) {
    dispatch({ type: FETCH_TAXI_FAILED });
  }
};

export const filterData = filter => (dispatch, getState) => {
  const { response, filterBy } = getState().taxi;
  let { provider, status } = filter;
  let filteredCars = response;
  provider = provider || filterBy.provider;
  status = status || filterBy.status;
  const updatedFilterBy = {
    provider, status,
  };
  if (provider.toLowerCase() !== 'all') {
    filteredCars = filteredCars.filter(
      car => car.provider.toLowerCase() === provider.toLowerCase(),
    );
  }
  if (status.toLowerCase() !== 'all') {
    filteredCars = filteredCars.filter(car => car.status.toLowerCase() === status.toLowerCase());
  }
  dispatch({
    type: FILTER_TAXIS,
    cars: filteredCars,
    filterBy: updatedFilterBy,
  });
};
