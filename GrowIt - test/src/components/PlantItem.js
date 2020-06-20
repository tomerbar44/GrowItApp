import * as React from 'react';
import { object } from 'prop-types';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import styles from '../style/style';

const SC_KEY = '?client_id=CW62xLA9h8wXrXC1WIaSX9OWA6novVIE';
const soundObject = new Audio.Sound();

async function playTrack(stream_url) {
  try {
    await soundObject.unloadAsync();
    await soundObject.loadAsync({ uri: stream_url + SC_KEY });
    await soundObject.playAsync();
  } catch (error) {
    console.error(error);
  }
}

function PlantItem({ plantObj,navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PlantPage', {
          name: plantObj.title
        })
      }}
    >
      <View style={styles.itemList}>
        <Image
          style={styles.typeIcon}
          source={{ uri: plantObj.artwork_url ? plantObj.artwork_url : plantObj.waveform_url }}
        />
        <View style={styles.textArea}>
          <Text style={styles.titleList}>{plantObj.title}</Text>
          {/* <View style={styles.itemList}> */}
          <Text style={styles.textList}>Likes: {plantObj.likes_count}</Text>
            <Text style={styles.textList}>Likes: {plantObj.likes_count}</Text>
            <Text style={styles.textList}>Likes: {plantObj.likes_count}</Text>
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
