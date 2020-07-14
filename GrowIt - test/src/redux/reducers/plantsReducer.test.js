/* jest env jest */

// we can add npm test -- --watch to run test all the time
// const { testEnvironment } = require("jest-expo/jest-preset")
import {
  SET_PLANTS_LIST,
  SET_MY_PLANTS_LIST,
  ADD_PLANT_TO_LIST,
  INIT_SYS
} from '../actions/plantsTypes';
import { AsyncStorage } from 'react-native';
import plantsReducer from './plantsReducer';

describe('plantsReducer Test', function () {
  test('has init state', function () {
    // expect(1).toBe(1)
    const state = plantsReducer(undefined, {});
    expect(state).toHaveProperty('myPlants', []);
  });

  test('add plant to PlantsList ', function () {
    const state = plantsReducer(undefined, {
      type: SET_PLANTS_LIST,
      plantsList: PlantsListMock
    })

    expect(state.plantsList).toHaveLength(2)
  })

  test('add plant to PlantsList ', function () {
    const state = plantsReducer({
      location: { lat: null, lon: null },
      plantsList: [],
      types: [],
      myPlants: PlantsListMock // the init is to bring from memory the former plants
    }, 
    {
      type: ADD_PLANT_TO_LIST,
      myPlants: onePlant
    })

    AsyncStorage.clear()
    expect(state.myPlants).toHaveLength(3)
  })


});


const PlantsListMock = [
  {
    "months": [7, 1, 8, 9, 2, 3, 4], "_id": "5f0da3112f105dcd2e8b681b", "name": "Onion", "family": "Liliaceae", "description": "The onion is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, scallion, shallot, leek, chive, and Chinese onion. ", "type": "vegetables", "waterAmount": "43200", "imgUrl": "https://flevotrade.nl/wp-content/uploads/2019/11/flevotrade_onions_product.jpg", "howToITreat": "Keep soil moist, water well but avoid spilling water and flooding the plant. Place the seedling near a window exposed to direct sunlight.", "recommendedTemp": 30, "recommendedHumidity": 30, "recommendedClouds": 10
  },
  {
    "months": [7, 1, 8, 9, 2, 3, 4], "_id": "5f0da4922f105dcd2e8b681c", "name": "Cucumber ", "family": "Cucurbitaceae", "description": `Its elongated fruit is juicy and very rich in water. Its 
green color is eaten raw, pickled in salt or pickled.The plant originated in India, where humans began growing it about 3, 000 years ago.Today, cucumber is a very common vegetable, and it is grown in greenhouses or open fields.`, "type": "vegetables", "waterAmount": "259200", "imgUrl": "https://img.wcdn.co.il/f_auto,w_1200,t_54/1/4/9/8/1498895-46.jpg", "howToITreat": "Water the cucumbers until the soil is thoroughly absorbed and maintain this moisture at all times.", "recommendedTemp": 25, "recommendedHumidity": 25, "recommendedClouds": 15
  }]

const onePlant = {
  "months": [7, 1, 8, 9, 2, 3, 4], "_id": "5f0da3112f105dcd2e8b681b", "name": "Onion", "family": "Liliaceae", "description": "The onion is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, scallion, shallot, leek, chive, and Chinese onion. ", "type": "vegetables", "waterAmount": "43200", "imgUrl": "https://flevotrade.nl/wp-content/uploads/2019/11/flevotrade_onions_product.jpg", "howToITreat": "Keep soil moist, water well but avoid spilling water and flooding the plant. Place the seedling near a window exposed to direct sunlight.", "recommendedTemp": 30, "recommendedHumidity": 30, "recommendedClouds": 10
}  