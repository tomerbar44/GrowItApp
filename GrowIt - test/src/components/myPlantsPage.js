import React, { useState } from 'react';
import { object } from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import CountDown from 'react-native-countdown-component';

import { setNotification, cancelScheduledNotification } from '../localNotification'
import { List, ListItem, Left, Body, Right, Thumbnail, Text, Toast } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './MainScreen/style';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromDevice, updatePlantIrrigateOnMemo } from '../redux/actions/plantActions';
import ModalComponent from './ModalComponent'





const myPlantsPage = ({ navigation }) => {
  const dispatch = useDispatch()
  const myPlants = useSelector((state) => state.plantsReducer.myPlants)
  const [modalVisible, setModalVisible] = useState({ flag: false, obj: {} });


  const ClockComponent = ({ countDownInSec }) => {
    console.log('countDownInSec = ', countDownInSec)
    return (
      <CountDown
        size={11}
        style={{paddingRight:75,paddingTop:5}}
        until={countDownInSec}
        onFinish={() => alert('Time to irrigate is over!')}
        digitStyle={{ backgroundColor: '#A1DEC0', borderWidth: 2, borderColor: 'transparent' }}
        digitTxtStyle={{ color: '#666666' }}
        timeLabelStyle={{ color: '#000000', fontWeight: 'bold',textAlign:'left' }}
        separatorStyle={{ color: '#A1DEC0' }}
        timeToShow={['D', 'H', 'M', 'S']}
        timeLabels={{ d: 'D', h: 'H', m: "M", s: 'S' }}
      />
    )
  }

  async function addIrrigateButtonEvent(plantObj) {
    const timeToIrrigate = (Date.now() / 1000) + Number(plantObj.waterAmount)
    if (plantObj.notificationId !== undefined) {
      const prevNotificationId = plantObj.notificationId
      cancelScheduledNotification(prevNotificationId)
    }
    setNotification('GrowItApp', `Time to irrigate ${plantObj.name} !💦`, plantObj.imgUrl, Number(plantObj.waterAmount))
      .then(async (notificationId) => {
        console.log('Notification id =>', notificationId)
        Object.assign(plantObj, { nextIrrigate: timeToIrrigate, notificationId: notificationId })
        await dispatch(updatePlantIrrigateOnMemo(plantObj))
        Toast.show({
          text: `${plantObj.name} is glad you take care of it ! 💦🌲`,
          textStyle: { fontFamily: 'Comfortaa_600SemiBold' },
          buttonText: "Okay",
          buttonTextStyle: { fontFamily: 'Comfortaa_600SemiBold', color: 'blue' },
          type: "success",
          duration: 2500,
        })
      })
      .catch(e => console.log('error =>', e))
  }

  async function removeButtonEvent(plantObj) {
    await dispatch(removeFromDevice(plantObj._id))
    Toast.show({
      text: `${plantObj.name} remove from your garden ! 🙁`,
      textStyle: { fontFamily: 'Comfortaa_600SemiBold' },
      buttonText: "Okay",
      buttonTextStyle: { fontFamily: 'Comfortaa_600SemiBold', color: 'blue' },
      type: "success",
      duration: 2500,
    })
  }


  return (
    <View>
      <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} removeButtonEvent={removeButtonEvent} />
      <List
        dataArray={myPlants}
        renderRow={(item) =>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: item.imgUrl }} />
            </Left>
            <Body>
              <Text style={{ fontFamily: 'Comfortaa_600SemiBold' }}>{item.name}</Text>
              <Text note style={{ fontFamily: 'Comfortaa_600SemiBold' }}>{item.description}</Text>
              <Text style={{ fontFamily: 'Comfortaa_600SemiBold' }}>Growth status</Text>
              <ProgressBar progress={item.nextIrrigate ? ((Date.now() / 1000) - (item.nextIrrigate - item.waterAmount)) / (item.waterAmount) : 0} color={Colors.blue800} />
              {item.nextIrrigate ? <Text style={{ fontFamily: 'Comfortaa_600SemiBold' }}>Next irrigating</Text> : null}
              {item.nextIrrigate ? <ClockComponent countDownInSec={item.nextIrrigate - (Date.now() / 1000)} /> : null}
            </Body>
            <Right >
              <Text note style={{ fontFamily: 'Comfortaa_600SemiBold' }}>Added at {item.addedAt}</Text>
              <View style={{ marginTop: 5, marginRight: 2, flex: 1, justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => {
                  setModalVisible({ flag: true, obj: item })
                }}>
                  <Icon name="delete" size={25} color={Colors.red800} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    addIrrigateButtonEvent(item)
                  }}
                  style={{ marginBottom: 15 }}>
                  <Icon name="water-pump" color={Colors.blue800} size={25} />
                </TouchableOpacity>
              </View>
            </Right>
          </ListItem>
        }

        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={{ fontFamily: 'Comfortaa_600SemiBold', fontSize: 22, textAlign: 'center', paddingTop: '20%' }}>You don't have plants yet 🤷‍♂️</Text>}
      />
    </View>
  );
};

myPlantsPage.propTypes = {
  // route: object
};

export default myPlantsPage;

