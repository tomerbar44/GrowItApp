import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLocationAction, testSecureStorage } from '../redux/actions/plantActions'
import * as SecureStore from 'expo-secure-store';


import { bool, object, array, func } from 'prop-types';
import styles from '../style/style';
import { useSelector } from 'react-redux';

const GrowItApp = ({ navigation }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setLocationAction())
    SecureStore.getItemAsync('testStoreKey')
      .then((value) => {

      }).catch((error) => {

      })
  }, [])

  const plantsList = useSelector((state) => state.plantsReducer.plantsList);
  const location = useSelector((state) => state.plantsReducer.location);
  const storedVal = useSelector((state) => state.plantsReducer.storedVal)


  return (
    <View style={styles.container}>

      <View style={styles.slogenContainer}>
        <Text style={styles.message}> Hey, we are GrowIt ! 😀</Text>
        {/* <Text> {plantsList[0]} </Text> */}

        {/* <Text> {location.lat} </Text>
        <Text> {location.lon} </Text> */}
        <Text>  {storedVal} </Text>

      </View>

      <View style={styles.typeIconContainer}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('PlantListSuggested', {
            //   buttonType: "flowers"
            // })

            //! testing secure storage - SET
            dispatch(testSecureStorage())
            //! testing secure storage - SET
          }}
        >
          <Image
            style={styles.typeIcon}
            source={{ uri: 'https://img.icons8.com/doodle/96/000000/plant-under-sun--v1.png' }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('PlantListSuggested', {
            //   buttonType: "plants"
            // })

            //! testing secure storage - GET
            SecureStore.getItemAsync('testStoreKey').then((val) => console.log('valllll = ', val))
            //! testing secure storage - GET
          }}
        >
          <Image
            style={styles.typeIcon}
            source={{ uri: 'https://img.icons8.com/color/96/000000/group-of-vegetables.png' }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.typeIconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PlantListSuggested', {
              buttonType: "vegteblas"
            })
          }}
        >
          <Image
            style={styles.typeIcon}
            source={{ uri: 'https://img.icons8.com/color/96/000000/orchid.png' }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PlantListSuggested', {
              buttonType: "fruits"
            })
          }}
        >
          <Image
            style={styles.typeIcon}
            source={{ uri: 'https://img.icons8.com/color/96/000000/group-of-fruits.png' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

GrowItApp.propTypes = {
  navigation: object
};

export default GrowItApp;
