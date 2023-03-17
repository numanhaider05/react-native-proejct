import React, {useEffect, useState} from 'react';
import {
  TextInput,
  Image,
  Modal,
  StyleSheet,
  FlatList,
  Text,
  View,
  Animated,
} from 'react-native';
import I from 'react-native-vector-icons/AntDesign';
import Header from '../../../shared/components/header/header';
import Touch from '../../../shared/components/touch/touch';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {HP, THEME, WP} from '../../../shared/exporter';
import {RFValue} from 'react-native-responsive-fontsize';

import Loader from '../../../shared/components/loader';
import {getMates} from '../../../shared/services/HomeService';
import {upsertTeammate} from '../../../shared/services/HomeService';
import {removeTeammate} from '../../../shared/services/HomeService';
import {RootStateOrAny, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {searchUser} from '../../../shared/services/HomeService';

import helpers from '../../../shared/utils/helpers';

const TeammatesList = ({navigation, route}: any) => {
  const {user, authToken} = useSelector(
    (state: RootStateOrAny) => state.root.user,
  );
  const [sport, setItem] = useState(route.params.sport);

  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUsersVisible, setModalUsersVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);

  // console.log(user.accessToken)
  const isFocused = useIsFocused();
  useEffect(() => {
    getTeammates();
  }, [isFocused]);

  const getTeammates = () => {
    setLoading(true);
    let token = user.accessToken;
    console.log(sport);

    // getMySchools(token)
    getMates(sport.id, token)
      .then(res => {
        console.log('-=-=--=-getMates', res.data.data);
        setValues(res.data.data);
      })
      .catch(err => {
        helpers.showToastSuccess(err.response.data.meta.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRemove = (id: any, name: any) => {
    setLoading(true);

    let token = user.accessToken;
    const params = id;

    removeTeammate(params, token)
      .then(res => {
        setValues(res.data.data);
        helpers.showToastSuccess(name + ' Removed');
      })
      .catch(err => {
        helpers.showToastSuccess(err.response.data.meta.message);
        console.log(err.response.data);
      })
      .finally(() => {
        setLoading(false);
        getTeammates();
      });
  };

  const [searchvalues, setsearchvalues] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setResults();
  }, [search]);

  const setResults = () => {
    setLoading(true);
    const params = {
      roleoptional: 'player',
      searchText: search,
    };
    const token = user.accessToken;

    searchUser(params, token)
      .then(res => {
        console.log('-=-=--=-setResults', res.data.data);
        setsearchvalues(res.data.data);
      })
      .catch(err => {
        console.log(err.response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [selectedTeammate, setSelectedTeammate] = useState('');
  const [position, setPosition] = useState('');
  const [no, setNo] = useState('');

  const onAddToTeam = () => {
    setLoading(true);

    let token = user.accessToken;

    console.log('selectedTeammate.id', selectedTeammate.id);

    const params = {
      teammateId: modalEditVisible
        ? selectedTeammate.teammateId
        : selectedTeammate.id,
      position: position,
      no: no,
    };

    upsertTeammate(sport.id, params, token)
      .then(res => {
        helpers.showToastSuccess(
          modalEditVisible ? 'Teammate Updated' : 'Added to teammates',
        );
        console.log(res.data);
        getTeammates();
      })
      .catch(err => {
        helpers.showToastSuccess(err.response.data.meta.message);
        console.log(err.response.data.meta.message);
      })
      .finally(() => {
        setLoading(false);
        setPosition('');
        setNo('');
        setSearch('');
        getTeammates();
      });
  };

  return (
    <>
      {/* <Header navigation={navigation} /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: HP(6),
          marginLeft: WP(4),
          marginBottom: WP(2),
        }}>
        <Touch onPress={() => navigation.goBack()}>
          <I name={'left'} size={WP(6)} />
        </Touch>
        <Text style={STYLES.heading}>{sport.name}</Text>
        <Touch
          onPress={() => setModalUsersVisible(true)}
          style={{marginRight: WP(6)}}>
          <I name={'plus'} size={WP(6)} />
        </Touch>
      </View>
      {/* <Text style={STYLES.heading}>{sport.name}</Text> */}
      {loading ? (
        <Loader />
      ) : (
        <View style={{flex: 1}}>
          {values ? (
            <>
              <FlatList
                style={{height: HP(100)}}
                data={values}
                renderItem={({item, index}) => (
                  <Swipeable
                    renderRightActions={(progress: any, dragX: any) => {
                      const scale = dragX.interpolate({
                        inputRange: [-100, 0],
                        outputRange: [1, 0],
                        extrapolate: 'clamp',
                      });
                      return (
                        <>
                          <Touch
                            onPress={() => {
                              setSelectedTeammate(item);
                              setPosition(item.position);
                              setNo(item.no.toString());
                              console.log(item.no);
                              setModalEditVisible(true);
                            }}>
                            <Animated.View
                              style={{
                                ...STYLES.swipePressable,
                                backgroundColor: THEME.colors.primary,
                                transform: [{scale}],
                              }}>
                              <Animated.Image
                                source={require('../../../assets/images/editIcon.png')}
                                style={{...STYLES.swipeimage}}
                              />
                              <Animated.Text
                                style={{
                                  ...STYLES.swipeText,
                                  transform: [{scale}],
                                }}>
                                Edit
                              </Animated.Text>
                            </Animated.View>
                          </Touch>
                          <Touch
                            onPress={() => onRemove(item.id, item.fullName)}>
                            <Animated.View
                              style={{
                                ...STYLES.swipePressable,
                                backgroundColor: THEME.colors.error,
                                transform: [{scale}],
                              }}>
                              <Animated.Image
                                source={require('../../../assets/images/bin.png')}
                                style={{...STYLES.swipeimage}}
                              />
                              <Animated.Text
                                style={{
                                  ...STYLES.swipeText,
                                  transform: [{scale}],
                                }}>
                                Remove
                              </Animated.Text>
                            </Animated.View>
                          </Touch>
                        </>
                      );
                    }}>
                    <Touch
                      onPress={() =>
                        navigation.navigate('UserDetails', {
                          item: item.teammateId,
                        })
                      }
                      style={STYLES.contMain}>
                      {/* <Image source={{ uri: item.logoUrl }} style={STYLES.logo} /> */}
                      <View>
                        <Text style={STYLES.name}>{item.fullName}</Text>
                        <Text style={STYLES.location}>
                          Position: {item.position}
                        </Text>
                      </View>

                      <View
                        style={{
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Text style={STYLES.name}>Number</Text>
                        <Text style={{...STYLES.location, fontSize: HP(2)}}>
                          #{item.no}
                        </Text>
                      </View>
                    </Touch>
                  </Swipeable>
                )}
              />
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalEditVisible}
                onRequestClose={() => {
                  // Alert.alert("Modal has been closed.");
                  setModalEditVisible(!modalEditVisible);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                  <View style={STYLES.btnParentSection}>
                    <Touch
                      onPress={() => setModalVisible(true)}
                      style={{alignSelf: 'center'}}>
                      <I name={'plus'} size={WP(6)} />
                    </Touch>
                    <Text
                      style={{
                        ...STYLES.btnText,
                        fontSize: HP(2.2),
                        marginBottom: HP(1),
                        fontWeight: '900',
                        letterSpacing: 1,
                      }}>
                      Edit Teammate
                    </Text>

                    <TextInput
                      value={selectedTeammate.fullName}
                      // onChangeText={(value) => onChangeText(value)}
                      placeholder={'Position'}
                      placeholderTextColor={THEME.colors.placeHolder}
                      style={{
                        fontSize: HP(1.8),
                        fontWeight: 'bold',
                        marginTop: WP(2),
                      }}
                      blurOnSubmit={true}
                    />
                    <TextInput
                      value={position}
                      onChangeText={value => setPosition(value)}
                      placeholder={'Position'}
                      placeholderTextColor={THEME.colors.placeHolder}
                      style={STYLES.textInput}
                      blurOnSubmit={true}
                    />
                    <TextInput
                      value={no}
                      onChangeText={value => setNo(value)}
                      placeholder={no}
                      placeholderTextColor={THEME.colors.placeHolder}
                      style={STYLES.textInput}
                      blurOnSubmit={true}
                    />

                    <Touch
                      onPress={() => {
                        onAddToTeam();
                        setModalEditVisible(!modalEditVisible);
                      }}
                      style={{...STYLES.btnSection, marginTop: WP(7)}}>
                      <Text style={STYLES.ModalbBtnText}>Edit</Text>
                    </Touch>
                    {/* <Touch onPress={() => setModalEditVisible(!modalEditVisible)} style={{ ...STYLES.btnSection, }}>
                                                <Text style={{ ...STYLES.btnText, color: THEME.colors.placeHolderDark }}>Cancel</Text>
                                            </Touch> */}
                  </View>
                </View>
              </Modal>
            </>
          ) : (
            <View style={STYLES.recommendation}>
              <Text style={STYLES.recommendationText}>No Teammates</Text>
            </View>
          )}
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //     // Alert.alert("Modal has been closed.");
        //     setModalVisible(!modalVisible);
        // }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <View style={STYLES.btnParentSection}>
            <Text
              style={{
                ...STYLES.btnText,
                fontSize: HP(2.2),
                marginBottom: HP(1),
                fontWeight: '900',
                letterSpacing: 1,
              }}>
              Add Teammate
            </Text>

            <TextInput
              value={selectedTeammate.fullName}
              // onChangeText={(value) => onChangeText(value)}
              placeholder={selectedTeammate.fullName}
              placeholderTextColor={THEME.colors.placeHolder}
              style={{fontSize: HP(1.8), fontWeight: 'bold', marginTop: WP(2)}}
              blurOnSubmit={true}
            />
            <TextInput
              value={position}
              onChangeText={value => setPosition(value)}
              placeholder={'Position'}
              placeholderTextColor={THEME.colors.placeHolder}
              style={STYLES.textInput}
              blurOnSubmit={true}
            />
            <TextInput
              value={no}
              onChangeText={value => setNo(value)}
              placeholder={'Number'}
              placeholderTextColor={THEME.colors.placeHolder}
              style={STYLES.textInput}
              blurOnSubmit={true}
            />

            <Touch
              onPress={() => {
                onAddToTeam();
                setModalVisible(!modalVisible);
              }}
              style={{...STYLES.btnSection, marginTop: WP(7)}}>
              <Text style={STYLES.ModalbBtnText}>Add</Text>
            </Touch>
            {/* <Touch onPress={() => setModalVisible(!modalVisible)} style={{ ...STYLES.btnSection, }}>
                            <Text style={{ ...STYLES.btnText, color: THEME.colors.placeHolderDark }}>Cancel</Text>
                        </Touch> */}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalUsersVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalUsersVisible(!modalUsersVisible);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <View style={STYLES.btnModalParentSection}>
            <View style={STYLES.textFieldContainer}>
              <Image
                source={require('../../../assets/images/searchInput.png')}
                style={STYLES.searchIcon}
              />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder={'Who are you looking for?'}
                placeholderTextColor={THEME.colors.placeHolderDark}
                style={STYLES.textField}
                blurOnSubmit={true}
              />
            </View>

            <View style={STYLES.recommendation}>
              {searchvalues ? (
                <View style={{flex: 1, marginTop: WP(2)}}>
                  <FlatList
                    style={{height: HP(80)}}
                    data={searchvalues}
                    renderItem={({item, index}) => (
                      <Touch
                        onPress={() => {
                          setModalUsersVisible(false);
                          setModalVisible(true);
                          setSelectedTeammate(item);
                          // navigation.navigate('UserDetails', { item: item.id })
                        }}
                        style={STYLES.cont}>
                        {item.pictureUrl === null ? (
                          <Image
                            source={require('../../../assets/images/user.png')}
                            style={STYLES.logo}
                          />
                        ) : (
                          <Image
                            source={{uri: item.pictureUrl}}
                            style={STYLES.logo}
                          />
                        )}
                        <View>
                          <Text style={STYLES.name}>{item.fullName}</Text>
                          <Text style={STYLES.location}>{item.bio}</Text>
                        </View>
                      </Touch>
                    )}
                  />
                </View>
              ) : (
                <>
                  <View style={STYLES.recommendation}>
                    <Text style={STYLES.recommendationText}>
                      Tap to see recommendeded schools
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default TeammatesList;

const STYLES = StyleSheet.create({
  heading: {
    fontFamily: THEME.fonts.boldJost,
    fontSize: RFValue(20),
  },
  cont: {
    marginVertical: WP(1),
    marginHorizontal: WP(4),
    paddingHorizontal: WP(5),
    paddingVertical: WP(3),
    width: WP(65),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.colors.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  contMain: {
    marginVertical: WP(1),
    marginHorizontal: WP(4),
    paddingHorizontal: WP(5),
    paddingVertical: WP(3),
    width: WP(94),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.colors.white,
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  logo: {
    height: WP(10),
    width: WP(10),
    resizeMode: 'contain',
    marginRight: WP(10),
    borderRadius: WP(10) / 2,
  },
  swipePressable: {
    marginTop: HP(0.5),
    marginRight: WP(2),
    width: WP(18),
    height: HP(7.3),
    borderTopLeftRadius: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeimage: {
    height: WP(6),
    width: WP(6),
    tintColor: 'white',
    marginBottom: WP(1.4),
  },
  swipeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: HP(1.7),
  },

  name: {
    fontWeight: 'bold',
  },

  btnParentSection: {
    height: HP(28),
    width: WP(70),

    marginTop: HP(33),
    alignSelf: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 20,
  },
  btnSection: {
    margin: HP(0.2),
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: WP(5),
    paddingVertical: WP(1),
    borderRadius: WP(6) / 2,
  },
  btnText: {
    fontSize: HP(2),
    fontWeight: 'bold',
    fontFamily: THEME.fonts.montRegular,
  },
  ModalbBtnText: {
    fontSize: HP(2),
    fontWeight: 'bold',
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.white,
  },
  textInput: {
    marginTop: HP(1.5),
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(1.8),
    borderBottomWidth: 0.6,
    width: WP(40),
    textAlign: 'center',
  },

  /// search Modal

  btnModalParentSection: {
    height: HP(65),
    width: WP(80),

    marginTop: HP(15),
    alignSelf: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  textField: {
    marginLeft: WP(2.5),
    width: WP(42),
    fontFamily: THEME.fonts.montRegular,
    fontSize: RFValue(15),
  },
  searchIcon: {
    height: HP(2.5),
    width: HP(2.5),
    resizeMode: 'contain',
  },
  textFieldContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: THEME.colors.placeHolder,
    borderBottomColor: THEME.colors.placeHolder,
    borderRadius: HP(3) / 2,
    width: WP(70),
    padding: HP(1),
    alignSelf: 'center',
  },
  cardContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tabs: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: HP(4),
    borderColor: THEME.colors.gray,
    borderBottomWidth: 1,
  },
  selectedTab: {
    alignItems: 'center',
    width: WP(20),
    borderBottomWidth: HP(0.8),
    marginHorizontal: WP(2),
    borderColor: '#ebc77a',
  },
  tab: {
    alignItems: 'center',
    width: WP(22),
    marginHorizontal: WP(1),
  },
  tabText: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(1.8),
  },
  subtabs: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: HP(3),
    paddingBottom: HP(0.3),
    borderColor: THEME.colors.gray,
    borderBottomWidth: 1,
    marginHorizontal: WP(8),
  },
  subtab: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: WP(27),
    marginHorizontal: WP(1),
  },
  subtabText: {
    marginRight: WP(2),
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(1.8),
  },
  recommendation: {
    height: HP(55),
  },
  recommendationText: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(1.8),
  },
  logoText: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.white,
    fontSize: HP(3),
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: HP(1.5),
  },
  back: {
    backgroundColor: THEME.colors.white,
    padding: HP(1),
    borderRadius: HP(3) / 2,
    position: 'absolute',
    bottom: HP(5.5),
    left: WP(3.5),
  },
  gradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WP(3),
    alignItems: 'center',
    height: HP(4),
    width: WP(100),
  },
  viewsite: {
    fontFamily: THEME.fonts.montRegular,
    textDecorationLine: 'underline',
  },
});
