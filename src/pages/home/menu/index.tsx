import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import I2 from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Fontisto';
import F from 'react-native-vector-icons/FontAwesome';
import {useIsFocused} from '@react-navigation/native';
import OpenFile from 'react-native-doc-viewer';
import {STYLES} from './menu';
import {HP, THEME, WP} from '../../../shared/exporter';
import Touch from '../../../shared/components/touch/touch';
import {useDispatch} from 'react-redux';
import {signOut} from '../../../shared/store/reducers/userReducer';
import Loader from '../../../shared/components/loader';
import {RootStateOrAny, useSelector} from 'react-redux';
import {CONSTANTS} from '../../../shared/utils/constants';
import FastImage from 'react-native-fast-image';
import {ROLES} from '../../../shared/models/enums';
import {getUserDetails} from '../../../shared/services/HomeService';
// var RNFS = require('react-native-fs');
// var SavePath = Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;

const Menu = ({navigation}: any) => {
  const {user, authToken} = useSelector(
    (state: RootStateOrAny) => state.root.user,
  );
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState('');
  const [donebuttonclicked, setDonebuttonclicked] = useState(false);
  const [userDetails, setUserDetails] = useState<any>([]);
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  useEffect(() => {
    userDetail();
  }, [isFocused]);

  const userDetail = () => {
    setLoading(true);
    getUserDetails()
      .then(res => {
        setUserDetails(res.data.data);
      })
      .catch(err => {
        Alert.alert(err.response.data.meta.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSignOut = () => {
    setLoading(true);
    try {
      dispatch(signOut(null));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePress = () => {
    setAnimating(true);
    OpenFile.openDoc(
      [
        {
          url: `${CONSTANTS.DOC_BASE_PATH}Resource_Tab_Information_.docx`,
          fileNameOptional: 'test filename',
        },
      ],
      (error: any, url: any) => {
        if (error) {
          setAnimating(false);
        } else {
          setAnimating(false);
          // console.log(url)
        }
      },
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={STYLES.scrollView}>
          <Touch onPress={() => navigation.goBack()} style={STYLES.close}>
            <Icon name={'close-a'} size={HP(3)} />
          </Touch>

          <View style={STYLES.profile}>
            <View>
              {user.pictureUrl ? (
                <FastImage
                  resizeMode={'cover'}
                  source={{
                    uri:
                      userDetails.pictureUrl != ''
                        ? userDetails.pictureUrl
                        : '',
                  }}
                  style={{
                    ...STYLES.profileImage,
                    borderColor:
                      user.roleId === ROLES.COACH
                        ? THEME.colors.gold
                        : THEME.colors.blck,
                  }}>
                  {loading && (
                    <ActivityIndicator color={THEME.colors.primary} />
                  )}
                </FastImage>
              ) : (
                <View
                  style={{
                    ...STYLES.profileImage,
                    borderColor:
                      user.roleId === ROLES.COACH
                        ? THEME.colors.gold
                        : THEME.colors.blck,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <F
                    name={'user'}
                    style={{
                      color:
                        user.roleId === ROLES.COACH
                          ? THEME.colors.gold
                          : THEME.colors.blck,
                      fontSize: WP(22),
                    }}
                  />
                </View>
              )}
            </View>
            <Text style={STYLES.textName}>{user.firstName}</Text>
          </View>

          <Touch
            onPress={() => navigation.navigate('Schedules')}
            style={STYLES.calendar}>
            <I2 name={'calendar'} size={HP(8)} style={STYLES.calendarIcon} />
            <Text style={STYLES.textCalendar}>My Schedule</Text>
          </Touch>
          <View style={{marginTop: HP(2)}}>
            <Touch
              onPress={() => {
                handlePress();
              }}
              style={STYLES.btn}>
              <Text style={STYLES.btnStyle}>Resources</Text>
            </Touch>

            <Touch
              onPress={() => navigation.navigate('Search')}
              style={STYLES.btn}>
              <Text style={STYLES.btnStyle}>Connect with Coaches</Text>
            </Touch>

            <Touch
              onPress={() => navigation.navigate('SearchUser')}
              style={STYLES.btn}>
              <Text style={STYLES.btnStyle}>Search User</Text>
            </Touch>

            {/* <Touch style={STYLES.btn}>
            <Text style={STYLES.btnStyle}>My Progress</Text>
          </Touch> */}

            <Touch
              onPress={() => navigation.navigate('Connections')}
              style={STYLES.btn}>
              <Text style={STYLES.btnStyle}>
                {user.roleId === 2 ? 'Connections' : 'Prospects'}
              </Text>
            </Touch>

            {/* <Touch style={STYLES.btn}>
            <Text style={STYLES.btnStyle}>View Ranking</Text>
          </Touch> */}
          </View>

          <View style={STYLES.bottomBtns}>
            <Touch
              onPress={() => navigation.navigate('Settings')}
              style={STYLES.bottomBtn}>
              <Text style={STYLES.bottomBtnText}>Settings</Text>
            </Touch>

            <Touch
              onPress={() => navigation.navigate('Help')}
              style={STYLES.bottomBtn}>
              <Text style={STYLES.bottomBtnText}>Help / FAQ</Text>
            </Touch>

            <Touch
              style={STYLES.bottomBtn}
              onPress={() => {
                onSignOut();
                // navigation.navigate('AuthStack')
              }}>
              <Text style={STYLES.bottomBtnText}>Sign Out</Text>
            </Touch>
          </View>
        </ScrollView>
      )}
    </>
  );
};
export default Menu;
