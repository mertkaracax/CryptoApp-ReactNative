import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './pages/Home';
import MainScreen from './pages/Main';
import Orders from './pages/Orders';
import Statistics from './pages/Statistics';
import BuySell from './pages/BuySell';
import {LogBox} from 'react-native';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          initialRouteName: 'Home',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen name="BuySell" component={BuySell} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
