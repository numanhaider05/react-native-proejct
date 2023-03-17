//import liraries
import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import I from 'react-native-vector-icons/FontAwesome';

import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../pages/auth/login';
import Signup from '../../pages/auth/signup';
import SelectProfession from '../../pages/auth/profession';
import AthleteInfo from '../../pages/auth/athleteInfo';
import SelectSport from '../../pages/auth/selectSport';
import SelectedSports from '../../pages/auth/selectSport/selectedSport';
import AdditionalSports from '../../pages/auth/selectSport/additionalSport';
import AdditionalSportsSelected from '../../pages/auth/selectSport/additionalSportsSelected';
import Guardian from '../../pages/auth/guardian';
import Welcome from '../../pages/onboarding/welcome';
import GetDiscovered from '../../pages/onboarding/getdiscovered';
import Verify from '../../pages/auth/verify';
import ForgetPassword from '../../pages/auth/forgetPassword';
import ForgetVerify from '../../pages/auth/forgetPassword/ForgetVerify';

import HomeTabNavigator from '../home/home.routes';

const Stack = createStackNavigator();
// create a component
const AuthStack = () => {
  return (
    <>
      <StatusBar translucent barStyle="dark-content" backgroundColor={'white'} />
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SelectProfession"
          component={SelectProfession}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AthleteInfo"
          component={AthleteInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SelectSport"
          component={SelectSport}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SelectedSports"
          component={SelectedSports}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdditionalSports"
          component={AdditionalSports}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdditionalSportsSelected"
          component={AdditionalSportsSelected}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Guardian"
          component={Guardian}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgetVerify"
          component={ForgetVerify}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Verify"
          component={Verify}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GetDiscovered"
          component={GetDiscovered}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
