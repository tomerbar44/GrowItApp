import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { object } from 'prop-types';
import { FlatList, Text, View, ActivityIndicator, Button, TouchableOpacity, Image } from 'react-native';
import {addToMyPlants} from '../redux/actions/plantActions';
import styles from '../style/style';
import PlantItem from './PlantItem'
// import { Toast, Button } from 'native-base'
import ToastType from './ToastButton'

function PlantListSuggested ({ navigation, route }) {
  const dispatch = useDispatch()
  const myPlants = useSelector((state) => state.plantsReducer.myPlants)
  // console.log('myPlants = ', myPlants)

  const { plantObj } = route.params
  // console.log('navigation = ', navigation)
  // console.log('plantObj = ', plantObj)

  return (
    <View style={styles.container}>
      {/* <img src="https://img.icons8.com/doodle/96/000000/beautiful-flower.png"/>         */}
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Image
          style={{ flex: 1, width: 200, marginLeft: '25%', height: 200, resizeMode: 'contain' }}
          source={{ uri: plantObj.imgUrl }}
        // 'https://img.icons8.com/doodle/96/000000/beautiful-flower.png'
        />
        <View style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#A1DEC0',
          margin: 10
        }}>
          <Text style={styles.message}>{plantObj.description}</Text>
        </View>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#A1DEC0',
          margin: 10
        }}>
          <Text style={styles.message}> Treatment</Text>
          <Text style={styles.message}>{plantObj.howToITreat}</Text>
        </View>
      </View>

      <View style={styles.buttonStyle}>
        {/* react native button */}
        <Button
          title="Start Grow!"
          onPress={() => {
            // navigation.navigate('myPlants', {
            //   plantObj:plantObj
            // });

            dispatch(addToMyPlants(plantObj))
          }}
        />

        {/* <ToastType >
          </ToastType> */}


      </View>
    </View>
  );
};

PlantListSuggested.propTypes = {
  route: object
};

export default PlantListSuggested;
