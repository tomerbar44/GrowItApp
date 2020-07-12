import React from 'react';
import { object } from 'prop-types';
// import { FlatList, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { View } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';

import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../style/style';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';


const ClockComponent = () => {
  return (
    <CountDown
      size={12}
      until={604800}
      onFinish={() => alert('Finished')}
      digitStyle={{ backgroundColor: '#A1DEC0', borderWidth: 2, borderColor: 'transparent' }}
      digitTxtStyle={{ color: '#666666' }}
      timeLabelStyle={{ color: '#000000', fontWeight: 'bold' }}
      separatorStyle={{ color: '#A1DEC0' }}
      timeToShow={['D', 'H', 'M', 'S']}
      timeLabels={{ d: 'D', h: 'H', m: "M", s: 'S' }}
    // showSeparator
    />
  )
}

const myPlantsPage = ({ navigation }) => {
  const myPlants = useSelector((state) => state.plantsReducer.myPlants)

  function Item({ name }) {
    return (
      <View key={Date.now()}>
        <Text style={styles.message} keyExtractor={Date.now()}>
          {Date.now() + 1}.
  </Text>
        <Text style={styles.message} keyExtractor={Date.now()}>
          {' '}
          {name}
        </Text>
      </View>
    );
  }

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
                  onPress = {() => {
                    console.log('irrigating!')
                  }}
                >

                  <Icon name="water-pump" size={25} />
                </TouchableOpacity>
                <Text note style={{ fontFamily: 'Comfortaa_600SemiBold' }}>Next irrigating</Text>
                {/* <Text note style={{ fontFamily: 'Comfortaa_600SemiBold' }}></Text> */}
                <ClockComponent />

              </View>

            </Right>
            <Right >
              {/* <Icon name="trash" /> */}
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



/**
 *
 * import CountDown from 'react-native-countdown-component';

render() {
    return (
      <CountDown
        size={30}
        until={1000}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
    )
}
 *
 */