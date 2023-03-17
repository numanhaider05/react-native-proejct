import React from 'react';
import { ScrollView, Text, View, Image, Platform } from 'react-native';
import { STYLES } from './selectSport.style';
import HeaderLeft from '../../../shared/components/headerLeft';
import { RootStateOrAny, useSelector } from 'react-redux';

const Header = ({ navigation, name }: any) => {

  const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);

  return (
    <>
      <View style={STYLES.header}>
        <HeaderLeft navigation={navigation} />
      </View>
      <View style={STYLES.subHeader}>
        <Text style={STYLES.headerText}>Hi {user? user.firstName : name}!</Text>
        <Text style={STYLES.headerSubText}>
          Please select your <Text style={{ color: 'black' }}>main</Text> sport
        </Text>
      </View>
    </>
  );
};
export default Header;
