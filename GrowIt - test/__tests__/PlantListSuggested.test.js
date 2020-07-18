import React, { useState as useStateMock } from 'react';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { render } from '@testing-library/react-native';
import PlantListSuggested from '../src/components/PlantsListSuggested/PlantListSuggested';
import { Provider } from 'react-redux';
const { setPlantList } = require('../src/redux/actions/plantActions');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}));
const initialState = {
  plantsReducer: {
    location: {
      lat: 30,
      lon: 30
    },
    plantsList: PlantsListMock
  }
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore(initialState);
describe('PlantListSuggested component Test', function () {
  const setIsLoading = jest.fn();
  beforeEach(() => {
    store.clearActions();
    useStateMock.mockImplementation((isLoading) => [isLoading, setIsLoading]);
  });
  test('render plant list suggested component snapshot ', async function () {
    mock
      .onGet(`https://mobile-final-project-server.herokuapp.com/GrowIt/api/plants/30/30`)
      .reply(200, {
        data: PlantsResponseMock.data.dbresult
      });
    const data = await store.dispatch(setPlantList(PlantsResponseMock.data.dbresult));
    const { baseElement } = render(
      <Provider store={store}>
        <PlantListSuggested route={{ params: { buttonType: 'plants' } }} />
      </Provider>
    );
    expect(baseElement).toMatchSnapshot();
  });
});

const PlantsResponseMock = {
  data: {
    dbresult: [
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
    ]
  }
};

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
