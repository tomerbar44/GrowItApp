import * as React from 'react';
import { object } from 'prop-types';
import { TouchableOpacity, Image} from 'react-native';
import { Card, CardItem, Thumbnail, Left, Body, Icon, Text, Header } from 'native-base';
// import { useFonts, Comfortaa_300Light } from '@expo-google-fonts/comfortaa';

import styles from '../style/style';



function PlantItem({ plantObj,navigation }) {
  // let [fontsLoaded] = useFonts({
  //   Comfortaa_300Light,
  // });
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PlantPage', {
          plantObj: plantObj
        })
      }}
    > 
         <Card style={{ elevation: 3 ,marginTop:'15%'}}>  
              <CardItem >
                 <Left>
                   <Thumbnail source={{uri:plantObj.imgUrl}} />
                   <Body>
                   <Text style={{fontFamily:'Comfortaa_600SemiBold'}}>{plantObj.name}</Text>
                 </Body>
               </Left>
               </CardItem>
              <CardItem cardBody>
                 <Image style={{ height: 350, flex: 1 }} source={{uri:plantObj.imgUrl}} />
               </CardItem>
               <CardItem>
            <Icon name="heart" style={{ color: '#ED4A6A' }} />
                <Body>
                  <Text style={{fontFamily:'Comfortaa_600SemiBold'}}>Family</Text>
                  <Text note style={{fontFamily:'Comfortaa_600SemiBold'}}>{plantObj.family}</Text>
                </Body>
                <Body>
                  <Text style={{fontFamily:'Comfortaa_600SemiBold'}}>Water</Text>
                  <Text note style={{fontFamily:'Comfortaa_600SemiBold'}}>{plantObj.waterAmount} per week</Text>
                </Body>
                <Body>
                  <Text style={{fontFamily:'Comfortaa_600SemiBold'}}>Temp</Text>
                  <Text note style={{fontFamily:'Comfortaa_600SemiBold'}}>{plantObj.recommendedTemp} </Text>
                </Body>
            </CardItem>
             </Card>
    </TouchableOpacity>
  );
}

PlantItem.propTypes = {
  plantObj: object
};

export default PlantItem;
