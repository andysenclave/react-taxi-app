import {
  FETCH_TAXI_STARTED,
  FETCH_TAXI_SUCCESS,
  FILTER_TAXIS
} from '../actionTypes';

const initialState = {
  fetchStarted: false,
  fetchPending: false,
  fetchSuccess: false,
  response: [],
  cars: [],
  filterBy: {
    provider: 'all',
    status: 'all'
  }
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_TAXI_STARTED: {
      return {
        ...state,
        fetchStarted: true,
        fetchPending: true
      };
    }
    case FETCH_TAXI_SUCCESS: {
      return {
        ...state,
        fetchPending: false,
        fetchSuccess: true,
        response: action.payload.response,
        cars: action.payload.cars
      }
    }
    case FILTER_TAXIS: {
      return {
        ...state,
        cars: action.cars,
        filterBy: action.filterBy
      }
    }
    default: {
      return state;
    }
  }
}
