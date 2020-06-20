import axios from 'axios';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import { SET_LOCATION ,SET_VALUE} from './plantsTypes';


async function askPermissionFromUser() {
    let location = { lat: 'undef', lon: 'undef' }
    const { status } = await Location.requestPermissionsAsync()
    if (status !== 'granted')
        return location

    location = await Location.getCurrentPositionAsync({})

    return location
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
                lat: 'simulator lat',
                lon: 'simulator lon'
            })
        })



}

export const testSecureStorage = () => (dispatch) => {
    SecureStore.setItemAsync('testStoreKey', 'hahaha')
    .then(() => {
        console.log('success to save!')
        dispatch({
            type: SET_VALUE,
            storedVal: 'hahaha'
        })
    })
    .catch((e) => console.log('failed to save! = ',e.message))

}