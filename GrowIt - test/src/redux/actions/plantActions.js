import * as Location from 'expo-location';
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
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
  try {
    const data = await AsyncStorage.getItem('myPlants').then((data) => JSON.parse(data));
    if (data !== null) return data;
    return [];
  } catch (e) {
    console.log('fetchMemo ERR ----> ', e);
    return [];
  }
}

export const initSystem = () => async (dispatch) => {
  const getTypesURL = `https://mobile-final-project-server.herokuapp.com/GrowIt/api/type`;

  // async function init() {

  try {
    const response = await fetch(getTypesURL).then((res) => res.json());
    const memoInit = await fetchMemo().catch(() => {
      return []
    });
    const coordinates = await askPermissionFromUser().catch(() => { // for AVD/testing
      return { coords: { latitude: '30', longitude: '30' } };
    });
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
  // }
  // init().then(() => {
  //   console.log('then beforeeeeee finaly return')
  //   return
  // });
};

export const addToMyPlants = (plant) => (dispatch) => {
  Object.assign(plant, { _id: String(plant._id + Date.now()), addedAt: getHumanDate() }); // to prevent same id when render MyPlants list
  dispatch({
    type: ADD_PLANT_TO_LIST,
    plant
  });
};

// export const irrigatePlantAndUpdate = (plant) => async (dispatch) => {
//   const timeToIrrigate = Date.now() / 1000 + Number(plant.waterAmount);
//   if (plant.notificationId !== undefined) {
//     const prevNotificationId = plant.notificationId;
//     cancelScheduledNotification(prevNotificationId);
//   }
//   setNotification(
//     'GrowItApp',
//     `Time to irrigate ${plant.name} !💦`,
//     plant.imgUrl,
//     Number(plant.waterAmount) * 1000
//   )
//     .then((notificationId) => {
//       // console.log('notificationId -> ',notificationId )
//       Object.assign(plant, { nextIrrigate: timeToIrrigate, notificationId });
//       // console.log('plant -> after Object Assign',plant)
//       // Toast.show({
//       //   text: `${plant.name} is glad you take care of it ! 💦🌲`,
//       //   textStyle: { fontFamily: 'Comfortaa_600SemiBold' },
//       //   buttonText: 'Okay',
//       //   buttonTextStyle: { fontFamily: 'Comfortaa_600SemiBold', color: 'blue' },
//       //   type: 'success',
//       //   duration: 2500
//       // });
//       console.log('after Toast.show ~~~~ ')
//       fetchMemo().then((data) => {
//         data = data.filter((item) => item._id !== plant._id);
//         data = [...data, plant];
//         console.log('data!!!! ', data)
//         dispatch({
//           type: SET_MY_PLANTS_LIST,
//           updatedMyPlantsArray: data
//         });
//       });
//     })
//     .catch((e) => console.log('error =>', e));

// };

// for testing
const myToast = (textMessage) => {
  try {
    Toast.show({
      text: textMessage,
      textStyle: { fontFamily: 'Comfortaa_600SemiBold' },
      buttonText: 'Okay',
      buttonTextStyle: { fontFamily: 'Comfortaa_600SemiBold', color: 'blue' },
      type: 'success',
      duration: 2500
    })

  } catch (e) {
    return e.message
  }
}
export const irrigatePlantAndUpdate = (plant) => async (dispatch) => {
  const timeToIrrigate = Date.now() / 1000 + Number(plant.waterAmount);
  if (plant.notificationId !== undefined) {
    const prevNotificationId = plant.notificationId;
    cancelScheduledNotification(prevNotificationId);
  }
  try {

    notificationId = await setNotification('GrowItApp', `Time to irrigate ${plant.name} !💦`, plant.imgUrl, Number(plant.waterAmount) * 1000)
    Object.assign(plant, { nextIrrigate: timeToIrrigate, notificationId });
    myToast(`${plant.name} is glad you take care of it ! 💦🌲`)
    let data = await fetchMemo()
    data = data.filter((item) => item._id !== plant._id);
    data = [...data, plant];
    dispatch({
      type: SET_MY_PLANTS_LIST,
      updatedMyPlantsArray: data
    });
  } catch (e) {
    console.log('irrigatePlantAndUpdate error ->', e)
  }
};


export const removeFromDevice = (plant) => async (dispatch) => {
  if (plant.notificationId !== undefined) {
    cancelScheduledNotification(plant.notificationId);
    console.log('plant.notificationId removed! ->', plant.notificationId);
  }
  try {
    myToast(`${plant.name} remove 🙁`)
    let data = await fetchMemo()
    data = data.filter((item) => item._id !== plant._id);
    dispatch({
      type: SET_MY_PLANTS_LIST,
      updatedMyPlantsArray: data
    });
  } catch (e) {
    console.log('failed to remove! = ', e.message)
  }
};

export const setPlantList = (dbResult) => (dispatch) => {
  dispatch({
    type: SET_PLANTS_LIST,
    plantsList: dbResult
  });
};
