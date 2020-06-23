import { PLANTS_LOADED, PLANTS_LOADING, SET_LOCATION, SET_VALUE, PLANTS_TYPE_LOADED, SET_PLANTS_LIST, ADD_PLANT_TO_LIST } from '../actions/plantsTypes';
import * as SecureStore from 'expo-secure-store';

const bringDataFromMemory = async () => {
  console.log('inside bringDataFromMemory!')
  try{
    const data = await SecureStore.getItemAsync('myPlants')
    return data
  }
  catch(e) {
    console.log(e.message)
  }
     

  console.log('END inside bringDataFromMemory!')
}



const initialState = {
  location: { lat: null, lon: null },
  plantsList: [],
  types: [],
  isLoading: false,
  storedVal: 'default value',
  myPlants:[...bringDataFromMemory()] // the init is to bring from memory the former plants 
};

export default (state = initialState, action) => {
  // console.log('action REDUCER!', action.type)
  switch (action.type) {
    case PLANTS_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case PLANTS_TYPE_LOADED:
      return {
        ...state,
        types: action.types,
        isLoading: false
      }; 


    case SET_LOCATION:
      // console.log('action = ', action)
      return {
        ...state,
        location: {
          lat: action.lat,
          lon: action.lon
        }
      };

    case SET_VALUE:
      return {
        ...state,
        storedVal: action.storedVal
      }

    case SET_PLANTS_LIST:
      console.log('action.plantsList = ', action.plantsList)
      return {
        ...state,
        plantsList: action.plantsList,
        isLoading: false
      }

      case ADD_PLANT_TO_LIST:
        let p = [...state.myPlants,action.plant]
        console.log('p ====>', p)
        return {
          ...state,
          myPlants: [...state.myPlants,action.plant]
        }

    default:
      return state;
  }
};
