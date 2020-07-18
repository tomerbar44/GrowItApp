import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { render } from '@testing-library/react-native'
import MainScreen from '../src/components/MainScreen/MainScreen'
import { Provider } from 'react-redux'
const { initSystem } = require("../src/redux/actions/plantActions")

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));
const initialState = {
    plantsReducer: {
        location: {
            lat: 30, lon: 30
        },
        plantsList: [],
        types: []

    }
}
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore(initialState);
describe('MainScreen component Test', function () {
    beforeEach(() => { 
        store.clearActions();
    });
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ dbresult: ["flowers", 'plants', 'fruits', 'vegetables'] })
        }))
    test('render main screen component snapshot ', async function () {
        const data = await store.dispatch(initSystem())
        const { baseElement } = render(<Provider store={store}><MainScreen /></Provider>)
        expect(baseElement).toMatchSnapshot()
    });

});
