import React from 'react';
// import * as Font from 'expo-font';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';
import GrowItApp from './src/components/MainScreen/mainScreen';
import PlantListSuggested from './src/components/PlantsListSuggested/PlantListSuggested';
import PlantPage from './src/components/PlantPage/PlantPage';
import myPlantsPage from './src/components/MyPlantsPage/myPlantsPage';
import store from './src/redux/store';
import { useFonts, Comfortaa_600SemiBold } from '@expo-google-fonts/comfortaa';
import { AppLoading } from 'expo';
import { Root } from 'native-base';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Comfortaa_600SemiBold,
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <Root>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#A1DEC0'
              },
              headerTitleStyle: {
                fontSize: 30,
                fontWeight: 'normal',
                fontFamily: 'Comfortaa_600SemiBold'
              }
            }}
          >
            <Stack.Screen
              name="Home"
              component={GrowItApp}
              options={({ navigation }) => ({
                title: 'GrowIt',
                headerRight() {
                  return (
                    <Icon
                      name="tree"
                      color="black"
                      type="font-awesome"
                      size={25}
                      containerStyle={styles.header}
                      onPress={() => navigation.navigate('myPlantsPage')}
                    />
                  );
                }
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
              options={({ route }) => ({
                title: route.params.plantObj.name,
                headerBackTitle: 'Back'
              })}
            />
            <Stack.Screen
              name="myPlantsPage"
              component={myPlantsPage}
              options={() => ({ title: 'My plants', headerBackTitle: 'Back' })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingRight: 20,
    paddingBottom: 5
  }
});
