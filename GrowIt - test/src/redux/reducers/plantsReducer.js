import {
  SET_PLANTS_LIST,
  SET_MY_PLANTS_LIST,
  ADD_PLANT_TO_LIST,
  INIT_SYS
} from '../actions/plantsTypes';
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

async function saveToMemory(plantToAdd) {
  try {
    await AsyncStorage.setItem('myPlants', JSON.stringify(plantToAdd));
  } catch (error) {
    console.log(error.message);
  }
}

const initialState = {
  location: { lat: null, lon: null },
  plantsList: [],
  types: [],
  myPlants: [] // the init is to bring from memory the former plants
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANTS_LIST:
      return {
        ...state,
        plantsList: action.plantsList
      };

    case ADD_PLANT_TO_LIST:
      if (action.key !== 'testKey') saveToMemory([...state.myPlants, action.plant]);
      return {
        ...state,
        myPlants: [...state.myPlants, action.plant]
      };

    case SET_MY_PLANTS_LIST:
      if (action.key !== 'testKey') saveToMemory(action.updatedMyPlantsArray);
      return {
        ...state,
        myPlants: action.updatedMyPlantsArray
      };

    case INIT_SYS:
      return {
        ...state,
        location: {
          lat: action.lat,
          lon: action.lon
        },
        types: action.types,
        myPlants: action.data
      };
    default:
      return state;
  }
};
