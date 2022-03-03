import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/home';
import Edit from './src/screens/edit';

const Stack = createStackNavigator();


export default function Container() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="home" 
          component={Home} 
          options={{
            headerShown: false, 
            title: 'Todo List' 
          }}

        />
        <Stack.Screen 
          name="edit" 
          component={Edit} 
          options={{ 
            title: 'Edit Todo',            
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center'
          }}          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
