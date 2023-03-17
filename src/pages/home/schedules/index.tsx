import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Agenda } from 'react-native-calendars';
import { Source } from 'react-native-fast-image';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import { RootStateOrAny, useSelector } from 'react-redux';
import { photo } from '../../../assets/images';
import CustomImagePicker from '../../../shared/components/customImagePicker';
import CustomOverlay from '../../../shared/components/customOverlay';
import ImagePicker from "react-native-image-picker"
import CustomText from '../../../shared/components/customText';
import Wrapper from '../../../shared/components/wrapper/wrapper';
import { HP, RF, THEME } from '../../../shared/exporter';
import {
  getSchedules,
  saveSchedule,
  upload,
} from '../../../shared/services/HomeService';
import helpers, { CustomSpinner } from '../../../shared/utils/helpers';
import styles from './styles';
const { white, btnBck } = THEME.colors;

const Schedules = () => {
  const [showNotesModal, setShowNotesModal] = useState({ status: false, id: '' });
  const [loading, setLoading] = useState(false);
  const [markedDates, setMarkedDates] = useState([]);
  const [calendarItems, setCalendarItems] = useState();
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [image, setImage] = useState<any>();
  const [notes, setNotes] = useState('');
  const { user } = useSelector((state: RootStateOrAny) => state.root.user);
  const [selectedDay, setSelectedDay] = useState(helpers.formateDateForSchedule(new Date()));

  useEffect(() => {
    getSchedule();
  }, []);

  const toggleImagePicker = () => {
    setShowImagePicker(!showImagePicker);
  };

  const getSchedule = () => {
    setLoading(true);
    let token = user.accessToken;
    getSchedules(token)
      .then(res => {
        const data = res.data?.data;
        if (data.length > 0) {
          let markerTemp: any = {};
          let itemTemp: any = {};
          data.forEach((item: any) => {
            markerTemp[item.scheduleDate] = { marked: true, dotColor: btnBck };
            if (itemTemp[item.scheduleDate]) {
              if (item.notes) {
                itemTemp[item.scheduleDate][0].notes.push(item.notes);
              }
              if (item.contentUrl) {
                itemTemp[item.scheduleDate][0].images.push(item.contentUrl);
              }
            } else {
              let temp: any = {};
              if (item.notes) {
                temp['notes'] = [item.notes];
              }
              if (item.contentUrl) {
                temp['images'] = [item.contentUrl];
              }
              itemTemp[item.scheduleDate] = [temp];
            }
          });
          setMarkedDates(markerTemp);
          setCalendarItems(itemTemp);
        }
      })
      .catch(err => {
        helpers.showToastSuccess(err.response.data?.meta.message);
        console.log(err.response.data?.meta);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closeModal = () => {
    setImage(null);
    setShowNotesModal({ status: false, id: '' });
  };

  const imgRemovePressHandler = () => {
    setImage(null);
  };

  const submitNoteHandler = async () => {
    if (!image) {
      helpers.showToastFail('Image Not Selected');
    } else {
      const file = {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      };

      const data = new FormData();
      data.append('type', 'contentKey');
      data.append('file', file);
      setLoading(true);
      try {
        const res = await upload(data);
        const contentKey = res.data.data.filekey;
        setLoading(false);
        saveSchedule({
          scheduleDate: selectedDay,
          contentKey,
          notes,
        })
          .then(res => {
            console.log('indide sucs');
            closeModal();
            helpers.showToastSuccess('Notes Added Successfully');
            getSchedule();
          })
          .catch(err => {
            console.log(err);
            console.log('indide error');
          })
          .finally(() => setLoading(false));
      } catch {
        helpers.showToastFail('Failed! to Upload Image.');
        setLoading(false);
      }
    }
  };

  return (
    <Wrapper>
      {
        //@ts-ignore
        <Agenda
          markedDates={markedDates}
          onDayPress={({ dateString }: { dateString: string }) => {
            console.log(dateString);
            setSelectedDay(dateString)
          }}
          items={calendarItems}
          renderItem={(item: any) => <CalendarItem data={item} />}
          renderEmptyData={(item: any) => (
            <RenderEmptyData
              onAddPress={() => setShowNotesModal({ status: true, id: item })}
            />
          )}
        />

      }

      {/* <CustomBtn
              label={'Cancel'}
              onPress={closeModal}
              containerStyle={styles.w49}
              themeB
            />
          </View>
        </View>
        <CustomImagePicker
          visible={showImagePicker}
          toggleImagePicker={toggleImagePicker}
          getSource={(image: Source) => setImage(image)}
          /> */}

      <Modal
        animationType={'slide'}
        transparent={true}
        presentationStyle={'overFullScreen'}
        visible={showNotesModal.status}
        onRequestClose={closeModal}>
        <View style={styles.notesScrolWrap}>
          <KeyboardAwareScrollView contentContainerStyle={{
            width: '100%',
            height: HP(50),
            alignItems: "center",
            justifyContent: 'center',

          }}>
            <View style={styles.notesWrao}>
              <View style={styles.inputMainContainer}>
                <TextInput
                  multiline
                  maxLength={200}
                  placeholder={'type some notes'}
                  onChangeText={(text: string) => setNotes(text)}
                  style={styles.inputField}
                />
                {image ? (
                  <View style={styles.imgMainContainer}>
                    <Image source={{ uri: image.uri }} style={styles.img} />
                    <Pressable
                      style={styles.imgRemoveContainer}
                      onPress={imgRemovePressHandler}>
                      <Icon name={'close'} size={RF(12)} color={white} />
                    </Pressable>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.pickerContainer}
                    onPress={toggleImagePicker}>
                    <Image source={photo} style={styles.pickerIcon} />
                    <CustomText>Add Photo</CustomText>
                  </TouchableOpacity>
                )}
                <View style={styles.inputFieldBtnContainer}>
                  <CustomBtn
                    label={'Add'}
                    onPress={submitNoteHandler}
                    containerStyle={styles.w49}
                  />
                  <CustomBtn
                    label={'Cancel'}
                    onPress={closeModal}
                    containerStyle={styles.w49}
                    themeB
                  />
                </View>
              </View>
              <ImagePicker
                visible={showImagePicker}
                toggleImagePicker={toggleImagePicker}
                getSource={(image: Source) => setImage(image)}
              />
              <CustomSpinner visible={loading} />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>

    </Wrapper>
  );
};

const CalendarItem = ({ data }: any) => {
  return (
    <View style={styles.calendarItemContainer}>
      {data.notes?.length > 0 &&
        data.notes.map((note: string) => (
          <View style={styles.noteMainContainer}>
            <View style={styles.noteContainer} />
            <CustomText>{note}</CustomText>
          </View>
        ))}
      <FlatList
        horizontal
        data={data.images}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.noteImage} />
        )}
      />
      {/* <TouchableOpacity onPress={editPressHandler}>
        <Icon name={'edit'} color={btnBck} size={RF(15)} />
      </TouchableOpacity> */}
      {/* <View style={styles.line} /> */}
    </View>
  );
};

const RenderEmptyData = ({ onAddPress }: { onAddPress: () => void }) => {
  return (
    <View style={styles.emptyDataContainer}>
      <CustomText>No Notes on this day!</CustomText>
      <CustomBtn label={'Add Notes'} onPress={onAddPress} />
    </View>
  );
};

const CustomBtn = ({
  label,
  onPress,
  containerStyle,
  themeB,
}: {
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  themeB?: boolean;
}) => (
  <TouchableOpacity
    style={[
      styles.btnContainer,
      { backgroundColor: themeB ? white : btnBck },
      containerStyle,
    ]}
    onPress={onPress}>
    <CustomText size={14} color={themeB ? btnBck : white}>
      {label}
    </CustomText>
  </TouchableOpacity>
);

export default Schedules;

