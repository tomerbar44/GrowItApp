import { combineReducers } from 'redux';
import plantsReducer from './redux/reducers/plantsReducer';

export default combineReducers({
  plants: plantsReducer
});
