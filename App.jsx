import React from 'react';
import SearchScreen from './screens/Home/SearchScreen';
import YourRidesScreen from './screens/Home/YourRidesScreen';
import ProfileScreen from './screens/Home/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BaseAuth from './screens/Auth/BaseAuth';
import Login from './screens/Auth/Login';
import SignUp from './screens/Auth/SignUp';
import {StatusBar} from 'react-native';

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Plan') {
            iconName = 'route';
          } else if (route.name === 'History') {
            iconName = 'car';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00B0FF',
        tabBarInactiveTintColor: '#78909C',
        headerShown: false,
      })}>
      <Tab.Screen name="Plan" component={SearchScreen} />
      <Tab.Screen name="History" component={YourRidesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="BaseAuth"
        component={BaseAuth}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default function App() {
  return (
    <>
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
    </>
  );
}
