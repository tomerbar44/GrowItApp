import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { object } from 'prop-types';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Toast ,Right  } from 'native-base';
// import { useFonts, Comfortaa_600SemiBold } from '@expo-google-fonts/comfortaa';


import {addToMyPlants} from '../../redux/actions/plantActions';
import styles from './style';
import PlantItem from '../PlantItem/PlantItem'
// import { Toast, Button } from 'native-base'



function PlantListSuggested ({ navigation, route }) {
  const dispatch = useDispatch()
  const myPlants = useSelector((state) => state.plantsReducer.myPlants)
  // console.log('myPlants = ', myPlants)

  const { plantObj } = route.params
  // console.log('navigation = ', navigation)
  // console.log('plantObj = ', plantObj)
  // let [fontsLoaded] = useFonts({
  //   Comfortaa_600SemiBold,
  // });
  async function buttonEvent() {
    await dispatch(addToMyPlants(plantObj))
    Toast.show({
          text: `${plantObj.name} added to your garden ! 🥳`,
          textStyle: { fontFamily:'Comfortaa_600SemiBold'},
          buttonText: "Okay",
          buttonTextStyle: { fontFamily:'Comfortaa_600SemiBold',color:'blue'},
          type: "success",
          duration:2500,
          onClose()	{
            navigation.reset({
              index:0,
              routes: [{name: 'Home'}]
            })
             navigation.navigate('myPlantsPage')
          }
        })
  }
 
  return (
    <Container>

        <Content>
          <Card style={{flex: 0,marginTop:10}}>
            <CardItem style={{borderStyle:'solid',borderBottomColor:'#A1DEC0',borderBottomWidth:1}}>
              <Left>
                {/* <Thumbnail source={{uri: plantObj.imgUrl}} /> */}
                <Body>
                  <Text style={{fontFamily:'Comfortaa_600SemiBold'}}>Treatment:</Text>
                  <Text note style={{fontFamily:'Comfortaa_600SemiBold'}}>{plantObj.howToITreat}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={{borderStyle:'solid',borderBottomColor:'#A1DEC0',borderBottomWidth:1}}>
              <Body>
                <Image source={{uri: plantObj.imgUrl }} style={{height: 350,width:'100%'}}/>
              </Body>
            </CardItem>
            <CardItem>
            <Left>
                <Body>
                  <Text style={{fontFamily:'Comfortaa_600SemiBold'}}>Some words on it:</Text>
                  <Text note style={{fontFamily:'Comfortaa_600SemiBold'}}>{plantObj.description}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={{justifyContent:'center'}} >
              <Button bordered onPress={() =>buttonEvent()}>
            <Text style={{fontFamily:'Comfortaa_600SemiBold'}}>Start Grow !</Text>
          </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
  );
};

PlantListSuggested.propTypes = {
  route: object
};

export default PlantListSuggested;
