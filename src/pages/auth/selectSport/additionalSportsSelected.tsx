import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, Image, Platform} from 'react-native';
import Wrapper from '../../../shared/components/wrapper/wrapper';

import {STYLES} from './selectSport.style';
import {RFValue} from 'react-native-responsive-fontsize';
import {getSports} from '../../../shared/services/sport.service';
import Card from '../../../shared/components/sportCard';
import Touch from '../../../shared/components/touch/touch';
import AdditionalSportsHeader from './additionalSportHeader';
const AdditionalSportsSelected = ({route, navigation}: any) => {
  const {sports} = route.params;
  return (
    <Wrapper>
      <ScrollView>
        <AdditionalSportsHeader navigation={navigation} />
        <View style={{marginTop: RFValue(5)}}>
          <View style={STYLES.cardContainer}>
            {sports.length > 0 &&
              sports.map((item, index) => {
                return (
                  <Touch
                    onPress={() => navigation.navigate('Guardian')}
                    key={index}>
                    <Card item={item} index={index} />
                  </Touch>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};
export default AdditionalSportsSelected;
