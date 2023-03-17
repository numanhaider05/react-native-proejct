import React, {useEffect, useState} from 'react';
import {Image, Platform, Text, View} from 'react-native';
import {STYLES} from './sportCard.style';
import Touch from '../touch/touch';

const Card = ({item, index, navigation, location, schoolitem}: any) => {
  return (
    <>
      {navigation ? (
        location === 'teammates' ? (
          <Touch
            onPress={() => {
              navigation.navigate('TeammatesList', {sport: item});
            }}
            style={[
              STYLES.cardSubContainer,
              Platform.OS === 'ios' ? STYLES.iosShadow : STYLES.androidShadow,
            ]}
            key={index}>
            <Image source={{uri: item.logoUrl}} style={STYLES.imageStyle} />
            <View style={STYLES.footerText}>
              <Text style={STYLES.footerTextStyle}>{item.name}</Text>
            </View>
          </Touch>
        ) : location ? (
          <Touch
            onPress={() => {
              navigation.navigate(location);
            }}
            style={[
              STYLES.cardSubContainer,
              Platform.OS === 'ios' ? STYLES.iosShadow : STYLES.androidShadow,
            ]}
            key={index}>
            <Image source={{uri: item.logoUrl}} style={STYLES.imageStyle} />
            <View style={STYLES.footerText}>
              <Text style={STYLES.footerTextStyle}>{item.name}</Text>
            </View>
          </Touch>
        ) : (
          <Touch
            onPress={() => {
              navigation.navigate('SchoolSports', {
                item: schoolitem,
                sport: item,
              });
            }}
            style={[
              STYLES.cardSubContainer,
              Platform.OS === 'ios' ? STYLES.iosShadow : STYLES.androidShadow,
            ]}
            key={index}>
            <Image source={{uri: item.logoUrl}} style={STYLES.imageStyle} />
            <View style={STYLES.footerText}>
              <Text style={STYLES.footerTextStyle}>{item.name}</Text>
            </View>
          </Touch>
        )
      ) : (
        <View
          style={[
            STYLES.cardSubContainer,
            Platform.OS === 'ios' ? STYLES.iosShadow : STYLES.androidShadow,
          ]}
          key={index}>
          <Image source={{uri: item.logoUrl}} style={STYLES.imageStyle} />
          <View style={STYLES.footerText}>
            <Text style={STYLES.footerTextStyle}>{item.name}</Text>
          </View>
        </View>
      )}
    </>
  );
};
export default Card;
