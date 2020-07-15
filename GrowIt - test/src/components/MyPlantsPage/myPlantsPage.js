import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import { CountDown } from 'react-native-countdown-component';
import { useSelector, useDispatch } from 'react-redux';
import { irrigatePlantAndUpdate } from '../../redux/actions/plantActions';
import { List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalComponent from '../Modal/Modal';
import styles from './style';

const myPlantsPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const myPlants = useSelector((state) => state.plantsReducer.myPlants);
  const [modalVisible, setModalVisible] = useState({ flag: false, obj: {} });

  return (
    <View>
      <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <List
        dataArray={myPlants}
        renderRow={(item) => (
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: item.imgUrl }} />
            </Left>

            <Body>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PlantPage', {
                    plantObj: { ...item },
                    buttonFlag: false
                  });
                }}
              >
                <Text style={styles.font}>{item.name}</Text>
                <Text note style={styles.font}>
                  Click for info
                </Text>
                <Text style={styles.font}>Irrigation status</Text>
                <ProgressBar
                  progress={item.nextIrrigate ? processPart(item) : 0}
                  color={Colors.blue800}
                />
                {item.nextIrrigate ? <Text style={styles.font}>Next irrigating</Text> : null}
                {item.nextIrrigate ? (
                  <ClockComponent countDownInSec={item.nextIrrigate - Date.now() / 1000} />
                ) : null}
              </TouchableOpacity>
            </Body>

            <Right>
              <Text note style={styles.font}>
                Added at {item.addedAt}
              </Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible({ flag: true, obj: item });
                  }}
                >
                  <Icon name="delete" size={25} color={Colors.red800} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(irrigatePlantAndUpdate(item));
                  }}
                  style={styles.irrigateBtn}
                >
                  <Icon name="water-pump" color={Colors.blue800} size={25} />
                </TouchableOpacity>
              </View>
            </Right>
          </ListItem>
        )}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text style={[styles.font, styles.emptyList]}>You dont have plants yet 🤷‍♂️</Text>
        }
      />
    </View>
  );
};

const ClockComponent = ({ countDownInSec }) => {
  return (
    <CountDown
      size={11}
      style={styles.clock}
      until={countDownInSec}
      digitStyle={styles.clockDigitStyle}
      digitTxtStyle={styles.clockDigitTxtStyle}
      timeLabelStyle={styles.clockTimeLabelStyle}
      separatorStyle={styles.clockSeparatorStyle}
      timeToShow={['D', 'H', 'M', 'S']}
      timeLabels={{ d: 'D', h: 'H', m: 'M', s: 'S' }}
    />
  );
};

const processPart = (item) => {
  return (Date.now() / 1000 - (item.nextIrrigate - item.waterAmount)) / item.waterAmount;
};

ClockComponent.propTypes = {
  countDownInSec: PropTypes.number
};

export default myPlantsPage;
