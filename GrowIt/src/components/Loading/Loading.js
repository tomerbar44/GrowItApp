import React from 'react';
import styles from './style';
import { View, Image } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image resizeMode="cover" source={require('../../../assets/unnamed.gif')} />
    </View>
  );
}
