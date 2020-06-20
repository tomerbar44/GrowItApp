import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import { FlatList, Text, View, ActivityIndicator, Button, TouchableOpacity,Image } from 'react-native';
import * as actions from '../redux/actions/plantActions';
import styles from '../style/style';
import PlantItem from './PlantItem'

const mapStateToProps = ({ plants }) => {
  return {
    plantsList: plants.plantsList,
    isLoading: plants.isLoading
  };
};

const PlantListSuggested = ({ route, loadTracks, navigation, plantsList, isLoading }) => {
  const { buttonType } = route.params;
  
   // Similar to componentDidMount and componentDidUpdate:
   useEffect(() => {
      loadTracks("sia")
  },[]);
  

  
  return (
    <View style={styles.container}>

       {isLoading && (
        <View style={styles.activityIndator}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {plantsList.length === 0 ? (
        <View style={styles.activityIndator}>
          <Text style={styles.message}>No Results were found 🙄</Text>
        </View>
      ) : (
        <FlatList
          key={2}
          data={plantsList}
          renderItem={({ item }) => <PlantItem navigation={navigation} plantObj={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
      

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
    </View>
  );
};

PlantListSuggested.propTypes = {
  route: object
};


export default PlantListSuggested;
