import React from 'react';
import { object } from 'prop-types';
import { FlatList, View, Text } from 'react-native';
import styles from '../style/style';

const RecentSearches = ({ route }) => {
  const { recentSearches } = route.params;
  const slicedArray = recentSearches.slice(Math.max(recentSearches.length - 5, 1));
  return (
    <View style={styles.container}>
      <FlatList
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
      />
    </View>
  );
};

RecentSearches.propTypes = {
  route: object
};

export default RecentSearches;
