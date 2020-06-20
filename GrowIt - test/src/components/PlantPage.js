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
    recentSearches: plants.recentSearches,
    isLoading: plants.isLoading
  };
};

const PlantListSuggested = ({ route, loadTracks, navigation, recentSearches, plantsList, isLoading }) => {
  const { name } = route.params;
  
   // Similar to componentDidMount and componentDidUpdate:
   useEffect(() => {
    //  loadTracks("sia")
  });
  

  
  return (
    <View style={styles.container}>
    {/* <img src="https://img.icons8.com/doodle/96/000000/beautiful-flower.png"/>         */}
    <View style={{flex:1,flexDirection:'column'}}>
    <Image
          style={{ flex:1 ,width: 200,marginLeft:'25%',height:200,resizeMode:'contain'}}
          source={{ uri:  'https://img.icons8.com/doodle/96/000000/beautiful-flower.png'}}
        />
        <View style={{ flex: 1,
    justifyContent: 'center',
    backgroundColor:'#A1DEC0',
    margin:10}}>
          <Text style={styles.message}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend laoreet augue, eget luctus nibh aliquam et. Maecenas molestie mauris.</Text>
        </View>
        <View style={{ flex: 1,
    justifyContent: 'center',
    backgroundColor:'#A1DEC0',
    margin:10}}>
          <Text style={styles.message}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend laoreet augue, eget luctus nibh aliquam et. Maecenas molestie mauris.</Text>
        </View>
        </View>
       {/* {isLoading && (
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
          renderItem={({ item }) => <TrackItem trackObj={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
       */}

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
      <View style={styles.buttonStyle}>
        <Button
          title="Start Grow!"
          onPress={() => {
            navigation.navigate('RecentSearches', {
              recentSearches
            });
          }}
        />
      </View>
    </View>
  );
};

PlantListSuggested.propTypes = {
  route: object
};

const ConnectedPlantListSuggested = connect(mapStateToProps, actions)(PlantListSuggested);
export default ConnectedPlantListSuggested;
