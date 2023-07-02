// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import SecondPage from './SecondPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} options={{headerShown: false}} />
        <Stack.Screen name="Second" component={SecondPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
