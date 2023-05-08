/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import SearchScreen from './screens/SearchScreen';
import PublishScreen from './screens/PublishScreen';
import YourRidesScreen from './screens/YourRidesScreen';
import ProfileScreen from './screens/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Search') {
              iconName = focused ? 'search-outline' : 'search-outline';
            } else if (route.name === 'Publish') {
              iconName = focused ? 'add-circle-outline' : 'add-circle-outline';
            } else if (route.name === 'Your ride') {
              iconName = focused ? 'car-sport-outline' : 'car-sport-outline';
            } else if (route.name === 'Profile') {
              iconName = focused
                ? 'person-circle-outline'
                : 'person-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00B0FF',
          tabBarInactiveTintColor: '#78909C',
          headerShown: false,
        })}>
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Publish" component={PublishScreen} />
        <Tab.Screen name="Your ride" component={YourRidesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
