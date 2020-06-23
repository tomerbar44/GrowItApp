import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'
import { Provider } from 'react-redux';
import GrowItApp from './src/components/mainScreen';
import PlantListSuggested from './src/components/PlantListSuggested';
import PlantPage from './src/components/PlantPage'
import myPlantsPage from './src/components/myPlantsPage'
import store from './src/redux/store'
// import * as Location from 'expo-location'
// import './src/localNotification'

const Stack = createStackNavigator();

const MyPlantsIcon = ({ navigation }) => {
  return (
    <Icon
      name="tree"
      color="black"
      type='font-awesome'
      size={25}
      containerStyle={{ paddingRight: 20, paddingBottom: 5 }}
      onPress={() => navigation.navigate('MyPlants')}
    // onPress={async () => {
    //   // console.log('tal')
    //   const res = await fetch('https://mobile-final-project-server.herokuapp.com/test', {
    //     body:{
    //       let:1,
    //       lat:2
    //     }
    //   })
    //   console.log('res = ', res)
    // }}
    />
  )

}


export default function App() {

  // askPermissionFromUser().then(res => console.log(JSON.stringify(res.coords))).catch(e => console.log('e!!'))
  return (
    <Provider store={store}>

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#A1DEC0',
            },
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'normal'
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={GrowItApp}
            options={({navigation}) => ({
              title: 'GrowIt',
              headerRight: () => (
                // <MyPlantsIcon />
                <Icon
                  name="tree"
                  color="black"
                  type='font-awesome'
                  size={25}
                  containerStyle={{ paddingRight: 20, paddingBottom: 5 }}
                  onPress={() => navigation.navigate('myPlantsPage')}
                // onPress={async () => {
                //   // console.log('tal')
                //   const res = await fetch('https://mobile-final-project-server.herokuapp.com/test', {
                //     body:{
                //       let:1,
                //       lat:2
                //     }
                //   })
                //   console.log('res = ', res)
                // }}
                />
              ),
            })}

          />
          <Stack.Screen
            name="PlantListSuggested"
            component={PlantListSuggested}
            options={{ title: 'You can grow', headerBackTitle: 'Back' }}
          />
          <Stack.Screen
            name="PlantPage"
            component={PlantPage}
            options={({ route }) => ({ title: route.params.name, headerBackTitle: 'Back' })}
          />
          <Stack.Screen
            name="myPlantsPage"
            component={myPlantsPage}
            // options={({ route }) => ({ title: route.params.name, headerBackTitle: 'Back' })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
