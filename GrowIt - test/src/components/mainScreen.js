import React, { useEffect } from 'react';
import {  View, TouchableOpacity, Image,FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLocationAction, testSecureStorage,getGrowItTypes } from '../redux/actions/plantActions'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';


import * as SecureStore from 'expo-secure-store';
// import pic from  '../../assets/icon.png'

import { bool, object, array, func } from 'prop-types';
import styles from '../style/style';
import { useSelector } from 'react-redux';
import PlantListSuggested from './PlantListSuggested';
import { AsyncStorage } from 'react-native';

const GrowItApp = ({ navigation }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getGrowItTypes());
    dispatch(setLocationAction())
    
    // SecureStore.getItemAsync('testStoreKey')
    //   .then((value) => {

    //   }).catch((error) => {

    //   })
    AsyncStorage.clear((err) => {console.log('asyncStorage err = ', err)})
  }, [])

  const plantsList = useSelector((state) => state.plantsReducer.plantsList);
  const location = useSelector((state) => state.plantsReducer.location);
  const storedVal = useSelector((state) => state.plantsReducer.storedVal)
  const types = useSelector((state) => state.plantsReducer.types)

  console.log("types",types)
 

  return (
    <View style={styles.container}>

      <View style={styles.slogenContainer}>
        <Text style={{fontSize:20 , padding:5,fontFamily:'Comfortaa_600SemiBold'}}> Hi, We are GrowIt ! 💪🏼</Text>
        <Text style={{fontSize:20,  padding:5,fontFamily:'Comfortaa_600SemiBold'}}> We will provide you the right plants for your area. 😀</Text>
        </View>
        <FlatList
          key={2}
          data={types}
          renderItem={({ item }) => 
          <View style={{margin:10}}>
          <TouchableOpacity
          onPress={() => {
            navigation.navigate('PlantListSuggested', {
              buttonType: item
            })
            //! testing secure storage - SET
            // dispatch(testSecureStorage())
            //! testing secure storage - SET
          }}
        >
          <Card >
            <CardItem style={{borderStyle:'solid',borderColor:'#A1DEC0',borderWidth:1}}>
              <Left>
                <Body>
                  <Text style={{fontSize:20 ,padding:5,fontFamily:'Comfortaa_600SemiBold'}}>{item}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody style={{borderStyle:'solid',borderColor:'#A1DEC0',borderWidth:1}}>
              <Image source={{uri:`https://mobile-final-project-growit.s3-eu-west-1.amazonaws.com/${item}.png`}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            {/* <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem> */}
          </Card>




          
          {/* <Image
            style={styles.typeIcon}
            source={pic}
          />
          <Text >{item}</Text> */}
        </TouchableOpacity></View>
     
        }
          keyExtractor={(item) => item.id}
        />
        {/* <Text> {plantsList[0]} </Text> */}

        {/* <Text> {location.lat} </Text>
        <Text> {location.lon} </Text> */}
        {/* <Text>  {storedVal} </Text> */}

      

    </View>
  );
};

GrowItApp.propTypes = {
  navigation: object
};

export default GrowItApp;
