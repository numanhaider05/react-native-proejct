import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TextInput, FlatList, Text, View, Animated } from 'react-native';
import { STYLES } from './profile.style';
import I from 'react-native-vector-icons/MaterialIcons';
import Touch from '../../../shared/components/touch/touch';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Loader from '../../../shared/components/loader';
import { getUserFollowings, getUserFollowingsById } from '../../../shared/services/HomeService';
import { unFollowUser } from '../../../shared/services/HomeService';
import { HP, THEME, WP } from '../../../shared/exporter';
import { RootStateOrAny, useSelector } from 'react-redux';
import Header from '../../../shared/components/header/header';
import helpers from '../../../shared/utils/helpers';
import UserDetails from '../user';

const MySchool = ({ navigation, route }: any) => {
  const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);

  const [userDetails, setUserDetails] = useState(route.params.userDetails);
  const [values, setValues] = useState([])
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState(route.params.origin);

  useEffect(() => {
    origin === 'publicUser' ?
      getFollowingsId()
      :
      getFollowings()
  }, []);

  const getFollowings = () => {
    setLoading(true);
    let token = user.accessToken

    getUserFollowings(token)
      .then(res => {
        setValues(res.data.data)
      })
      .catch(err => {
        helpers.showToastFail(err.response.data.meta.message)
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getFollowingsId = () => {
    setLoading(true);
    let id = userDetails.id

    getUserFollowingsById(id)
      .then(res => {
        setValues(res.data.data)
      })
      .catch(err => {
        helpers.showToastFail(err.response.data.meta.message)
        console.log(err)
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
      <Text style={STYLES.heading}>Following</Text>
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
      {loading ?
        <Loader />
        :
        values !== [] ?
          <View style={{ marginTop: WP(6) }}>
            <>
              <FlatList
                data={values}
                renderItem={({ item, index }) => <Touch
                  onPress={() => navigation.navigate('UserDetails', { item: item.id })}
                  style={STYLES.cont} >
                  <Image source={item.pictureUrl ? { uri: item.pictureUrl } : require('../../../assets/images/user.png')} style={STYLES.logo} />
                  <View style={{ width: WP(50) }}>
                    <Text style={STYLES.name}>{item.fullName}</Text>
                  </View>
                  <View
                    //  onPress={() => unFollow(item.id)} 
                    style={{ backgroundColor: 'orange', padding: WP(1), borderRadius: 5 }}>
                    <Text>Following</Text>
                  </View>
                </Touch>
                }
              />
            </>
          </View>
          :
          <View style={STYLES.recommendation}>
            <Text style={STYLES.recommendationText}>No schools</Text>
          </View>
      }
    </>
  );
};
export default MySchool;
