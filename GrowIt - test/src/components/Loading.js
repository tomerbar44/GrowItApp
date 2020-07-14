import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function Loading() {
  return (
    <View style={styles.container}>
      {/* <Image resizeMode="cover" source={require('../../assets/animated-hemp-marijuana-gif-10.gif')} /> */}
      <Image resizeMode="cover" source={require('../../assets/unnamed.gif')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  welcomeText: {
    margin: 15,
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  }
})