import React, { useEffect, useState } from 'react';
import {
  Image,
  TextInput,
  Text,
  FlatList,
  View,
  Alert,
  Modal,
  YellowBox,
} from 'react-native';
import I from 'react-native-vector-icons/SimpleLineIcons';
import F from 'react-native-vector-icons/FontAwesome5';
import Touch from '../../../shared/components/touch/touch';
import { STYLES, STYLES2 } from './profile.style';
import HeaderBg from '../../../shared/components/header/headerBg';
import ProfileDetails from '../../../shared/components/profile/ProfileDetails';
import { HP, THEME, WP } from '../../../shared/exporter';
import LinearGradient from 'react-native-linear-gradient';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import FastImage from 'react-native-fast-image';
import * as ImagePicker from 'react-native-image-picker';
import { LogBox } from 'react-native';
import Loader from '../../../shared/components/loader';
import {
  getUserDetails,
  schoolFilters,
  searchSchools,
  updateUserProfile,
  upload,
  userPosts,
} from '../../../shared/services/HomeService';
import { updateUserInfo } from '../../../shared/services/HomeService';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import helpers, { CustomSpinner } from '../../../shared/utils/helpers';
import { ScrollView } from 'react-native-gesture-handler';
import { ROLES } from '../../../shared/models/enums';
import { UserInfo } from '../../../shared/models/interface';
import GalleryView from '../../../shared/components/gallery';
import { getSports } from '../../../shared/services/sport.service';
import Card from '../../../shared/components/sportCard';

