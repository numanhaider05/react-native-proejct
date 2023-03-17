//import liraries
import React, { Component, useEffect } from 'react';
import { View, Alert, StyleSheet, Linking, DeviceEventEmitter } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './auth/auth.routes';
import HomeTabNavigator from './home/home.routes';
import { useSelector } from 'react-redux';
import { notificationListener, requestUserPermission } from '../shared/services/NotificationService';
import { navigationRef } from '../shared/services/nav.service';
import { CONSTANTS } from '../shared/utils/constants';

// create a component
const Routes = () => {
  const { user } = useSelector((state: any) => state.root.user);
  const linking = {
    prefixes: [CONSTANTS.DEEPLINK_URL],
    config: {
      screens: {
        HomeStack: {
          screens: {
            PostViewScreen: 'posting/:postId',
          }
        },
        SearchStack: {
          screens: {
            UserDetails: 'profile/:item'
          }
        }
      },
    },
  };
  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        onStateChange={() => {
          DeviceEventEmitter.emit('pause-video');
        }}
      >
        {user ?
          <HomeTabNavigator />
          :
          <AuthStack />
        }
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Routes;
