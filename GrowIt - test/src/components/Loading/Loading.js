import React from 'react';
import styles from './style';
import { StyleSheet, View, Image } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={require('../../../assets/animated-hemp-marijuana-gif-10.gif')}
      />
      {/* <Image resizeMode="cover" source={require('../../../assets/unnamed.gif')} /> */}
    </View>
  );
}
