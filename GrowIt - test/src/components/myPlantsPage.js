import React from 'react';
import { object } from 'prop-types';
// import { FlatList, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { View } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';

import { Container, Header, Button, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon,Toast } from 'native-base';

import styles from '../style/style';
import { connect, useSelector, useDispatch } from 'react-redux';
import {removeFromDecive} from '../redux/actions/plantActions';

// /**
//  * 
//  * have trouble to use myPlants Array as data for FlatList
//  *  
//  */
const myPlantsPage = ({ navigation }) => {
  const dispatch = useDispatch()
  // const { plantObj } = route.params;
  // const myPlants = useSelector((state) => state.plantsReducer.myPlants)

  const myPlants = useSelector((state) => state.plantsReducer.myPlants)

  async function buttonEvent(plantObj) {
    await dispatch(removeFromDecive(plantObj._id))
    Toast.show({
          text: `${plantObj.name} remove from your garden ! 🥳`,
          textStyle: { fontFamily:'Comfortaa_600SemiBold'},
          buttonText: "Okay",
          buttonTextStyle: { fontFamily:'Comfortaa_600SemiBold',color:'blue'},
          type: "success",
          duration:2500,
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
            <Right style={{flex:1, justifyContent:'space-around'}}>
              <Text note style={{ fontFamily: 'Comfortaa_600SemiBold' }}>started {item.addedAt}</Text>
              <View>
              <Text note style={{ fontFamily: 'Comfortaa_600SemiBold' }}>Next irrigating</Text>
              <Text note style={{ fontFamily: 'Comfortaa_600SemiBold' }}>3:43</Text>

              </View>

            </Right>
            <Right >
              <View style={{marginTop:5}}>

              
              <Button bordered onPress={() =>buttonEvent(item)}>
              <Icon active name="trash"  />
          </Button>
              </View>
              <Icon active name="water" />
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



// import React from 'react';
// import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
// import Constants from 'expo-constants';

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];

// function Item({ title }) {
//   return (
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   );
// }

// export default function App() {
//   const myPlants = useSelector((state) => state.plantsReducer.myPlants)
//   return (
//     <SafeAreaView style={styless.container}>
//       <FlatList
//         data={myPlants}
//         renderItem={({ item }) => <Item title={item.name} />}
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>
//   );
// }

// const styless = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });












/**
 *
 *
 *         <FlatList
          keyExtractor={(item) => item}
          data={DATAAA}
          renderItem={({ item }) => {
            return (
              <View style={styles.searchItem} key={Date.now()}>
                <Text style={styles.message} keyExtractor={Date.now()}>
                  {Date.now() + 1}.
              </Text>
                <Text style={styles.message} keyExtractor={Date.now()}>
                  {' '}
                  {item}
                </Text>
              </View>
            );
          }}
          // ListEmptyComponent={() => (
          //   <View>
          //     <Text style={styles.message}>You havent already made a search. 🤷‍♂️</Text>
          //   </View>
          // )}
        />
 *
 */

