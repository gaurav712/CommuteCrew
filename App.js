import React from 'react';

import SearchScreen from './screens/Home/SearchScreen';
import PublishScreen from './screens/Home/PublishScreen';
import YourRidesScreen from './screens/Home/YourRidesScreen';
import ProfileScreen from './screens/Home/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Auth/Login';
import {SafeAreaView, StatusBar} from 'react-native';

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
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
  );
};

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="AuthStack"
            component={AuthNavigator}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="HomeStack"
            component={HomeNavigator}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
