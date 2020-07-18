import React from 'react';
import { render } from '@testing-library/react-native';
import PlantPage from '../src/components/PlantPage/PlantPage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('PlantPage component Test', function () {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  test('render plant page component snapshot ', function () {
    store = mockStore(initialState);
    const { baseElement } = render(
      <Provider store={store}>
        <PlantPage route={{ params: { plantObj: onePlant, buttonFlag: true } }} />
      </Provider>
    );
    expect(baseElement).toMatchSnapshot();
  });

  test('render plant page component without start grow button snapshot', function () {
    store = mockStore(initialState);
    const { baseElement } = render(
      <Provider store={store}>
        <PlantPage route={{ params: { plantObj: onePlant, buttonFlag: false } }} />
      </Provider>
    );
    expect(baseElement).toMatchSnapshot();
  });
});

const onePlant = {
  months: [7, 1, 8, 9, 2, 3, 4],
  _id: '5f0da4922f105dcd2e8b681c',
  name: 'Cucumber',
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
};
