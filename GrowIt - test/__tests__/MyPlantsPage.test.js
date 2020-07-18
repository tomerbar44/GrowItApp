/**
 * @jest-environment jsdom
 */

import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { render } from '@testing-library/react-native'
import MyPlantsPage from '../src/components/MyPlantsPage/MyPlantsPage'
import { Provider } from 'react-redux'
import { act } from "react-dom/test-utils";



const initialState = {
    plantsReducer: {
        location: {
            lat: 30, lon: 30
        },
        plantsList: [],
        types: [],
        myPlants:PlantsListMock

    }
}
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore(initialState);
describe('MyPlantsPage component Test', function () {
    beforeEach(() => { 
        store.clearActions();
    });
    let temp;
    test('render my plants page component snapshot ', async function () {
        await act( () => {
            const { baseElement } = render(<Provider store={store}><MyPlantsPage /></Provider>)
            temp = baseElement
          });

          expect(temp).toMatchSnapshot()
        
       
        
    });
    

});
const PlantsListMock = [
    {
      months: [7, 1, 8, 9, 2, 3, 4],
      _id: '5f0da3112f105dcd2e8b681b',
      name: 'Onion',
      family: 'Liliaceae',
      description:
        'The onion is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, scallion, shallot, leek, chive, and Chinese onion. ',
      type: 'vegetables',
      waterAmount: '43200',
      imgUrl: 'https://flevotrade.nl/wp-content/uploads/2019/11/flevotrade_onions_product.jpg',
      howToITreat:
        'Keep soil moist, water well but avoid spilling water and flooding the plant. Place the seedling near a window exposed to direct sunlight.',
      recommendedTemp: 30,
      recommendedHumidity: 30,
      recommendedClouds: 10
    },
    {
      months: [7, 1, 8, 9, 2, 3, 4],
      _id: '5f0da4922f105dcd2e8b681c',
      name: 'Cucumber ',
      family: 'Cucurbitaceae',
      description: `Its elongated fruit is juicy and very rich in water. Its green color is eaten raw, pickled in salt or pickled.The plant originated in India, where humans began growing it about 3, 000 years ago.Today, cucumber is a very common vegetable, and it is grown in greenhouses or open fields.`,
      type: 'vegetables',
      waterAmount: '259200',
      imgUrl: 'https://img.wcdn.co.il/f_auto,w_1200,t_54/1/4/9/8/1498895-46.jpg',
      howToITreat:
        'Water the cucumbers until the soil is thoroughly absorbed and maintain this moisture at all times.',
      recommendedTemp: 25,
      recommendedHumidity: 25,
      recommendedClouds: 15
    }
  ];