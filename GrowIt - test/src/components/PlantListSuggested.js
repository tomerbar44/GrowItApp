import React, { useState, useEffect, useReducer } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { object } from 'prop-types';
import { FlatList, Text, View, ActivityIndicator, Button, TouchableOpacity, Image } from 'react-native';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon } from 'native-base';

import * as actions from '../redux/actions/plantActions';
import styles from '../style/style';
import PlantItem from './PlantItem'
import axios from 'axios'
import Loading from './Loading';



const PlantListSuggested = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const { buttonType } = route.params;
  const { lat, lon } = useSelector((state) => state.plantsReducer.location);
  const plantsList = useSelector((state) => state.plantsReducer.plantsList)

  
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`https://mobile-final-project-server.herokuapp.com/GrowIt/api/${buttonType}/${lat}/${lon}`)
      // console.log(data,lat,lon)
      // const { data } = await axios.get(`http://10.0.2.2:3000/GrowIt/api/${buttonType}/${lat}/${lon}`)
      dispatch(actions.setPlantList(data.dbresult))
      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
    }

  }

  useEffect(() => {
    try {
      fetchData()

    }
    catch (error) {
      console.log(error.message)
    }
  }, [])


  return isLoading ? (
    <Loading />
  ) : (
      plantsList.length === 0 ? (
        <View style={styles.activityIndator}>
          <Text style={styles.message}>No Results were found 🙄</Text>
        </View>
      ) : (
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <DeckSwiper
              dataSource={plantsList}
              renderItem={item =>
                <PlantItem key={item._id} navigation={navigation} plantObj={item} />
              }
            />
          </View>
        )
    )
}









// };

PlantListSuggested.propTypes = {
  route: object
};


export default PlantListSuggested;
