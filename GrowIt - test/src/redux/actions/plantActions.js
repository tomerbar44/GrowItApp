import axios from 'axios';
import * as Location from 'expo-location';
// import * as SecureStore from 'expo-secure-store';
import { AsyncStorage } from 'react-native';

import { SET_LOCATION, SET_VALUE, PLANTS_TYPE_LOADED, SET_PLANTS_LIST, PLANTS_LOADING, PLANTS_LOADED, ADD_PLANT_TO_LIST } from './plantsTypes';


async function askPermissionFromUser() {
    let location = { lat: 'undef', lon: 'undef' }
    const { status } = await Location.requestPermissionsAsync()
    if (status !== 'granted')
        return location

    location = await Location.getCurrentPositionAsync({})

    return location
}

// async function saveToMemory(plantToAdd) {
//     try {
//         await AsyncStorage.setItem('myPlants', plantToAdd)
//         console.log('saved on memory!@!')

//     } catch (error) {
//         console.log(error.message)
//     }
// }

// async function addNewPlantToMemory(plantToAdd) {
//     try {
//         const plants = await AsyncStorage.getItem('myPlants').then(data => JSON.parse(data))
//         console.log('plants === ', plants)
//         if (plants == null) {
//             saveToMemory(JSON.stringify(plantToAdd))
//         } else {
//             console.log('plants more then one =>',plants)
//             let allPlants = [...plants, plantToAdd]
//             saveToMemory(JSON.stringify(allPlants))
//         }

//     } catch (error) {
//         console.log(error.message)
//     }
// }

export const setLocationAction = () => (dispatch) => {
    askPermissionFromUser()
        .then((coordinates) => {
            // console.log(coordinates.coords)
            dispatch({
                type: SET_LOCATION,
                lat: coordinates.coords.latitude,
                lon: coordinates.coords.longitude
            })
        })
        .catch((e) => {
            console.log('e!!')
            dispatch({
                type: SET_LOCATION,
                lat: '30',
                lon: '30'
            })
        })
}

export const getGrowItTypes = () => (dispatch) => {

    const url = `https://mobile-final-project-server.herokuapp.com/GrowIt/api/type`;
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            // console.log('api json = ', json)
            dispatch({
                type: PLANTS_TYPE_LOADED,
                types: json.dbresult
            });
        })
        .catch((error) => {
            console.error(error);
        });



}


export const testSecureStorage = () => (dispatch) => {
    AsyncStorage.setItem('testStoreKey', 'hahaha')
        .then(() => {
            console.log('success to save!')
            dispatch({
                type: SET_VALUE,
                storedVal: 'hahaha'
            })
        })
        .catch((e) => console.log('failed to save! = ', e.message))

}

export const setPlantList = (dbResult) => (dispatch) => {
    dispatch({
        type: SET_PLANTS_LIST,
        plantsList: dbResult
    })

}

export const plantsLoading = () => (dispatch) => {
    console.log('inside plantsLoading!')
    dispatch({
        type: PLANTS_LOADING
    })
}

export const plantsLoaded = () => (dispatch) => {
    console.log('inside plantsLoaded!')
    dispatch({
        type: PLANTS_LOADED
    })
}




export const addToMyPlants = (plant) => (dispatch) => {
    console.log('insideAddToMyPlan!')
    // addNewPlantToMemory(plant)
    console.log('be4 dispatch on addToMyPlants')
    dispatch({
        type: ADD_PLANT_TO_LIST,
        plant: plant 
    })

    // dispatch({
    //     type: ADD_TO_MY_GROWS,
    //     plantToAdd: plantToAdd
    // })
}





// askPermissionFromUser()
//     .then((coordinates) => {
//         // console.log(coordinates.coords)
//         dispatch({
//             type: SET_LOCATION,
//             lat: coordinates.coords.latitude,
//             lon: coordinates.coords.longitude
//         })
//     })
//     .catch((e) => {
//         console.log('e!!')
//         dispatch({
//             type: SET_LOCATION,
//             lat: 'simulator lat',
//             lon: 'simulator lon'
//         })
//     })