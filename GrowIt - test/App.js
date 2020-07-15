import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';
import MainScreen from './src/components/MainScreen/MainScreen';
import PlantListSuggested from './src/components/PlantsListSuggested/PlantListSuggested';
import PlantPage from './src/components/PlantPage/PlantPage';
import MyPlantsPage from './src/components/MyPlantsPage/MyPlantsPage';
import store from './src/redux/store';
import { useFonts, Comfortaa_600SemiBold } from '@expo-google-fonts/comfortaa';
import { AppLoading } from 'expo';
import { Root } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

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
              component={MainScreen}
              options={({ navigation }) => ({
                title: 'GrowIt',
                headerRight() {
                  return (
                    <View style={styles.header}>
                      <Icon
                        name="tree-outline"
                        color="yellow"
                        size={35}
                        style={styles.icon}
                        onPress={() => navigation.navigate('myPlantsPage')}
                      />
                      <Text style={styles.text}>My garden</Text>
                    </View>
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
              component={MyPlantsPage}
              options={() => ({ title: 'My garden', headerBackTitle: 'Back' })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    marginRight: 15,
    marginBottom: 5
  },
  icon: {
    marginLeft: 11
  },
  text: {
    fontFamily: 'Comfortaa_600SemiBold',
    fontSize: 10,
    color: 'grey'
  }
});
