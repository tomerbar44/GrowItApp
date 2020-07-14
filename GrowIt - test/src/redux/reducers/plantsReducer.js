import {
  SET_PLANTS_LIST,
  SET_MY_PLANTS_LIST,
  ADD_PLANT_TO_LIST,
  INIT_SYS
} from '../actions/plantsTypes';
import { AsyncStorage } from 'react-native';

async function saveToMemory(plantToAdd) {
  try {
    await AsyncStorage.setItem('myPlants', JSON.stringify(plantToAdd));
    console.log('saved on memory!@!');
  } catch (error) {
    console.log(error.message);
  }
}

const initialState = {
  location: { lat: null, lon: null },
  plantsList: [],
  types: [],
  storedVal: 'default value',
  myPlants: [] // the init is to bring from memory the former plants
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANTS_LIST:
      return {
        ...state,
        plantsList: action.plantsList,
        isLoading: false
      };

    case ADD_PLANT_TO_LIST:
      // const updatedMyPlantsArray = [...state.myPlants, action.plant];
      saveToMemory([...state.myPlants, action.plant]);
      return {
        ...state,
        myPlants: [...state.myPlants, action.plant]
      };

    case SET_MY_PLANTS_LIST:
      saveToMemory(action.updatedMyPlantsArray);
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
        isLoading: false,
        myPlants: action.data
      };
    default:
      return state;
  }
};
