import React from 'react';
import { object } from 'prop-types';
import { FlatList, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import styles from '../style/style';
import { useSelector } from 'react-redux';

// /**
//  * 
//  * have trouble to use myPlants Array as data for FlatList
//  *  
//  */
const myPlantsPage = ({ navigation }) => {
  // const { plantObj } = route.params;
  const myPlants = useSelector((state) => state.plantsReducer.myPlants)
  console.log('myPlants = ', myPlants)

  function Item({ name }) {
    return (
      <View key={Date.now()}>
        <Text style={styles.message} keyExtractor={Date.now()}>
          {Date.now() + 1}.
  </Text>
        <Text style={styles.message} keyExtractor={Date.now()}>
          {' '}
          {name}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container} >
      <FlatList
        data={myPlants}
        renderItem={({ item }) => <Item name={item.name} />}
        keyExtractor={item => item.id}
      />
    </View >
  );
};

myPlantsPage.propTypes = {
  // route: object
};

export default myPlantsPage;



// import React from 'react';
// import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
// import Constants from 'expo-constants';

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];

// function Item({ title }) {
//   return (
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   );
// }

// export default function App() {
//   const myPlants = useSelector((state) => state.plantsReducer.myPlants)
//   return (
//     <SafeAreaView style={styless.container}>
//       <FlatList
//         data={myPlants}
//         renderItem={({ item }) => <Item title={item.name} />}
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>
//   );
// }

// const styless = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });












/**
 *
 *
 *         <FlatList
          keyExtractor={(item) => item}
          data={DATAAA}
          renderItem={({ item }) => {
            return (
              <View style={styles.searchItem} key={Date.now()}>
                <Text style={styles.message} keyExtractor={Date.now()}>
                  {Date.now() + 1}.
              </Text>
                <Text style={styles.message} keyExtractor={Date.now()}>
                  {' '}
                  {item}
                </Text>
              </View>
            );
          }}
          // ListEmptyComponent={() => (
          //   <View>
          //     <Text style={styles.message}>You havent already made a search. 🤷‍♂️</Text>
          //   </View>
          // )}
        />
 *
 */

