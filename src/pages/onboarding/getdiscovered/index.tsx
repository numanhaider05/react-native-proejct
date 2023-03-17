import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Touch from '../../../shared/components/touch/touch';
import { STYLES } from './getdiscovered.style';
import Swiper from 'react-native-swiper';
import { RFValue } from 'react-native-responsive-fontsize';
import I from 'react-native-vector-icons/FontAwesome';
import {
  onboarding1,
  onboarding2,
  onboarding3,
  onboarding4,
} from '../../../assets/images';
import { EditProfile, FindSchools, ReelOnboarding } from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { HP, WP } from '../../../shared/exporter';

import { useDispatch } from 'react-redux';
import { setUser } from '../../../shared/store/reducers/userReducer';

const GetDiscovered = ({ navigation, route }: any) => {

  const dispatch = useDispatch();

  const [userr, setUserr] = useState(route.params.user)
  const swiper = useRef(null);
  const [idxActive, setIdxActive] = useState(0);
  let pictures = [EditProfile, FindSchools, ReelOnboarding];
  let description = [
    {
      title: 'Get Discovered',
      description:
        'Upload highlights, engage with fellow athletes, and get discovered by coaches nationwide',
    },
    {
      title: 'Present Yourself',
      description:
        'Fully customize your profile and add important information to showcase your talent and stand out to coaches',
    },
    {
      title: 'Find Opportunities',
      description:
        'Learn about schools and their sport programs. Find out what they are looking for in a player and stay up to date with their latest accomplishments!',
    },
    {
      title: 'Coach Directory',
      description:
        'Recognize coaches by their yellow border around their profile. Set up a connection and have meaningful conversations about your future',
    },
    {
      title: "You're all set!",
      description: '',
    },
  ];
  const header = ['Edit my Profile', 'Find Schools', 'Discover and Engage'];
  const body = [
    'Having more information available in your profile increases your chances of beeing seen by a coach',
    'Browse schools nationwide and learn about their sports programms, team culture, and campus life.',
    'Post highlights to show your athletic abilities. Gain a following and get discovered by coaches!',
  ];

  const onPressPrev = () => {
    if (idxActive > 0) {
      swiper.current.scrollBy(-1);
    }
  };

  const onPressNext = () => {
    // const {idxActive} = this.state;
    // Probably best set as a constant somewhere vs a hardcoded 5
    if (idxActive < 5) {
      swiper.current.scrollBy(1);
    }
  };

  const onConfirm = () => {
    dispatch(setUser(userr));
  }
  const Card = ({ source, header, body }: any) => {
    return (
      <Touch onPress={() => onConfirm()} style={STYLES.cardContainer}>
        <View
          style={{
            flex: 1.7,
            height: HP(15),
          }}>
          <LinearGradient
            colors={['#6896DE', '#85B4E9', '#99CCEF']}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={source} />
          </LinearGradient>
        </View>
        <View
          style={{
            flex: 3,
            height: HP(15),
            backgroundColor: 'white',
            borderTopEndRadius: RFValue(10),
            borderBottomEndRadius: RFValue(10),
            elevation: 7,
            justifyContent: 'center',
            paddingLeft: WP(1)
          }}>
          <Text style={STYLES.cardHeader}>{header}</Text>
          <Text style={STYLES.cardBody}>{body}</Text>
        </View>
      </Touch>
    );
  };
  return (
    <View style={STYLES.container}>
      <View style={STYLES.skipStyle}>

        <Touch onPress={() => navigation.navigate('Guardian', { user: user })}>
          <Text style={STYLES.headerSubText}>{idxActive === 4 ? ' ' : 'Skip'}</Text>
        </Touch>
      </View>
      <View style={STYLES.subHeader}>
        <Text style={STYLES.getDiscovered}>{description[idxActive].title}</Text>
      </View>
      <View style={STYLES.swiperContainer}>
        <Swiper
          showsButtons={false}
          ref={swiper}
          loop={false}
          dot={
            <View
              style={{
                backgroundColor: '#d5d5d5',
                width: 10,
                height: 10,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: -HP(3)
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#2E5D94',
                width: 10,
                height: 10,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: -HP(3)
              }}
            />
          }

          onIndexChanged={idx => setIdxActive(idx)}
          paginationStyle={STYLES.paginationStyle}>
          <View style={STYLES.slide}>
            <Image source={onboarding1} style={STYLES.imageStyles} />
            <View style={STYLES.descriptionHeader}>
              <Text style={STYLES.description}>
                {description[idxActive].description}
              </Text>
            </View>
          </View>
          <View style={STYLES.slide}>
            <Image source={onboarding2} style={STYLES.imageStyles} />
            <View style={STYLES.descriptionHeader}>
              <Text style={STYLES.description}>
                {description[idxActive].description}
              </Text>
            </View>
          </View>
          <View style={STYLES.slide}>
            <Image source={onboarding3} style={STYLES.imageStyles} />
            <View style={STYLES.descriptionHeader}>
              <Text style={STYLES.description}>
                {description[idxActive].description}
              </Text>
            </View>
          </View>
          <View style={STYLES.slide}>
            <Image source={onboarding4} style={STYLES.imageStyles} />
            <View style={STYLES.descriptionHeader}>
              <Text style={STYLES.description}>
                {description[idxActive].description}
              </Text>
            </View>
          </View>
          <View style={STYLES.slide}>
            {header.map((item, index) => {
              return (
                <Card
                  source={pictures[index]}
                  header={header[index]}
                  body={body[index]}
                />
              );
            })}
          </View>
        </Swiper>
      </View>


      <View style={STYLES.navigationContainer}>
        {idxActive === 0 ? null : (
          <Touch
            onPress={() => {
              onPressPrev();
            }}>
            <View style={STYLES.angleLeft}>
              <I name="angle-left" color="white" size={20} />
            </View>
          </Touch>
        )}

        <View style={STYLES.angleRightContainer}>
          {idxActive === 4 ? null : (
            <Touch
              onPress={() => {
                onPressNext();
              }}>
              <View style={STYLES.angleRight}>
                <I name="angle-right" color="white" size={20} />
              </View>
            </Touch>
          )}
        </View>
      </View>
    </View>
  );
};
export default GetDiscovered;
