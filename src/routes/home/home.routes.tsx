//import liraries
import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, Image } from 'react-native';
import I from 'react-native-vector-icons/Feather';
import messaging from '@react-native-firebase/messaging';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ActivityPage from '../../pages/home/activityPage';
import Search from '../../pages/home/search';
import Messages from '../../pages/home/messages';
import MySchool from '../../pages/home/mySchool';
import Profile from '../../pages/home/profile';
import Followers from '../../pages/home/profile/Followers';
import Followings from '../../pages/home/profile/Followings';
import Teammates from '../../pages/home/profile/Teammates';
import TeammatesList from '../../pages/home/profile/TeammatesList';
import Schedules from '../../pages/home/schedules';
import PostViewScreen from '../../pages/home/activityPage/postViewScreen';

import Menu from '../../pages/home/menu';
import Settings from '../../pages/home/settings';
import ChangePassword from '../../pages/home/settings/ChangePassword';
import Help from '../../pages/home/settings/Help';
import Notifications from '../../pages/home/notifications';
import Connections from '../../pages/home/menu/Connections';
import MoreInfo from '../../pages/home/moreinfo';
import UserDetails from '../../pages/home/user';
import SearchUser from '../../pages/home/user/SearchUser';

import UserMoreInfo from '../../pages/home/search/UserMoreInfo';
import SchoolDetails from '../../pages/home/search/SchoolDetails';
import SchoolSports from '../../pages/home/search/SchoolSports';
import CoachDetails from '../../pages/home/search/CoachDetails';
import ChatScreen from '../../pages/home/chats/ChatScreen';

import GetDiscovered from '../../pages/onboarding/getdiscovered';
import Welcome from '../../pages/onboarding/welcome';
import AuthStack from '../auth/auth.routes';

import { HP, WP } from '../../shared/exporter';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// create a component
export const HomeTabNavigator = () => {
  return (
    <>
      {/* <StatusBar translucent barStyle="dark-content" /> */}

      <Tab.Navigator
        initialRouteName={'HomeStack'}
        tabBarOptions={{
          activeTintColor: '#043659',
          inactiveTintColor: '#043659',
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require('../../assets/images/homeIcon.png')}
                style={focused ? STYLES.tabBarIconSelected : STYLES.tabBarIcon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SearchStack"
          component={SearchStack}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require('../../assets/images/searchIcon.png')}
                style={focused ? STYLES.tabBarIconSelected : STYLES.tabBarIcon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MessagesStack"
          component={MessagesStack}
          options={{
            tabBarLabel: 'Messages',
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require('../../assets/images/messagesIcon.png')}
                style={
                  focused ? STYLES.tabBarIconSelected2 : STYLES.tabBarIcon2
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="SchoolStack"
          component={SchoolStack}
          options={{
            tabBarLabel: 'My School',
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require('../../assets/images/schoolIcon.png')}
                style={
                  focused ? STYLES.tabBarIconSelected2 : STYLES.tabBarIcon2
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require('../../assets/images/profileIcon.png')}
                style={focused ? STYLES.tabBarIconSelected : STYLES.tabBarIcon}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const HomeStack = () => {
  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'white'}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="ActivityPage"
          component={ActivityPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostViewScreen"
          component={PostViewScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Connections"
          component={Connections}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchUser"
          component={SearchUser}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MoreInfo"
          component={MoreInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserMoreInfo"
          component={UserMoreInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SchoolDetails"
          component={SchoolDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SchoolSports"
          component={SchoolSports}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CoachDetails"
          component={CoachDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
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
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Followers"
          component={Followers}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Followings"
          component={Followings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Schedules"
          component={Schedules}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const SearchStack = () => {
  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'white'}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Connections"
          component={Connections}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostViewScreen"
          component={PostViewScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MoreInfo"
          component={MoreInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserMoreInfo"
          component={UserMoreInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchUser"
          component={SearchUser}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SchoolDetails"
          component={SchoolDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SchoolSports"
          component={SchoolSports}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CoachDetails"
          component={CoachDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Followers"
          component={Followers}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Followings"
          component={Followings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Schedules"
          component={Schedules}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const MessagesStack = () => {
  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'white'}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostViewScreen"
          component={PostViewScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Connections"
          component={Connections}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchUser"
          component={SearchUser}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MoreInfo"
          component={MoreInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserMoreInfo"
          component={UserMoreInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SchoolDetails"
          component={SchoolDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SchoolSports"
          component={SchoolSports}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CoachDetails"
          component={CoachDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Followers"
          component={Followers}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Followings"
          component={Followings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Schedules"
          component={Schedules}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const SchoolStack = () => {
  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'white'}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="MySchool"
          component={MySchool}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostViewScreen"
          component={PostViewScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Connections"
          component={Connections}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchUser"
          component={SearchUser}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MoreInfo"
          component={MoreInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserMoreInfo"
          component={UserMoreInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SchoolDetails"
          component={SchoolDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SchoolSports"
          component={SchoolSports}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CoachDetails"
          component={CoachDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Followers"
          component={Followers}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Followings"
          component={Followings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Schedules"
          component={Schedules}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const ProfileStack = () => {
  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'white'}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostViewScreen"
          component={PostViewScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Connections"
          component={Connections}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchUser"
          component={SearchUser}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MoreInfo"
          component={MoreInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserMoreInfo"
          component={UserMoreInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SchoolDetails"
          component={SchoolDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SchoolSports"
          component={SchoolSports}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CoachDetails"
          component={CoachDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Followers"
          component={Followers}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Followings"
          component={Followings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Teammates"
          component={Teammates}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TeammatesList"
          component={TeammatesList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Schedules"
          component={Schedules}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const STYLES = StyleSheet.create({
  tabBarIcon: {
    height: HP(3),
    width: HP(3),
    tintColor: '#5a7c93',
    resizeMode: 'contain',
  },
  tabBarIconSelected: {
    height: HP(3),
    width: HP(3),
    tintColor: '#043659',
    resizeMode: 'contain',
  },

  tabBarIcon2: {
    height: HP(3.7),
    width: HP(3.7),
    tintColor: '#5a7c93',
  },
  tabBarIconSelected2: {
    height: HP(3.5),
    width: HP(3.5),
    tintColor: '#043659',
  },
});

export default HomeTabNavigator;
