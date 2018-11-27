import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import taxiReducer from './taxi';

export default history => combineReducers({
  router: connectRouter(history),
  taxi: taxiReducer,
});
