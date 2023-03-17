import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import I from 'react-native-vector-icons/AntDesign';

import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';
import {Agenda} from 'react-native-calendars';
// import { Agenda } from 'react-native-calendars';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CalendarMenuCard from './CalendarMenuCard';
import {HP, THEME, WP} from '../../../shared/exporter';
import {Header} from 'react-native/Libraries/NewAppScreen';
import Touch from '../../../shared/components/touch/touch';
import {RFValue} from 'react-native-responsive-fontsize';
import {useEffect} from 'react';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useIsFocused} from '@react-navigation/native';

import {RootStateOrAny, useSelector} from 'react-redux';
import {
  getSchedules,
  saveSchedule,
  upload,
} from '../../../shared/services/HomeService';
import helpers from '../../../shared/utils/helpers';
import Loader from '../../../shared/components/loader';
import {date} from 'yup/lib/locale';

const timeToString = time => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Schedules = props => {
  const {user, authToken} = useSelector(
    (state: RootStateOrAny) => state.root.user,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const chooseImage = () => {
    let options: any = {
      mediaType: 'photo',
      includeBase64: true,
      // maxWidth: 300,
      // maxHeight: 550,
      // quality: 1,
    };
    launchImageLibrary(options, imageResp);
  };

  const imageResp = async (response: any) => {
    if (response.didCancel) {
      Alert.alert('User cancelled to pick the image');
      return;
    } else if (response.errorCode == 'camera_unavailable') {
      Alert.alert('Camera not available on device');
      return;
    } else if (response.errorCode == 'permission') {
      Alert.alert('Permission not satisfied');
      return;
    } else if (response.errorCode == 'others') {
      Alert.alert(response.errorMessage);
      return;
    }

    let file = {
      uri: response.assets[0].uri,
      type: response.assets[0].type,
      name: response.assets[0].fileName,
    };
    uploadToServer(file);
  };

  const [loading, setLoading] = useState(false);
  const [contentKey, setContentKey] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');

  const uploadToServer = async (file: any) => {
    let token = user.accessToken;
    const data = new FormData();
    data.append('type', 'contentKey');
    data.append('file', file);

    setLoading(true);
    upload(data, token)
      .then(res => {
        // console.log('-=--=-=-=', res.data.data);
        // helpers.showToastSuccess('/ Added')
        setContentKey(res.data.data.filekey);
      })
      .catch(err => {
        console.log(err.response.data);
        helpers.showToastFail('Failed! to Upload Image.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [data, setData] = useState([]);

  const [items, setItems] = useState({
    '2021-09-21': [
      {name: 'Item for 2017-04-01 #0', height: 500},
      {name: 'Item for 2017-04-02 #1', height: 50},
    ],
    '2017-05-21': [
      {name: 'Item for 2017-04-01 #0', height: 500},
      {name: 'Item for 2017-04-02 #1', height: 50},
    ],
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    getSchedule();
    // console.log(user.accessToken)
  }, [isFocused]);

  useEffect(() => {
    let obj: any[] = [];
    data.forEach((item: any, index) => {
      const strTime = item.scheduleDate;
      obj[item.scheduleDate] = [];

      let temp = {
        contentKey: item.contentKey,
        image: item.contentUrl,
        userId: item.userId,
      };

      obj[strTime].push(temp);
    });
    setItems(obj);
  }, [data]);

  const getSchedule = () => {
    setLoading(true);
    let token = user.accessToken;

    getSchedules(token)
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        helpers.showToastSuccess(err.response.data.meta.message);
        console.log(err.response.data.meta);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadItems = day => {
    // Do items loading here
    setTimeout(() => {
      // const items = {};

      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = new Date(time).toISOString().split('T')[0];
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              // name: 'Item for ' + strTime + ' #' + j,
              // height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }

      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);

      let obj = [];
      data.forEach((item, index) => {
        const strTime = item.scheduleDate;
        obj[item.scheduleDate] = [];

        let temp = {
          contentKey: item.contentKey,
          image: item.contentUrl,
          userId: item.userId,
        };

        obj[strTime].push(temp);
      });
      setItems(obj);
    }, 1000);
  };
  // const loadItems = (day) => {
  //     setTimeout(() => {

  //         // let obj = []
  //         // data.forEach((item, index) => {

  //         //     const strTime = item.scheduleDate;
  //         //     obj[item.scheduleDate] = [];

  //         //     let temp = {
  //         //         contentKey: item.contentKey,
  //         //         image: item.contentUrl,
  //         //         userId: item.userId
  //         //     }

  //         //     obj[strTime].push(temp);
  //         // });
  //         // setItems(obj)

  //         for (let i = -15; i < 85; i++) {
  //             const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //             const strTime = timeToString(time);
  //             if (!items[strTime]) {
  //                 items[strTime] = [];
  //                 const numItems = Math.floor(Math.random() * 3 + 1);
  //                 for (let j = 0; j < numItems; j++) {
  //                     items[strTime].push({
  //                         name: 'Item for ' + strTime + ' #' + j,
  //                         height: Math.max(50, Math.floor(Math.random() * 150)),
  //                     });
  //                 }
  //             }
  //         }
  //         const newItems = {};
  //         Object.keys(items).forEach((key) => {
  //             newItems[key] = items[key];
  //         });
  //         setItems(newItems);
  //     }, 1000);
  // };

  const onSave = () => {
    setLoading(true);
    const params = {
      scheduleDate: scheduleDate,
      contentKey: contentKey,
    };
    saveSchedule(params)
      .then(res => {
        console.log(res);
        helpers.showToastSuccess(' successfully saved Schedule');
        setContentKey('');
      })
      .catch(err => {
        helpers.showToastSuccess(err.response.data.meta.message);
        console.log(err.response.data);
      })
      .finally(() => {
        setLoading(false);
        getSchedule();
      });
  };

  const renderItem = item => {
    return (
      <View
        style={{
          marginRight: wp('2%'),
          marginTop: hp('2%'),
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* <CalendarMenuCard item={item} /> */}
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading && <Loader />}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: Platform.OS === 'ios' ? HP(6) : HP(3),
          marginLeft: WP(4),
          marginBottom: WP(2),
        }}>
        <Touch onPress={() => props.navigation.goBack()}>
          <I name={'left'} size={WP(6)} />
        </Touch>
        <Text
          style={{
            fontFamily: THEME.fonts.boldJost,
            fontSize: RFValue(20),
          }}>
          Schedule
        </Text>
        <Touch
          onPress={() => {
            setModalVisible(true);
          }}
          style={{marginRight: WP(6)}}>
          <I name={'plus'} size={WP(6)} />
        </Touch>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: wp('2%'),
          paddingVertical: hp('0.7%'),
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text
          style={{color: 'black', fontSize: hp('3.4%'), paddingTop: hp('1%')}}>
          {new Date().getDate()}
        </Text>
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontSize: hp('1.5%'), paddingTop: hp('1%')}}>
            {new Date().getDay() === 0
              ? 'Sunday'
              : new Date().getDay() === 1
              ? 'Monday'
              : new Date().getDay() === 2
              ? 'Tuesday'
              : new Date().getDay() === 3
              ? 'Wednesday'
              : new Date().getDay() === 4
              ? 'Thursday'
              : new Date().getDay() === 5
              ? 'Friday'
              : 'Saturday'}
          </Text>
          <Text
            style={{
              fontSize: hp('1.5%'),
            }}>{`September ${new Date().getFullYear()}`}</Text>
        </View>
      </View>

      <Agenda
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={{
          '2021-09-22': [{name: 'item 1 - any js object'}],
          '2021-09-23': [{name: 'item 2 - any js object', height: 80}],
          '2021-09-24': [],
          '2021-09-25': [
            {name: 'item 3 - any js object'},
            {name: 'any js object'},
          ],
        }}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={month => {
          console.log('trigger items loading');
        }}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={calendarOpened => {
          console.log(calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={day => {
          console.log('day pressed');
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={day => {
          console.log('day changed');
        }}
        // Initially selected day
        selected={'2021-09-21'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2012-05-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2012-05-30'}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {
          return <View />;
        }}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        renderDay={(day, item) => {
          return <View />;
        }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View />;
        }}
        // Specify how agenda knob should look like
        renderKnob={() => {
          return <View />;
        }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return <View />;
        }}
        // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        // Hide knob button. Default = false
        hideKnob={true}
        // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        showClosingKnob={false}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={{
          '2021-09-16': {selected: true, marked: true},
          '2021-09-17': {marked: true},
          '2021-09-18': {disabled: true},
        }}
        // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        disabledByDefault={true}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        refreshControl={null}
        // Agenda theme
        theme={{
          // ...calendarTheme,
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue',
        }}
        // Agenda container style
        style={{}}
      />

      {/* <Agenda
            // items={items}
            // loadItemsForMonth={loadItems}
            // selected={new Date()}
            // refreshing={false}
            // refreshControl={null}
            // renderItem={renderItem}
            // renderEmptyDate={() => <View style={{ backgroundColor: 'red', height: 220, width: 220 }} />}
            // onDayPress={(day) => { console.log('day pressed') }}
            /> */}

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
          {loading && <Loader />}

          <View style={STYLES.btnParentSection}>
            <Text
              style={{
                ...STYLES.btnText,
                fontSize: HP(2.2),
                marginBottom: HP(1),
                fontWeight: '900',
                letterSpacing: 1,
              }}>
              Add Schedule
            </Text>

            {/* 
                        <TextInput
                            value={contentKey}
                            // onChangeText={(value) => onChangeText(value)}
                            placeholder={'Chose Schedule Picture'}
                            placeholderTextColor={THEME.colors.placeHolder}
                            style={{ ...STYLES.textInput, position: 'absolute', bottom: 0 }}
                            blurOnSubmit={true}
                            editable={false}
                            onPressIn={() => chooseImage()}
                        /> */}

            <View
              style={{...STYLES.textInput, borderBottomWidth: 0, height: HP(3)}}
              onPress={() => chooseImage()}>
              <TextInput
                value={contentKey}
                // onChangeText={(value) => onChangeText(value)}
                placeholder={'Chose Schedule Picture'}
                placeholderTextColor={THEME.colors.placeHolder}
                style={{...STYLES.textInput, position: 'absolute', bottom: 0}}
                blurOnSubmit={true}
                editable={false}
                onPressIn={() => chooseImage()}
              />
            </View>

            <DatePicker
              style={{width: 200}}
              date={scheduleDate}
              mode="date"
              placeholder="Select Schedule date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              style={{...STYLES.textInput, height: HP(5), alignSelf: 'center'}}
              customStyles={{
                dateIcon: {
                  height: 0,
                  width: 0,
                },
                placeholderText: {
                  padding: 0,
                  paddingBottom: WP(7),
                  alignItems: 'center',
                  width: '100%',
                  paddingTop: RFValue(20),
                  fontSize: RFValue(16),
                  fontFamily: THEME.fonts.montRegular,
                },
                dateText: {
                  marginTop: HP(2.5),
                  fontFamily: THEME.fonts.montRegular,
                  fontSize: HP(1.8),
                  borderBottomWidth: 0.6,
                  width: WP(40),
                  textAlign: 'center',
                },
                dateInput: {
                  borderWidth: 0,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                setScheduleDate(date);
              }}
            />

            <Touch
              onPress={() => {
                onSave();
                setModalVisible(!modalVisible);
              }}
              style={{...STYLES.btnSection, marginTop: WP(7)}}>
              <Text style={STYLES.ModalbBtnText}>Add</Text>
            </Touch>

            <Touch
              onPress={() => setModalVisible(!modalVisible)}
              style={STYLES.btnSectionCancel}>
              <Text style={STYLES.btnTextCancel}>Cancel</Text>
            </Touch>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const STYLES = StyleSheet.create({
  backwardButton: {
    height: hp(3),
    width: hp(3.5),
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 5,
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
  btnSectionCancel: {
    margin: HP(0.2),
    paddingHorizontal: WP(5),
    paddingVertical: WP(1),
  },
  btnTextCancel: {
    fontSize: HP(2),
    fontFamily: THEME.fonts.montRegular,
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
});
export default Schedules;
