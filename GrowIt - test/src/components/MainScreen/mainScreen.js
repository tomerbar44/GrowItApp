import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { initSystem } from '../../redux/actions/plantActions'
import { Card, CardItem, Text, Left, Body } from 'native-base';
import Loading from '../Loading/Loading'
import { bool, object, array, func } from 'prop-types';
import styles from './style';

const GrowItApp = ({ navigation }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initSystem())
  }, [])

  const types = useSelector((state) => state.plantsReducer.types)
  return (
    <View style={styles.container}>
      <View style={styles.slogenContainer}>
        <Text style={styles.txtStyle}> Hi, We are GrowIt ! 💪🏼</Text>
        <Text style={styles.txtStyle}> We will provide you the right plants for your area. 😀</Text>
      </View>
      {types.length === 0 ? <Loading /> :
        <FlatList
          key={2}
          keyExtractor={(item) => item}
          data={types}
          renderItem={({ item }) =>
            <View style={{ margin: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PlantListSuggested', {
                    buttonType: item
                  })
                }}
              >
                <Card >
                  <CardItem style={styles.cardStyle}>
                    <Left>
                      <Body>
                        <Text style={styles.txtStyle}>{item}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody style={styles.cardStyle}>
                    <Image source={{ uri: `https://mobile-final-project-growit.s3-eu-west-1.amazonaws.com/${item}.png` }} style={styles.imgStyle} />
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </View>
          }
        />
      }
    </View>
  );
};

GrowItApp.propTypes = {
  navigation: object
};

export default GrowItApp;
