import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { DeckSwiper } from 'native-base';
import { setPlantList } from '../../redux/actions/plantActions';
import styles from './style';
import PlantItem from '../PlantItem/PlantItem';
import Loading from '../Loading/Loading';

const PlantListSuggested = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { buttonType } = route.params;
  const { lat, lon } = useSelector((state) => state.plantsReducer.location);
  const plantsList = useSelector((state) => state.plantsReducer.plantsList);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://mobile-final-project-server.herokuapp.com/GrowIt/api/${buttonType}/${lat}/${lon}`
      );
      dispatch(setPlantList(data.dbresult));
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return isLoading ? (
    <Loading />
  ) : plantsList.length === 0 ? (
    <View style={styles.notFoundText}>
      <Text style={styles.txt}>No Results were found 🙄</Text>
    </View>
  ) : (
    <View style={styles.view}>
      <DeckSwiper
        dataSource={plantsList}
        renderItem={(item) => <PlantItem key={item._id} navigation={navigation} plantObj={item} />}
      />
    </View>
  );
};

PlantListSuggested.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object
};

export default PlantListSuggested;
