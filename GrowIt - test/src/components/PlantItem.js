import * as React from 'react';
import { object } from 'prop-types';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import styles from '../style/style';



function PlantItem({ plantObj,navigation }) {
  // console.log(plantObj.imgUrl)
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PlantPage', {
          plantObj: plantObj
        })
      }}
    >
      <View style={styles.itemList}>
        <Image
          style={styles.typeIcon}
          source={{uri:plantObj.imgUrl}}
        />
        <View style={styles.textArea}>
          <Text style={styles.titleList}>{plantObj.name}</Text>
          {/* <View style={styles.itemList}> */}
          <Text style={styles.textList}>type: {plantObj.type}</Text>
            <Text style={styles.textList}>waterAmount: {plantObj.waterAmount}</Text>
            <Text style={styles.textList}>recommendedTemp: {plantObj.recommendedTemp}</Text>
          {/* </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

PlantItem.propTypes = {
  plantObj: object
};

export default PlantItem;
