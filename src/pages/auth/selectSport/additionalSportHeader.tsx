import React from 'react';
import { STYLES } from './selectSport.style';
import { ScrollView, Text, View, Image, Platform } from 'react-native';
import HeaderLeft from '../../../shared/components/headerLeft';
import Touch from '../../../shared/components/touch/touch';

const AdditionalSportsHeader = ({ navigation, params }: any) => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={STYLES.header}>
          <HeaderLeft navigation={navigation} />
        </View>
        <View style={STYLES.skipStyle}>
          <Touch onPress={() => navigation.navigate('Guardian', { params: params })}>
            <Text style={STYLES.headerSubText}>Skip</Text>
          </Touch>
        </View>
      </View>
      <View style={STYLES.subHeader}>
        <Text style={STYLES.headerText}>Additional sports</Text>
        <Text style={STYLES.headerSubText}>
          Please select other sports you play
        </Text>
      </View>
    </>
  );
};
export default AdditionalSportsHeader;
