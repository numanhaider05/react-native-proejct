import React, { useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { STYLES } from './profession.style';
import Wrapper from '../../../shared/components/wrapper/wrapper';
import { TennisScreen, FootballScreen, NxtGem } from '../../../assets/images';
import Carousel from 'react-native-snap-carousel';
import { Athlete, Coach } from '../../../assets/images';
import { RFValue } from 'react-native-responsive-fontsize';
import { BoxShadow } from 'react-native-shadow';
import HeaderLeft from '../../../shared/components/headerLeft';
import { GST } from '../../../shared/exporter';

const SelectProfession = ({ navigation, route }: any) => {

  const values = {
    name: route.params.email,
    password: route.params.password,
    confirm: route.params.confirm,
  }

  let data = [
    {
      image: Athlete,
      screen: 'AthleteInfo',
      name: 'ATHLETE',
      intro: 'I am an...',
      type: 'Athlete'
    },
    {
      image: Coach,
      screen: 'AthleteInfo',
      type: 'Coach',
      name: 'COACH',
      intro: 'I am a...',
    },
    {
      image: NxtGem,
      screen: 'AthleteInfo',
      type: 'Other',
      name: 'OTHER',
      intro: 'I am...',
    },
  ];

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = RFValue(220);
  const carouselRef = useRef<any>(null);
  const renderItem = ({ item, index }: any) => {
    const shadowOpt = {
      width: 250,
      height: RFValue(280),
      color: '#000',
      border: 8,
      radius: 20,
      opacity: 0.1,
      x: 2,
      y: 3,
      style: {
        marginVertical: 5,
      },
    };
    return (
      <>
        <View style={{ alignSelf: 'center' }}>
          <Text style={STYLES.choosePText}>{item.intro}</Text>
        </View>
        <View style={STYLES.carouselWrap}>
          <BoxShadow setting={shadowOpt}>
            <View style={STYLES.slideWrap}>
              <TouchableOpacity
                onPress={() => {
                  carouselRef.current.scrollToIndex(index);
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AthleteInfo', { type: item.type, values: values });
                  }}>
                  <View style={STYLES.imgWrap}>
                    <Image source={item.image} style={{ width: '100%' }} resizeMode={'contain'} />
                  </View>

                  <View style={STYLES.subtitle}>
                    <Text style={STYLES.subtitleStyles}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </BoxShadow>
        </View>
      </>
    );
  };
  return (
    <Wrapper style={GST.wrap}>
      <View style={STYLES.header}>
        <HeaderLeft navigation={navigation} />
        <Text style={STYLES.headerText}>Great!</Text>
        <Text style={STYLES.headerSubText}>Please select your role</Text>
      </View>
      <View
        style={{
          marginVertical: RFValue(40),
        }}>
        <Carousel
          data={data}
          renderItem={renderItem}
          itemWidth={itemWidth}
          sliderWidth={sliderWidth}
          ref={carouselRef}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text style={STYLES.swipeMore}>Swipe for more</Text>
      </View>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  carouselContainer: {
    height: 200,
  },
  carousel: {
    flex: 1,
  },
});
export default SelectProfession;
