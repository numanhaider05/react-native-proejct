import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, Text, View, Modal } from 'react-native';
import I from 'react-native-vector-icons/SimpleLineIcons';
import F from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Touch from '../../../shared/components/touch/touch';
import { STYLES } from './notify.style';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME, WP, HP } from '../../../shared/exporter';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Loader from '../../../shared/components/loader';
import {
  acceptFollow,
  getNotifications,
  rejectFollow,
} from '../../../shared/services/HomeService';
import { markNotificationRead } from '../../../shared/services/HomeService';

import { RootStateOrAny, useSelector } from 'react-redux';
import HomeHeader from '../../../shared/components/header/homeheader';
import Header from '../../../shared/components/header/header';
import { useIsFocused } from '@react-navigation/native';
import helpers, { CustomSpinner } from '../../../shared/utils/helpers';
import LinearGradient from 'react-native-linear-gradient';

const Notifications = ({ navigation }: any) => {
  const { user, authToken } = useSelector(
    (state: RootStateOrAny) => state.root.user,
  );

  const [values, setValues] = useState<any[]>([])
  const [loading, setLoading] = useState({
    listing: false,
    action: false
  });
  const [showModal, setSHowModal] = useState(false);
  const [notifcationUnderReview, setNotifcationUnderReview] = useState<any>(null);

  useEffect(() => {
    getAllNotifications();
  }, []);

  const getAllNotifications = () => {
    setLoading({
      ...loading,
      action: true
    });
    let params = {
      offset: 0,
      limit: 30
    }

    getNotifications(params)
      .then(res => {
        setValues(res.data.data.notifications);
      })
      .catch(err => {
        helpers.showToastFail(err.response.data.meta.message);
      })
      .finally(() => {
        setLoading({
          ...loading,
          action: false
        });
      });
  };

  const accept = () => {
    if (notifcationUnderReview) {
      setLoading({
        ...loading,
        action: true
      });
      acceptFollow(notifcationUnderReview.data.followerId)
        .then(res => {
          markAsRead(notifcationUnderReview.id);
          helpers.showToastSuccess('Follow request accepted');
          setNotifcationUnderReview(null);
          setSHowModal(false);
        })
        .catch(err => {
          helpers.showToastFail(err.response.data.meta.message)
          console.log(err.response.data.meta.message)
        })
        .finally(() => {
          setLoading({
            ...loading,
            action: false
          });

        });
    }
  };


  const reject = () => {
    if (notifcationUnderReview) {
      setLoading({
        ...loading,
        action: true
      });
      rejectFollow(notifcationUnderReview.data.followerId)
        .then(res => {
          markAsRead(notifcationUnderReview.id);
          helpers.showToastSuccess('Follow request rejected');
          setNotifcationUnderReview(null);
          setSHowModal(false);
        })
        .catch(err => {
          helpers.showToastFail(err.response.data.meta.message);
        })
        .finally(() => {
          setLoading({
            ...loading,
            action: false
          });
        });
    }
  };

  const onItemClick = (item: any) => {
    if (item.type === 'following')
      navigation.navigate('UserDetails', { item: item.userId });
    else if (item.type === 'commentPosting') {
      markAsRead(item.id);
      navigation.navigate('PostViewScreen', { postId: item.data.postingId, comment: true });
    } else if (item.type === 'likePosting') {
      markAsRead(item.id);
      navigation.navigate('PostViewScreen', { postId: item.data.postingId, comment: false });
    } else if (item.type === 'followRequest') {
      if (!item.hasRead) {
        setSHowModal(true);
        setNotifcationUnderReview(item);
      }
    }
  };

  const markAsRead = (id: any) => {
    for (let val of values) {
      if (val.id == id)
        val.hasRead = true;
    }
    setValues(values);
    markNotificationRead(id)
      .then(res => { }).catch(err => { });
  }

  return (
    <>
      <Header navigation={navigation} />

      <View style={STYLES.backCont}>
        <Touch onPress={() => navigation.goBack()}>
          <MaterialIcons name={'arrow-back-ios'} size={HP(2.8)} />
        </Touch>
        <Text style={STYLES.heading}>Notifications</Text>
      </View>

      {
        loading.listing ?
          <Loader />
          :
          <View style={STYLES.recommendation}>
            <FlatList
              style={{ height: HP(100) }}
              data={values}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item, index }: any) => <>
                <Swipeable
                // renderRightActions={(progress: any, dragX: any) => {
                //   const scale = dragX.interpolate({
                //     inputRange: [-100, 0],
                //     outputRange: [1, 0],
                //     extrapolate: 'clamp'
                //   })
                //   return (
                //     <>
                //       <Touch onPress={() => onRemove(item.id, item.name)} style={{ ...STYLES.swipePressable, backgroundColor: THEME.colors.error, }}>
                //         <Animated.Image source={require('../../../assets/images/bin.png')} style={{ ...STYLES.swipeimage, transform: [{ scale }] }} />
                //         <Animated.Text style={{ ...STYLES.swipeText, transform: [{ scale }] }}>Remove</Animated.Text>
                //       </Touch>
                //     </>
                //   )
                // }}
                >
                  <Touch onPress={() => onItemClick(item)} style={STYLES.cont} >
                    {item.pictureUrl ?
                      <Image source={{ uri: item.pictureUrl }} style={STYLES.logo} />
                      :
                      <Image source={require('../../../assets/images/user.png')} style={STYLES.logo} />
                    }
                    <View>
                      <Text numberOfLines={2} style={STYLES.title}>{item.title}</Text>
                      {/* <Text style={STYLES.text} numberOfLines={1}>{item.body}</Text> */}
                    </View>

                    {item.hasRead ?
                      <View />
                      :
                      < View style={{ height: WP(4), width: WP(4), marginLeft: WP(4), backgroundColor: THEME.colors.primary, borderRadius: WP(4) / 2 }} />
                    }
                  </Touch>
                </Swipeable>
              </>
              }
            />
          </View>
      }
      <CustomSpinner
        visible={loading.action} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setSHowModal(false);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{
          height: WP(50), width: WP(100), backgroundColor: 'white', bottom: 0, position: 'absolute',
          alignItems: 'center',

          borderRadius: 30,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
          <Touch style={{ position: 'absolute', top: WP(4), right: WP(5) }} onPress={() => {
            setNotifcationUnderReview(null);
            setSHowModal(false)
          }}>
            <I name={'close'} size={WP(7)} />
          </Touch>
          <Text style={{ fontSize: HP(2), marginTop: WP(5), marginBottom: WP(5), fontWeight: 'bold' }}>Follow Request</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <Touch onPress={accept}>
              <LinearGradient
                colors={['#5a93e4', '#92d3f7']}
                style={{ ...STYLES.gradient }}>
                <Text style={STYLES.moreInfo}>Accept</Text>
              </LinearGradient>
            </Touch>

            <Touch onPress={reject}>
              <LinearGradient
                colors={['#5a93e4', '#92d3f7']}
                style={{ ...STYLES.gradient }}>
                <View style={{
                  backgroundColor: 'white',
                  height: HP(4.5),
                  width: WP(28),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: HP(0.7)
                }}>
                  <Text style={{ ...STYLES.moreInfo, color: THEME.colors.gray }}>Reject</Text>
                </View>
              </LinearGradient>
            </Touch>
          </View>
        </View>
      </Modal>

    </>
  );
};
export default Notifications;
