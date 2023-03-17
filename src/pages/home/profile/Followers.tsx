import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  View,
  Animated,
} from 'react-native';
import {STYLES} from './profile.style';
import I from 'react-native-vector-icons/MaterialIcons';
import Touch from '../../../shared/components/touch/touch';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Loader from '../../../shared/components/loader';
import {
  getUserFollowers,
  getUserFollowersById,
} from '../../../shared/services/HomeService';
import {HP, THEME, WP} from '../../../shared/exporter';
import {RootStateOrAny, useSelector} from 'react-redux';
import Header from '../../../shared/components/header/header';
import helpers from '../../../shared/utils/helpers';

const MySchool = ({navigation, route}: any) => {
  const {user, authToken} = useSelector(
    (state: RootStateOrAny) => state.root.user,
  );

  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(route.params.userDetails);
  const [origin, setOrigin] = useState(route.params.origin);

  useEffect(() => {
    // console.log(userDetails)
    // console.log(user)
    origin === 'publicUser' ? getFollowersId() : getFollowers();
  }, []);
  //   console.log(values);
  const getFollowers = () => {
    setLoading(true);
    let token = user.accessToken;

    getUserFollowers(token)
      .then(res => {
        setValues(res.data.data);
      })
      .catch(err => {
        helpers.showToastFail(err.response.data.meta.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getFollowersId = () => {
    setLoading(true);
    let id = userDetails.id;

    getUserFollowersById(id)
      .then(res => {
        setValues(res.data.data);
      })
      .catch(err => {
        helpers.showToastFail(err.response.data.meta.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [search, setSearch] = useState('');

  return (
    <>
      {/* <Header /> */}
      <Touch onPress={() => navigation.goBack()} style={STYLES.back}>
        <I name={'arrow-back-ios'} size={HP(2.5)} />
      </Touch>
      <Text style={STYLES.heading}>Followers</Text>

      {/* <View style={STYLES.textFieldContainer}>
                <Image source={require('../../../assets/images/searchInput.png')} style={STYLES.searchIcon} />
                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder={'Search Followers'}
                    placeholderTextColor={THEME.colors.placeHolderDark}
                    style={STYLES.textField}
                    blurOnSubmit={true}
                />
            </View> */}
      {loading ? (
        <Loader />
      ) : values === [] ? (
        <View style={STYLES.recommendation}>
          <Text style={STYLES.recommendationText}>
            You Don't Have any Followers yet. Follow others to see their posts.
          </Text>
        </View>
      ) : (
        <View style={{marginTop: WP(6)}}>
          <FlatList
            data={values}
            renderItem={({item, index}) => (
              <Swipeable
              // renderRightActions={(progress: any, dragX: any) => {
              //     const scale = dragX.interpolate({
              //         inputRange: [-100, 0],
              //         outputRange: [1, 0],
              //         extrapolate: 'clamp'
              //     })
              //     return (
              //         <>
              //             <Touch onPress={() => { }} style={{ ...STYLES.swipePressable, backgroundColor: THEME.colors.primary, }}>
              //                 <Animated.Image source={require('../../../assets/images/bin.png')} style={{ ...STYLES.swipeimage, transform: [{ scale }] }} />
              //                 <Animated.Text style={{ ...STYLES.swipeText, transform: [{ scale }] }}>UnFollow</Animated.Text>
              //             </Touch>
              //         </>
              //     )
              // }}
              >
                <Touch
                  onPress={() =>
                    navigation.navigate('UserDetails', {item: item.id})
                  }
                  style={STYLES.cont}>
                  <Image
                    source={
                      item.pictureUrl
                        ? {uri: item.pictureUrl}
                        : require('../../../assets/images/user.png')
                    }
                    style={STYLES.logo}
                  />
                  <View style={{width: WP(50)}}>
                    <Text style={STYLES.name}>{item.fullName}</Text>
                  </View>
                  <View
                    //  onPress={() => unFollow(item.id)}
                    style={{
                      // backgroundColor: 'orange',
                      padding: WP(1),
                      borderRadius: 5,
                    }}>
                    <Text> </Text>
                  </View>
                </Touch>
              </Swipeable>
            )}
          />
        </View>
      )}
    </>
  );
};
export default MySchool;
