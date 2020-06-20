import { PLANTS_LOADED, PLANTS_LOADING, SET_LOCATION, SET_VALUE } from '../actions/plantsTypes';
const initialState = {
  location: { lat: null, lon: null },
  plantsList: ['TESTING'],
  recentSearches: [],
  isLoading: false,
  storedVal: 'default value'
};

export default (state = initialState, action) => {
  // console.log('action REDUCER!', action.type)
  switch (action.type) {
    case PLANTS_LOADED:
      return {
        ...state,
        plantsList: action.plantsList,
        recentSearches: state.recentSearches.concat(action.search),
        isLoading: false
      };
    case PLANTS_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case SET_LOCATION:
      console.log('action = ', action)
      return {
        ...state,
        location: {
          lat: action.lat,
          lon: action.lon
        }
      }

      case SET_VALUE:
        return{
          ...state,
          storedVal: action.storedVal
        }

    default:
      return state;
  }
};