const Profile = ({ navigation }: any) => {
  // console.disableYellowBox = true;
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const { user, fcmToken, authToken, ownStories } = useSelector(
    (state: RootStateOrAny) => state.root.user,
  );
  const [userDetails, setUserDetails] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const [aboutText, setAboutText] = useState('');
  const [selectedTab, setSelectedTab] = useState(1);
  const [about, setAbout] = useState(false);
  const [schoolEdit, setSchoolEdit] = useState(false);
  const [values, setValues] = useState([]);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalSportsVisible, setModalSportsVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [sports, setSports] = useState([]);
  const [selectedSportsId, setSelectedSportsId] = useState('');
  const [selectedSportsName, setSelectedSportsName] = useState('');
  const [bodySchool, setBodySchool] = useState({
    school: '',
    mainSportId: {
      id: selectedSportsId,
      name: selectedSportsName,
    },
    class: '',
  });
  const [valuesSports, setValuesSports] = useState({
    menActive: false,
    womenActive: false,
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    getSports((res: any) => {
      setSports(res.data);
      // console.log(res.data)
    });
  }, []);

  useEffect(() => {
    userDetail()
    getPosts()
  }, [isFocused]);

  const userDetail = () => {
    setLoading(true);
    getUserDetails()
      .then(res => {
        setUserDetails(res.data.data);
        setAboutText(res.data.data.bio);
        setBody({ ...body, bio: res.data.data.bio });

        setBodySchool({
          ...bodySchool,
          school:
            res.data.data?.school === '' ? 'No Info' : res.data.data?.school,
        });
        setBodySchool({
          ...bodySchool,
          class: res.data.data?.class === '' ? 'No Info' : res.data.data?.class,
        });

        setBodySchool({
          school:
            res.data.data?.school === '' ? 'No Info' : res.data.data?.school,
          mainSportId: {
            id: res.data.data.mainSport.id,
            name: res.data.data.mainSport.name,
          },
          class: res.data.data?.class === '' ? 'No Info' : res.data.data?.class,
        });
      })
      .catch(err => {
        Alert.alert(err.response.data.meta.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [body, setBody] = useState({
    bio: aboutText,
  });

  const save = () => {
    setLoading(true);
    updateUserProfile(user.id, body)
      .then(res => {
        helpers.showToastSuccess('User About Me Updated');
        if (res.data.data.success) {
        }
      })
      .catch(err => {
        helpers.showToastFail(err.response?.data?.meta?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    setLoading(true);
    userPosts(user.id)
      .then(res => {
        setPosts(res.data.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const imageGalleryLaunch = () => {
    let options: any = {
      storageOptions: {
        mediaType: 'photo',
        includeBase64: true,
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
      },
    };
    ImagePicker.launchImageLibrary(options, (res: any) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        Alert.alert(res.customButton);
      } else {
        let file = {
          uri: res.assets[0].uri,
          type: res.assets[0].type,
          name: res.assets[0].fileName,
        };
        uploadToServer(file);
      }
    });
  };

  const uploadToServer = async (file: any) => {
    const data = new FormData();
    data.append('type', 'logoKey');
    data.append('file', file);

    setLogoLoading(true);
    upload(data)
      .then(res => {
        if (res.data.meta.status) {
          let params = res.data.data.filekey;
          saveLogo(params, true);
        }
      })
      .catch(err => {
        console.log(err.response.data);
        helpers.showToastFail('Failed! to Upload Image.');
      });
  };

  const saveLogo = (key: any, status: any) => {
    let params = {
      isLogoUploaded: status,
      logoKey: key,
    };
    updateUserProfile(user.id, params)
      .then(res => {
        helpers.showToastSuccess('User School Logo Updated');
        setUserDetails({
          ...userDetails,
          logoUrl: res.data.data.logoUrl,
        });
      })
      .catch(err => {
        helpers.showToastFail(err.response?.data?.meta?.message);
        console.log(err.response?.data?.meta);
      })
      .finally(() => {
        setModalEditVisible(false);
        setLogoLoading(false);
      });
  };

  const saveSchool = () => {
    const params = {
      school: bodySchool.school,
      mainSportId: bodySchool.mainSportId.id,
      class: bodySchool.class,
    };
    if (bodySchool.class === '') {
      helpers.showToastSuccess('Please also Select Class');
    } else {

      updateUserProfile(user.id, params)
        .then(res => {
          helpers.showToastSuccess('User Info Updated');
        })
        .catch(err => {
          helpers.showToastFail(err.response?.data?.meta?.message);
          console.log(err.response?.data?.meta);
        })
        .finally(() => { });
    }
  };

  const setResults = () => {
    setLoading(true);
    const params = {
      searchText: search,
      division: '',
      state: '',
      conference: '',
    };
    searchSchools(params)
      .then(res => {
        setValues(res.data.data);
      })
      .catch(err => {
        console.log('errr=====', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setResults();
    console.log('bodySchool', bodySchool);
  }, [search]);

  return (
    <View style={STYLES.container}>
      <HeaderBg
        editable={true}
        navigation={navigation}
        cover={userDetails.coverUrl}
        updateUser={(url: string) => {
          setUserDetails({
            ...userDetails,
            coverUrl: url,
          });
        }}>
        <View style={STYLES.profileDet}>
          <ProfileDetails
            editable={true}
            navigation={navigation}
            stories={ownStories}
            userDetails={userDetails}
          />
        </View>
      </HeaderBg>

      <ScrollView>
        {userDetails ? (
          userDetails.roleId === ROLES.COACH ? (
            <View style={[STYLES.schoolContainerCoach]}>
              <View style={STYLES.schoolCont}>
                {/* {schoolEdit ? */}
                <TextInput
                  value={body.bio}
                  onChangeText={v => {
                    setBody({ ...body, bio: v });
                  }}
                  placeholder={'introduce yourself here'}
                  placeholderTextColor={THEME.colors.blck}
                  style={STYLES.schoolname}
                // editable={about}
                />
                {/* :
                  <View style={{ alignItems: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ ...STYLES2.title, marginRight: WP(1) }}>Coach<Text style={STYLES2.sportname}>{userDetails.school}</Text></Text>
                    </View>
                    <Text style={STYLES2.schoolnameCoach}>{userDetails?.college?.name ? userDetails?.college?.name : userDetails?.college}</Text>
                  </View>
                } */}
              </View>

              <View style={{ flexDirection: 'row', paddingRight: WP(5), }}>
                <View style={{ alignItems: 'flex-start' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...STYLES.schoolHead, fontWeight: 'bold', marginRight: WP(1) }}>Sport</Text>
                  </View>
                  <Text style={STYLES2.schoolnameCoach}>
                    {userDetails?.mainSport?.name
                      ? userDetails.mainSport.name
                      : 'No Info'}
                  </Text>
                </View>

                {
                  userDetails.logoUrl ? (
                    <Touch
                      onPress={() => {
                        setModalEditVisible(true);
                      }}>
                      <Image
                        source={{ uri: userDetails.logoUrl }}
                        style={{ ...STYLES.schoolLogo, marginLeft: WP(2) }}
                      />
                    </Touch>
                  ) : (
                    <Touch
                      onPress={() => {
                        setModalEditVisible(true);
                      }}
                      style={{
                        ...STYLES.schoolLogo,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <F name={'camera-retro'} size={WP(5)} />
                    </Touch>
                  )
                }
              </View>
              <Touch
                onPress={() => setSchoolEdit(!schoolEdit)}
                style={STYLES.penView}>
                <I name={'pencil'} size={HP(2)} />
              </Touch>
            </View>
          ) : (
            <View style={[STYLES.schoolContainer]}>
              <View style={STYLES.schoolCont}>
                <Text style={STYLES.schoolHead}>School</Text>
                <TextInput
                  value={bodySchool.school}
                  onChangeText={v => {
                    setBodySchool({ ...bodySchool, school: v });
                  }}
                  placeholder={'School'}
                  placeholderTextColor={THEME.colors.blck}
                  style={STYLES.schoolname}
                  editable={schoolEdit}
                  onEndEditing={() => saveSchool()}
                />
              </View>
              {userDetails.roleId != ROLES.OTHERS ? (
                <View style={STYLES.schoolCont}>
                  <Text style={STYLES.schoolHead}>Sport</Text>
                  <TextInput
                    value={selectedSportsName}
                    onChangeText={v => {
                      setBodySchool({ ...bodySchool, school: v });
                    }}
                    placeholder={'Sport'}
                    placeholderTextColor={THEME.colors.blck}
                    style={STYLES.schoolname}
                    editable={schoolEdit}
                    onPressIn={() => setModalSportsVisible(true)}
                  />
                </View>
              ) : // <View style={STYLES.schoolCont}>
                //   <Text style={STYLES.schoolHead}></Text>

                //   <Text style={STYLES.schoolname}>{bodySchool.mainSport ? bodySchool.mainSport.name : 'No main sport'}</Text>
                // </View>
                null}
              <View style={{ flexDirection: 'row', paddingRight: WP(3) }}>
                <View style={STYLES.schoolCont}>
                  <Text style={STYLES.schoolHead}>Class</Text>
                  <TextInput
                    value={bodySchool.class}
                    onChangeText={v => {
                      setBodySchool({ ...bodySchool, class: v });
                    }}
                    placeholder={'Class'}
                    placeholderTextColor={THEME.colors.blck}
                    style={STYLES.schoolname}
                    editable={schoolEdit}
                    onEndEditing={() => saveSchool()}
                  />
                </View>
                {/* <View style={STYLES.schoolCont}>
                  <Text style={STYLES.schoolHead}>Class</Text>
                  <Text style={STYLES.schoolname}>{bodySchool.class ? bodySchool.class : 'No Info'}</Text>
                </View> */}

                {userDetails.roleId != ROLES.OTHERS ? (
                  userDetails.logoUrl ? (
                    <Touch
                      onPress={() => {
                        setModalEditVisible(true);
                      }}>
                      <Image
                        source={{ uri: userDetails.logoUrl }}
                        style={{ ...STYLES.schoolLogo, marginLeft: WP(2) }}
                      />
                    </Touch>
                  ) : (
                    <Touch
                      onPress={() => {
                        setModalEditVisible(true);
                      }}
                      style={{
                        ...STYLES.schoolLogo,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <F name={'camera-retro'} size={WP(5)} />
                    </Touch>
                  )
                ) : null}
              </View>

              <Touch
                onPress={() => setSchoolEdit(!schoolEdit)}
                style={STYLES.penView}>
                <I name={'pencil'} size={HP(2)} />
              </Touch>
            </View>
          )
        ) : null}
        <View style={{ ...STYLES.about, borderWidth: about ? 0.3 : 0 }}>
          <View style={STYLES.aboutHeadCont}>
            <View style={STYLES.row}>
              <Text style={STYLES.aboutHead}>About Me</Text>
              <Touch onPress={() => setAbout(!about)}>
                <I name={'pencil'} style={STYLES.aboutPen} size={HP(2)} />
              </Touch>
            </View>
            {about && (
              <Touch
                onPress={() => {
                  setAbout(!about);
                  save();
                }}>
                <Text style={STYLES.aboutSave}>Save</Text>
              </Touch>
            )}
          </View>
          <TextInput
            multiline
            value={body.bio}
            onChangeText={v => {
              setBody({ ...body, bio: v });
            }}
            placeholder={'introduce yourself here'}
            placeholderTextColor={THEME.colors.blck}
            style={STYLES.aboutDesp}
            editable={about}
          />
        </View>

        {userDetails && userDetails.roleId === ROLES.PLAYER ? (
          <View style={STYLES.row}>
            <Touch
              onPress={() =>
                navigation.navigate('MoreInfo', { userDetails: userDetails })
              }>
              <LinearGradient
                colors={['#5a93e4', '#92d3f7']}
                style={{ ...STYLES.gradient }}>
                <Text style={STYLES.moreInfo}>MORE INFO</Text>
              </LinearGradient>
            </Touch>
          </View>
        ) : null}

        <View style={{ ...STYLES.row, justifyContent: 'center' }}>
          <View style={{ ...STYLES.options }}>
            <View style={{ ...STYLES.row, width: WP(7.5) }}>
              {userDetails.roleId === ROLES.COACH ||
                userDetails.roleId === ROLES.OTHERS ? (
                <Image
                  source={require('../../../assets/images/play.png')}
                  style={STYLES.schoolLogo}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/reel.png')}
                  style={STYLES.schoolLogo}
                />
              )}
              <I name={'pencil'} style={STYLES.infoPen} size={HP(2)} />
            </View>
            <Text style={STYLES.optionsHead}>
              {userDetails.roleId === ROLES.COACH ||
                userDetails.roleId === ROLES.OTHERS
                ? 'Clips'
                : 'Reel'}
            </Text>
          </View>
          <View style={STYLES.line} />
          <Touch
            onPress={() => navigation.navigate('Schedules')}
            style={{ ...STYLES.options }}>
            <View style={{ ...STYLES.row, width: WP(9) }}>
              <Image
                source={require('../../../assets/images/schedule.png')}
                style={STYLES.schoolLogo}
              />
              <I name={'pencil'} style={STYLES.infoPen} size={HP(2)} />
            </View>
            <Text style={STYLES.optionsHead}>Schedule</Text>
          </Touch>
          <View style={STYLES.line} />
          <Touch
            onPress={() => navigation.navigate('Teammates')}
            style={{ ...STYLES.options }}>
            <View style={{ ...STYLES.row, width: WP(9) }}>
              <Image
                source={require('../../../assets/images/teammates.png')}
                style={STYLES.schoolLogo}
              />
              <I name={'pencil'} style={STYLES.infoPen} size={HP(2)} />
            </View>
            <Text style={STYLES.optionsHead}>Teammates</Text>
          </Touch>
        </View>

        <View style={STYLES.tabs}>
          <Touch
            onPress={() => setSelectedTab(1)}
            style={selectedTab === 1 ? STYLES.selectedTab : STYLES.tab}>
            <Text style={STYLES.tabText}>Posts</Text>
          </Touch>
          <Touch
            onPress={() => setSelectedTab(2)}
            style={selectedTab === 2 ? STYLES.selectedTab : STYLES.tab}>
            <Text style={STYLES.tabText}>Tagged</Text>
          </Touch>
        </View>

        {selectedTab === 1 ? (
          <GalleryView
            canAdd={true}
            noPostsMsg={"You haven't posted anything yet"}
            posts={posts}
            navigation={navigation}
          />
        ) : (
          <View style={STYLES.wrapper}>
            <Text style={STYLES.bottomtxt}>You Don't have any Tags yet</Text>
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalEditVisible}
        onRequestClose={() => {
          setModalEditVisible(false);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: WP(110),
            width: WP(100),
            backgroundColor: 'white',
            bottom: 0,
            position: 'absolute',
            alignItems: 'center',

            borderRadius: 30,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <Touch
            style={{ position: 'absolute', top: WP(4), right: WP(5) }}
            onPress={() => setModalEditVisible(false)}>
            <I name={'close'} size={WP(7)} />
          </Touch>
          <Text
            style={{
              fontSize: HP(2),
              marginTop: WP(5),
              marginBottom: WP(5),
              fontWeight: 'bold',
            }}>
            Add logo for School
          </Text>
          <Touch
            onPress={() => {
              imageGalleryLaunch();
            }}>
            <F name={'camera-retro'} size={WP(6)} />
          </Touch>
          <View style={STYLES.textFieldContainer}>
            <Image
              source={require('../../../assets/images/searchInput.png')}
              style={STYLES.searchIcon}
            />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder={'What are you looking for?'}
              placeholderTextColor={THEME.colors.placeHolderDark}
              style={STYLES.textField}
              blurOnSubmit={true}
            />
          </View>
          <FlatList
            keyExtractor={(item: any) => item.id}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            data={values}
            renderItem={({ item, index }: any) => {
              return (
                <Touch
                  key={index}
                  style={{
                    width: WP(22),
                    height: WP(20),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    saveLogo(item.logoKey, false);
                  }}>
                  <Image
                    source={{ uri: item.logoUrl }}
                    style={STYLES.logoSchool}
                  />
                </Touch>
              );
            }}
          />
          <CustomSpinner visible={logoLoading} />
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalSportsVisible}
        onRequestClose={() => {
          setModalSportsVisible(false);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: WP(130),
            width: WP(100),
            backgroundColor: 'white',
            bottom: 0,
            position: 'absolute',
            alignItems: 'center',

            borderRadius: 30,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <Touch
            style={{ position: 'absolute', top: WP(4), right: WP(5) }}
            onPress={() => setModalSportsVisible(false)}>
            <I name={'close'} size={WP(7)} />
          </Touch>
          <Text
            style={{
              fontSize: HP(2),
              marginTop: WP(5),
              marginBottom: WP(5),
              fontWeight: 'bold',
            }}>
            Select Your Sport
          </Text>

          <View style={STYLES.choiceContainer}>
            <View
              style={
                valuesSports.menActive
                  ? STYLES.mSportActive
                  : STYLES.mSportContainer
              }>
              <Touch
                onPress={() => {
                  setValuesSports(prev => ({
                    ...prev,
                    menActive: true,
                    womenActive: false,
                  }));
                }}>
                <Text
                  style={
                    valuesSports.menActive
                      ? STYLES.activeText
                      : STYLES.textColor
                  }>
                  MEN'S SPORTS
                </Text>
              </Touch>
            </View>
            <View style={STYLES.verticalDivider}></View>
            <Touch
              onPress={() => {
                setValuesSports(prev => ({
                  ...prev,
                  menActive: false,
                  womenActive: true,
                }));
              }}>
              <View
                style={
                  valuesSports.womenActive
                    ? STYLES.wSportActive
                    : STYLES.wSportContainer
                }>
                <Text
                  style={
                    valuesSports.womenActive
                      ? STYLES.activeText
                      : STYLES.textColor
                  }>
                  WOMEN'S SPORTS
                </Text>
              </View>
            </Touch>
          </View>
          <ScrollView>
            <View style={{ marginTop: HP(2) }}>
              <View style={STYLES.cardContainer}>
                {sports.length > 0 &&
                  sports.map((item: any, index) => {
                    return (
                      <>
                        {valuesSports.menActive ? (
                          <>
                            {item.gender === 'M' && (
                              <Touch
                                onPress={() => {
                                  // console.log(item.id);
                                  setSelectedSportsId(item.id);
                                  setSelectedSportsName(item.name);
                                  saveSchool();
                                  setModalSportsVisible(false);
                                }}
                                key={index}>
                                <Card item={item} index={index} />
                              </Touch>
                            )}
                          </>
                        ) : (
                          <>
                            {item.gender === 'F' && (
                              <Touch
                                onPress={() => {
                                  console.log(item.id);
                                  setSelectedSportsId(item.id);
                                  setSelectedSportsName(item.name);
                                  saveSchool();
                                  setModalSportsVisible(false);
                                }}
                                key={index}>
                                <Card item={item} index={index} />
                              </Touch>
                            )}
                          </>
                        )}
                      </>
                    );
                  })}
              </View>
            </View>
          </ScrollView>
          <CustomSpinner visible={logoLoading} />
        </View>
      </Modal>
    </View>
  );
};
export default Profile;
