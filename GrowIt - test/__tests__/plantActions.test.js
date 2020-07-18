import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const { initSystem, addToMyPlants, irrigatePlantAndUpdate, removeFromDevice, setPlantList } = require("../src/redux/actions/plantActions")
const { INIT_SYS, ADD_PLANT_TO_LIST, SET_MY_PLANTS_LIST, SET_PLANTS_LIST } = require("../src/redux/actions/plantsTypes")

/**
 * check array example
 * 
 * expect([{ a:'b'}, { c:'e'}]).toEqual(expect.arrayContaining([
            expect.objectContaining({a:'b'}),
            expect.objectContaining({c:'e'})
        ]));
 * 
 */

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// function getHumanDate() {
//     const date = new Date(Date.now());
//     return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
// }

// jest.mock('../../../node_modules/expo-location', () => {
//     return { coords: { latitude: '30', longitude: '30' } }
// })

// jest.mock('../../../node_modules/native-base', () => {
//     return { }
// })

describe("plant Action Test", function () {

    test('addToMyPlants', function () {
        expectedActions = [{
            type: ADD_PLANT_TO_LIST,
            plant: onePlant
        }]
        const store = mockStore({
            location: { lat: null, lon: null },
            plantsList: [],
            types: [],
            myPlants: [] // the init is to bring from memory the former plants
        })
        store.dispatch(addToMyPlants(onePlant))
        expect(store.getActions()).toEqual(expectedActions)
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()).toEqual(expect.arrayContaining([
            expect.objectContaining({ plant: onePlant })
        ]));
    })


    test('initSystem', async function () {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ dbresult: ["flowers", 'plants', 'fruits', 'vegetables'] })
            }))

        try {
            const myDis = jest.fn()
            await initSystem()(myDis)
            expect(myDis).toHaveBeenCalled();
            const expectedReturn = {
                type: INIT_SYS,
                lat: "30",
                lon: "30",
                types: ["flowers", 'plants', 'fruits', 'vegetables'],
                data: []
            };
            expect(myDis).toHaveBeenCalledWith(expectedReturn);
            expect(myDis).toHaveReturned()

        } catch (err) {
            console.log('err -> ', err)
        }
    })


    test('irrigatePlantAndUpdate', async function () {
        try {
            const myDis = jest.fn()
            await irrigatePlantAndUpdate(onePlant)(myDis)
            expect(myDis).toHaveBeenCalled();
            const expectedReturn = {
                type: SET_MY_PLANTS_LIST,
                updatedMyPlantsArray: [onePlant]
            };
            expect(myDis).toHaveBeenCalledWith(expectedReturn);
            expect(myDis.mock.calls[0][0].updatedMyPlantsArray[0]).toHaveProperty('notificationId')
            expect(myDis.mock.calls[0][0].updatedMyPlantsArray[0]).toHaveProperty('nextIrrigate')
            expect(myDis).toHaveReturned()
        } catch (err) {
            console.log('err -> ', err)
        }
    })

    test('removeFromDevice', async function () {
        try {
            const store = mockStore({
                location: { lat: null, lon: null },
                plantsList: [],
                types: [],
                myPlants: [onePlant]
            })
            const expectedReturn = {
                type: SET_MY_PLANTS_LIST,
                updatedMyPlantsArray: []
            };
            await store.dispatch(await removeFromDevice(onePlant))
            expect(store.getActions()).not.toContain(onePlant);
            expect(store.getActions()[0]).toEqual(expectedReturn);
        } catch (err) {
            console.log('err -> ', err)
        }
    })

    test('setPlantList', async function () {
        try {
            const myDis = jest.fn()
            await setPlantList([onePlant,onePlant2])(myDis)
            expect(myDis).toHaveBeenCalled();
            const expectedReturn = {
                type: SET_PLANTS_LIST,
                plantsList: [onePlant,onePlant2]
            };
            expect(myDis).toHaveBeenCalledWith(expectedReturn);
            expect(myDis).toHaveReturned()
        } catch (e) {
            console.log('e -> ', e.message)
        }
    })
})



const onePlant = {
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
const onePlant2 = {
    months: [7, 1, 8, 9, 2, 3, 4],
    _id: '5f0da4922f105dcdc186b8e2',
    name: 'Cucumberrrr ',
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
