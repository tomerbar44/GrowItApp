import React, { useState, useEffect, useReducer } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { object } from 'prop-types';
import { FlatList, Text, View, ActivityIndicator, Button, TouchableOpacity, Image } from 'react-native';
import * as actions from '../redux/actions/plantActions';
import styles from '../style/style';
import PlantItem from './PlantItem'
import axios from 'axios'

const mapStateToProps = ({ plants }) => {
  return {
    plantsList: plants.plantsList,
    isLoading: plants.isLoading
  };
};


const PlantListSuggested = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const { buttonType } = route.params;
  const { lat, lon } = useSelector((state) => state.plantsReducer.location);
  const plantsList = useSelector((state) => state.plantsReducer.plantsList)
  // const isLoading = useSelector((state) => state.plantsReducer.isLoading)

  const fetchData = async () => {
    try {
      // const { data } = await axios.get(`https://mobile-final-project-server.herokuapp.com/GrowIt/api/${buttonType}/${lat}/${lon}`)
      const { data } = await axios.get(`http://10.0.2.2:3000/GrowIt/api/${buttonType}/${lat}/${lon}`)
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


  // return isLoading ? (<Text> yes </Text>) : (<Text>  not loading </Text>)

  // return isLoading ? (<Text> yes </Text>) : (
  //   <View style={styles.container}>

  {/* <Text> texting</Text> */ }

  return isLoading ? (
    <View style={styles.activityIndator}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    plantsList.length === 0 ? (
          <View style={styles.activityIndator}>
            <Text style={styles.message}>No Results were found 🙄</Text>
          </View>
        ) : (
          <FlatList
            key={2}
            data={plantsList}
            renderItem={({ item }) => (<PlantItem key={item._id} navigation={navigation} plantObj={item} />)}
            keyExtractor={(item) => item._id}
          />
        )
  )
  
  // {
  //   plantsList.length === 0 ? (
  //     <View style={styles.activityIndator}>
  //       <Text style={styles.message}>No Results were found 🙄</Text>
  //     </View>
  //   ) : (
  //     <FlatList
  //       key={2}
  //       data={plantsList}
  //       renderItem={({ item }) => <PlantItem navigation={navigation} plantObj={item} />}
  //       keyExtractor={(item) => item.id}
  //     />
  //   )
  // }
}


{/* <FlatList
        keyExtractor={(item) => item}
        data={slicedArray}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.searchItem}>
              <Text style={styles.message} keyExtractor={index}>
                {index + 1}.
              </Text>
              <Text style={styles.message} keyExtractor={index}>
                {' '}
                {item}
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.message}>You havent already made a search. 🤷‍♂️</Text>
          </View>
        )}
      /> */}
  //   </View>
  // );






// };

PlantListSuggested.propTypes = {
  route: object
};


export default PlantListSuggested;
