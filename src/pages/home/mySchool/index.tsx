import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, Text, View, Animated } from 'react-native';
import { STYLES } from './mySchool.style';
import I from 'react-native-vector-icons/AntDesign';
import Touch from '../../../shared/components/touch/touch';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Loader from '../../../shared/components/loader';
import { getMySchools } from '../../../shared/services/HomeService';
import { removeSchool } from '../../../shared/services/HomeService';
import { HP, THEME } from '../../../shared/exporter';
import { RootStateOrAny, useSelector } from 'react-redux';
import Header from '../../../shared/components/header/header';
import { useIsFocused } from '@react-navigation/native';
import helpers from '../../../shared/utils/helpers';

const MySchool = ({ navigation }: any) => {
  const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);

  const [values, setValues] = useState([])
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    getSchools()
  }, [isFocused]);

  const getSchools = () => {
    setLoading(true);
    let token = user.accessToken

    getMySchools(token)
      .then(res => {
        setValues(res.data.data)
      })
      .catch(err => {
        helpers.showToastSuccess(err.response.data.meta.message)
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRemove = (id: any, name: any) => {
    setLoading(true);

    let token = user.accessToken
    const params = id;

    removeSchool(params, token)
      .then(res => {
        setValues(res.data.data)
        helpers.showToastSuccess(name + ' Removed')
      })
      .catch(err => {
        helpers.showToastSuccess(err.response.data.meta.message)
        console.log(err.response.data)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Header navigation={navigation} />

      <Text style={STYLES.heading}>My Schools</Text>
      {loading ?
        <Loader />
        :
        <View style={{ flex: 1 }}>
          {values ?
            <>
              <FlatList
                style={{ height: HP(100) }}
                data={values}
                renderItem={({ item, index }) => <Swipeable
                  renderRightActions={(progress: any, dragX: any) => {
                    const scale = dragX.interpolate({
                      inputRange: [-100, 0],
                      outputRange: [1, 0],
                      extrapolate: 'clamp'
                    })
                    return (
                      <>
                        <Touch onPress={() => onRemove(item.id, item.name)} style={{ ...STYLES.swipePressable, backgroundColor: THEME.colors.error, }}>
                          <Animated.Image source={require('../../../assets/images/bin.png')} style={{ ...STYLES.swipeimage, transform: [{ scale }] }} />
                          <Animated.Text style={{ ...STYLES.swipeText, transform: [{ scale }] }}>Remove</Animated.Text>
                        </Touch>
                      </>
                    )
                  }}
                >
                  <Touch onPress={() => navigation.navigate('SchoolDetails', { item: item })} style={STYLES.cont} >
                    <Image source={{ uri: item.logoUrl }} style={STYLES.logo} />
                    <View>
                      <Text style={STYLES.name}>{item.name}</Text>
                      <Text style={STYLES.location}>{item.state}</Text>
                    </View>
                  </Touch>
                </Swipeable>}
              />
            </>
            :
            <View style={STYLES.recommendation}>
              <Text style={STYLES.recommendationText}>No schools</Text>
            </View>
          }
        </View>
      }
    </>
  );
};
export default MySchool;
