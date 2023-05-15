import React, {useEffect, useState} from 'react';
import SearchScreen from './screens/Home/PlanJourney/SearchScreen';
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
import MapScreen from './screens/Home/PlanJourney/MapScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NavigationContext from './contexts/NavigationContext';
import UserContext from './contexts/UserContext';
import RNBootSplash from 'react-native-bootsplash';

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const PlanJourneyStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const PlanStack = () => {
  return (
    <PlanJourneyStack.Navigator>
      <PlanJourneyStack.Screen
        name="Plan"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <PlanJourneyStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{headerShown: false}}
      />
    </PlanJourneyStack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Plan Journey') {
            iconName = 'route';
          } else if (route.name === 'My Rides') {
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
      <Tab.Screen name="Plan Journey" component={PlanStack} />
      <Tab.Screen name="My Rides" component={YourRidesScreen} />
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
  const [navigationData, setNavigationData] = useState({
    loading: false,
    userType: '',
    rider: {
      source: '',
      destination: '',
    },
    owner: {
      source: '',
      destination: '',
    },
  });

  const [userData, setUserData] = useState({
    usrToken: '',
    contactNumber: 0,
    userName: '',
    license: '',
    deviceId: '',
  });

  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <NavigationContext.Provider value={{navigationData, setNavigationData}}>
        <UserContext.Provider value={{userData, setUserData}}>
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
        </UserContext.Provider>
      </NavigationContext.Provider>
    </GestureHandlerRootView>
  );
}
