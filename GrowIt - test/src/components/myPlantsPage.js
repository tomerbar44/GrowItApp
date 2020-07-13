import React, { useState } from 'react';
import { object } from 'prop-types';
// import { FlatList, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { View, TouchableOpacity } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import {setNotification , cancelScheduledNotification} from '../localNotification'
import { Container, Header, List, ListItem, Left, Body, Right, Thumbnail, Text, Toast } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../style/style';
import { connect, useSelector, useDispatch } from 'react-redux';
import { removeFromDecive, updatePlantIrrigateOnMemo } from '../redux/actions/plantActions';




const myPlantsPage = ({ navigation }) => {
  const dispatch = useDispatch()
  const myPlants = useSelector((state) => state.plantsReducer.myPlants)
  const [state, setState] = useState(true)


  const ClockComponent = ({ countDownInSec }) => {
    console.log('countDownInSec = ',countDownInSec)
    return (
      <CountDown
        size={12}
        until={countDownInSec}
        onFinish={() => alert('done~')}
        digitStyle={{ backgroundColor: '#A1DEC0', borderWidth: 2, borderColor: 'transparent' }}
        digitTxtStyle={{ color: '#666666', }}
        timeLabelStyle={{ color: '#000000', fontWeight: 'bold' }}
        separatorStyle={{ color: '#A1DEC0' }}
        timeToShow={['D', 'H', 'M', 'S']}
        timeLabels={{ d: 'D', h: 'H', m: "M", s: 'S' }}
      // showSeparator
      />
    )
  }

  async function addIrrigateButtonEvent(plantObj) {
    // if (plantObj.nextIrrigate === undefined) {
      const timeToIrrigate = (Date.now() / 1000) + Number(plantObj.waterAmount)
      // const timeToIrrigate = (Date.now() / 1000) + 10
      console.log('timeToIrrigate ->', timeToIrrigate)
      setNotification(plantObj.name,'time to irrigate!', plantObj.imgUrl, /*Number(plantObj.waterAmount)*/ 10000  )
      .then(id => console.log('Notification id =>', id)).catch(e => console.log('error =>', e))
      Object.assign(plantObj, { nextIrrigate: timeToIrrigate })
      await dispatch(updatePlantIrrigateOnMemo(plantObj))

    // }
    // else {

      // await dispatch(updatePlantIrrigateOnMemo(plantObj))
    // }

    // setCountDownInSec(Number(plantObj.waterAmount))
    // console.log('plantObj -->', plantObj)

  }

  async function removeButtonEvent(plantObj) {
    await dispatch(removeFromDecive(plantObj._id))
    Toast.show({
      text: `${plantObj.name} remove from your garden ! 🥳`,
      textStyle: { fontFamily: 'Comfortaa_600SemiBold' },
      buttonText: "Okay",
      buttonTextStyle: { fontFamily: 'Comfortaa_600SemiBold', color: 'blue' },
      type: "success",
      duration: 2500,
      // onClose()	{
      //    navigation.push('Home')
      //    navigation.navigate('myPlantsPage')
      // }
    })
  }
  // console.log('myPlants = ', myPlants)

  return (
    <View>
      <List
        dataArray={myPlants}
        renderRow={(item) =>

          // <Container>
          // <Content>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: item.imgUrl }} />
            </Left>
            <Body>
              {/* <Text>idddd: {item._id}</Text> */}

              <Text style={{ fontFamily: 'Comfortaa_600SemiBold' }}>{item.name}</Text>
              <Text note style={{ fontFamily: 'Comfortaa_600SemiBold' }}>{item.description}</Text>
              <Text style={{ fontFamily: 'Comfortaa_600SemiBold' }}>Growth status</Text>
              <ProgressBar progress={0.2} color={Colors.blue800} />
            </Body>
            <Right style={{ flex: 1, justifyContent: 'space-around' }}>
              <Text note style={{ fontFamily: 'Comfortaa_600SemiBold' }}>started {item.addedAt}</Text>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => {
                    addIrrigateButtonEvent(item)
                  }}
                >

                  <Icon name="water-pump" size={25} />
                </TouchableOpacity>
                <Text note style={{ fontFamily: 'Comfortaa_600SemiBold' }}>Next irrigating</Text>
                {/* <Text note style={{ fontFamily: 'Comfortaa_600SemiBold' }}></Text> */}

                {/* {item.nextIrrigate !== undefined ? <ClockComponent countDownInSec={item.nextIrrigate  - Date.now() } /> : null} */}
                {item.nextIrrigate !== undefined ? <ClockComponent countDownInSec={item.nextIrrigate - (Date.now() / 1000)} /> : null}



              </View>

            </Right>
            <Right >
              <View style={{ marginTop: 5 }}>

                <TouchableOpacity onPress={() => removeButtonEvent(item)}>
                  <Icon active name="water" />
                </TouchableOpacity>
              </View>
            </Right>

          </ListItem>
          // </Content>
          // </Container>
        }

        keyExtractor={(item) => item._id}
      />

      {/* </List> */}
    </View>
  );
};

myPlantsPage.propTypes = {
  // route: object
};

export default myPlantsPage;

