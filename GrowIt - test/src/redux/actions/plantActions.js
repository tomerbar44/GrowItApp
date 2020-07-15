import * as Location from 'expo-location';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base';
import { setNotification, cancelScheduledNotification } from '../../localNotification';
import { INIT_SYS, SET_PLANTS_LIST, ADD_PLANT_TO_LIST, SET_MY_PLANTS_LIST } from './plantsTypes';

function getHumanDate() {
  const date = new Date(Date.now());
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

async function askPermissionFromUser() {
  let location = { lat: 'undef', lon: 'undef' };
  const { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') return location;

  location = await Location.getCurrentPositionAsync({});

  return location;
}

async function fetchMemo() {
  console.log('inside bringDataFromMemory!');
  try {
    const data = await AsyncStorage.getItem('myPlants').then((data) => JSON.parse(data));
    // console.log(JSON.parse(data))
    if (data !== null) return data;

    return [];
  } catch (e) {
    console.log(e.message);
  }
}

export const initSystem = () => (dispatch) => {
  const getTypesURL = `https://mobile-final-project-server.herokuapp.com/GrowIt/api/type`;
  async function init() {
    try {
      const response = await fetch(getTypesURL).then((res) => res.json());
      const memoInit = await fetchMemo();
      const coordinates = await askPermissionFromUser().catch(() => { // on AVD 
        return { coords: { latitude: '30', longitude: '30' } };
      });

      console.log('coordinates =>>', coordinates);
      dispatch({
        type: INIT_SYS,
        lat: coordinates.coords.latitude,
        lon: coordinates.coords.longitude,
        types: response.dbresult,
        data: memoInit
      });
    } catch (e) {
      console.log('e ->', e);
      dispatch({
        type: INIT_SYS,
        lat: '30',
        lon: '30',
        types: [],
        data: []
      });
    }
  }
  init().then(() => {
    return;
  });
};

export const addToMyPlants = (plant) => (dispatch) => {
  Object.assign(plant, { _id: String(plant._id + Date.now()), addedAt: getHumanDate() }); // to prevent same id when render MyPlants list
  dispatch({
    type: ADD_PLANT_TO_LIST,
    plant
  });
};

export const irrigatePlantAndUpdate = (plant) => (dispatch) => {
  const timeToIrrigate = Date.now() / 1000 + Number(plant.waterAmount);
  if (plant.notificationId !== undefined) {
    const prevNotificationId = plant.notificationId;
    cancelScheduledNotification(prevNotificationId);
  }
  setNotification(
    'GrowItApp',
    `Time to irrigate ${plant.name} !💦`,
    plant.imgUrl,
    Number(plant.waterAmount) * 1000
  )
    .then((notificationId) => {
      Object.assign(plant, { nextIrrigate: timeToIrrigate, notificationId });
      Toast.show({
        text: `${plant.name} is glad you take care of it ! 💦🌲`,
        textStyle: { fontFamily: 'Comfortaa_600SemiBold' },
        buttonText: 'Okay',
        buttonTextStyle: { fontFamily: 'Comfortaa_600SemiBold', color: 'blue' },
        type: 'success',
        duration: 2500
      });
      fetchMemo().then((data) => {
        data = data.filter((item) => item._id !== plant._id);
        data = [...data, plant];
        dispatch({
          type: SET_MY_PLANTS_LIST,
          updatedMyPlantsArray: data
        });
      });
    })
    .catch((e) => console.log('error =>', e));

};

// https://www.youtube.com/watch?v=ZFsfn_6QIiY&list=PLAL9z42fi5AgeI5moPb5QB68u0wbWwX7V&index=9&t=1688s 46:20 to delete test
export const removeFromDevice = (plant) => (dispatch) => {
  if (plant.notificationId !== undefined) {
    cancelScheduledNotification(plant.notificationId);
    console.log('plant.notificationId removed! ->', plant.notificationId);
  }
  Toast.show({
    text: `${plant.name} remove 🙁`,
    textStyle: { fontFamily: 'Comfortaa_600SemiBold' },
    buttonText: 'Okay',
    buttonTextStyle: { fontFamily: 'Comfortaa_600SemiBold', color: 'blue' },
    type: 'success',
    duration: 2500
  });
  fetchMemo()
    .then((data) => {
      data = data.filter((item) => item._id !== plant._id);
      dispatch({
        type: SET_MY_PLANTS_LIST,
        updatedMyPlantsArray: data
      });
    })
    .catch((e) => console.log('failed to remove! = ', e.message));
};

export const setPlantList = (dbResult) => (dispatch) => {
  dispatch({
    type: SET_PLANTS_LIST,
    plantsList: dbResult
  });
};
