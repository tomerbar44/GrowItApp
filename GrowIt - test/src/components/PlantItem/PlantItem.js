import * as React from 'react';
import { object } from 'prop-types';
import { TouchableOpacity, Image} from 'react-native';
import { Card, CardItem, Thumbnail, Left, Body, Icon, Text, Header } from 'native-base';
import styles from './style';

function PlantItem({ plantObj,navigation }) {

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PlantPage', {
          plantObj: {...plantObj}
        })
      }}
    > 
         <Card style={styles.card}>  
              <CardItem >
                 <Left>
                   <Thumbnail source={{uri:plantObj.imgUrl}} />
                   <Body>
                   <Text style={styles.txt}>{plantObj.name}</Text>
                 </Body>
               </Left>
               </CardItem>
              <CardItem cardBody>
                 <Image style={styles.img} source={{uri:plantObj.imgUrl}} />
               </CardItem>
               <CardItem>
            <Icon name="heart" style={styles.icon} />
                <Body>
                  <Text style={styles.txt}>Family</Text>
                  <Text note style={styles.txt}>{plantObj.family}</Text>
                </Body>
                <Body>
                  <Text style={styles.txt}>Water</Text>
                  <Text note style={styles.txt}>each {plantObj.waterAmount/86400} days</Text>
                </Body>
                <Body>
                  <Text style={styles.txt}>Temp</Text>
                  <Text note style={styles.txt}>{plantObj.recommendedTemp} </Text>
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
