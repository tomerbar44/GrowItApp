import { PLANTS_LOADED, PLANTS_LOADING, SET_LOCATION, SET_VALUE, PLANTS_TYPE_LOADED, SET_PLANTS_LIST, ADD_PLANT_TO_LIST, GET_PLANTS_FROM_MEMO } from '../actions/plantsTypes';
import { AsyncStorage } from 'react-native';




async function saveToMemory(plantToAdd) {
  try {
    await AsyncStorage.setItem('myPlants', JSON.stringify(plantToAdd))
    console.log('saved on memory!@!')

  } catch (error) {
    console.log(error.message)
  }
}

// async function addNewPlantToMemory(plantToAdd) {
//   try {
//       const plants = await AsyncStorage.getItem('myPlants').then(data => JSON.parse(data))
//       console.log('plants === ', plants)
//       if (plants == null) {
//           saveToMemory(JSON.stringify(plantToAdd))
//       } else {
//           console.log('plants more then one =>',plants)
//           let allPlants = [...plants, plantToAdd]
//           saveToMemory(JSON.stringify(allPlants))
//       }

//   } catch (error) {
//       console.log(error.message)
//   }
// }




// TODO - myPlants will get his state from Action that loads his state at main screen
const initialState = {
  location: { lat: null, lon: null },
  plantsList: [],
  types: [],
  isLoading: false,
  storedVal: 'default value',
  myPlants: [] // the init is to bring from memory the former plants 
};

export default (state = initialState, action) => {
  // console.log('bringDataFromMemory() -> ', bringDataFromMemory())

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
      // console.log('action.plantsList = ', action.plantsList)
      return {
        ...state,
        plantsList: action.plantsList,
        isLoading: false
      }

    case ADD_PLANT_TO_LIST:
      let updatedMyPlantsArray = [...state.myPlants, action.plant]
      saveToMemory(updatedMyPlantsArray)
      return {
        ...state,
        myPlants: updatedMyPlantsArray
      }

      case GET_PLANTS_FROM_MEMO:
        return {
          ...state,
          myPlants: action.data
        }

    default:
      return state;
  }
};
