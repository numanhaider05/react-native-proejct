import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, Text, View, Animated } from 'react-native';
import I from 'react-native-vector-icons/FontAwesome';
import Touch from '../../../shared/components/touch/touch';
import { STYLES } from './messages.style';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME, WP, HP } from '../../../shared/exporter';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Loader from '../../../shared/components/loader';
import { getChatThreads } from '../../../shared/services/HomeService';
import { markMessageRead } from '../../../shared/services/HomeService';

import { RootStateOrAny, useSelector } from 'react-redux';
import HomeHeader from '../../../shared/components/header/homeheader';
import Header from '../../../shared/components/header/header';
import { useIsFocused } from '@react-navigation/native';
import helpers from '../../../shared/utils/helpers';
import { GenericNavigation } from '../../../shared/models/interface';

const Messages = ({ navigation }: GenericNavigation) => {
  const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);

  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllMessages()
  }, []);

  const getAllMessages = () => {
    setLoading(true);
    getChatThreads()
      .then(res => {
        setValues(res.data.data);
      })
      .catch(err => {
        helpers.showToastFail(err.response.data.meta.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const markRead = (item: any) => {
    markMessageRead(item.userId)
      .then(res => {
        item.hasRead = true;
      })
      .catch(err => {
        helpers.showToastFail(err.response.data.meta.message);
      })
      .finally(() => {
      });
    navigation.navigate('ChatScreen', { userDetails: item })
  };

  const onRemove = (id: any, name: any) => {
    // setLoading(true);
    // let token = user.accessToken
    // const params = id;
    // removeSchool(params, token)
    //   .then(res => {
    //     setValues(res.data.data)
    //     helpers.showToastSuccess(name + ' Removed')
    //   })
    //   .catch(err => {
    //     helpers.showToastSuccess(err.response.data.meta.message)
    //     console.log(err.response.data)
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  return (
    <>
      <Header navigation={navigation} />

      <Text style={STYLES.heading}>Messages</Text>

      {loading ? (
        <Loader />
      ) : (
        <View style={STYLES.recommendation}>
          <FlatList
            style={{ height: HP(100) }}
            data={values}
            ListEmptyComponent={() => {
              return (
                <View style={STYLES.noMsgWrap}>
                  <Text style={STYLES.noMsg}>No chats yet!</Text>
                </View>
              )
            }}
            keyExtractor={(item: any) => item}
            renderItem={({ item, index }) => (
              <Swipeable
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
                }}>
                <Touch onPress={() => markRead(item)} style={STYLES.cont} >
                  {item.pictureUrl ?
                    <Image source={{ uri: item.pictureUrl }} style={STYLES.logo} />
                    :
                    <Image source={require('../../../assets/images/user.png')} style={STYLES.logo} />
                  }
                  <View>
                    <Text style={STYLES.title}>{item.firstName}</Text>
                    <Text style={STYLES.text} numberOfLines={1}>{item.message}</Text>
                  </View>

                  {item.hasRead ?
                    <View />
                    :
                    < View style={{ height: WP(4), width: WP(4), backgroundColor: THEME.colors.primary, borderRadius: WP(4) / 2 }} />
                  }
                </Touch>
              </Swipeable>
            )}
          />
        </View>
      )}
    </>
  );
};
export default Messages;
