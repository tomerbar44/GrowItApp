import axios from 'axios';
import * as Location from 'expo-location';
import { AsyncStorage } from 'react-native';

import { SET_LOCATION, SET_VALUE, PLANTS_TYPE_LOADED, SET_PLANTS_LIST, PLANTS_LOADING, PLANTS_LOADED, ADD_PLANT_TO_LIST, GET_PLANTS_FROM_MEMO } from './plantsTypes';


function getHumanDate() {
    const date = new Date(Date.now())
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() 
    
}

async function askPermissionFromUser() {
    let location = { lat: 'undef', lon: 'undef' }
    const { status } = await Location.requestPermissionsAsync()
    if (status !== 'granted')
        return location

    location = await Location.getCurrentPositionAsync({})

    return location
}




async function fetchMemo() {

    console.log('inside bringDataFromMemory!')
    try {
        const data = await AsyncStorage.getItem('myPlants').then(data => JSON.parse(data))
        // console.log(JSON.parse(data))
        if (data !== null)
            return data

        return []
    }
    catch (e) {
        console.log(e.message)
    }
}


export const addToMyPlants = (plant) => (dispatch) => {
    // Object.assign(plant, { _id: String(nextId()),  }) // to prevent same id when render MyPlants list 
    Object.assign(plant, { _id: String(plant._id + Date.now()), addedAt: getHumanDate() }) // to prevent same id when render MyPlants list 
  
    dispatch({
        type: ADD_PLANT_TO_LIST,
        plant: plant
    })
}

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


export const saveOnDevice = () => (dispatch) => {
    AsyncStorage.setItem('testStoreKey', 'hahaha')
        .then(() => {
            // console.log('success to save!')
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
    // console.log('inside plantsLoading!')
    dispatch({
        type: PLANTS_LOADING
    })
}

export const plantsLoaded = () => (dispatch) => {
    // console.log('inside plantsLoaded!')
    dispatch({
        type: PLANTS_LOADED
    })
}


export const getPlantsFromMemory = () => (dispatch) => {
    fetchMemo().then(data => {
        dispatch({
            type: GET_PLANTS_FROM_MEMO,
            data: data
        })
    })

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