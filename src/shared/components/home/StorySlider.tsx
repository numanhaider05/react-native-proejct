import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Modal,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  DeviceEventEmitter,
} from 'react-native';
import { HP, RF, WP } from '../../theme/responsive';
import F from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Touch from '../touch/touch';
import Stories from '../story/Stories';

import { upload } from '../../../shared/services/HomeService';
import helpers, { LOG, Options } from '../../utils/helpers';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import { CONSTANTS, IMAGE_PICKER_OPTIONS } from '../../utils/constants';
import { Story } from '../../models/interface';
import { THEME } from '../../exporter';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const StorySlider = ({
  style,
  stories,
  user,
  updateStory,
}: {
  style?: any;
  stories: Story[];
  user: any;
  updateStory: (url: string, fileType: string) => void;
}) => {
  let actionSheet: any = null;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showStory, setShowStory] = useState({
    status: false,
    index: 0,
  });

  const resHandler = (res: any) => {
    if (!res.didCancel) {
      let file = {
        uri: res.assets[0].uri,
        type: res.assets[0].type ? res.assets[0].type : 'video/mp4',
        name: res.assets[0].filename || `NxtGem${new Date().getTime()}.mp4`,
      };
      uploadToServer(file);
    }
  };

  const cameraPressHandler = () => {
    launchCamera(IMAGE_PICKER_OPTIONS, (res: any) => resHandler(res));
  };

  const gallaryPressHandler = () => {
    launchImageLibrary(IMAGE_PICKER_OPTIONS, (res: any) => resHandler(res));
  };

  const uploadToServer = async (file: any) => {
    setLoading(true);
    const data = new FormData();
    data.append('type', 'story');
    data.append('file', file);
    upload(data)
      .then(res => {
        if (res.data.meta.status) {
          helpers.showToastSuccess('Story Added');
          //   console.log(res.data.data);
          updateStory(
            `${CONSTANTS.S3_STORY_PATH}${res.data.data.filekey}`,
            file.type,
          );
          setModalVisible(false);
        }
      })
      .catch(err => {
        console.log(err.response.data);
        helpers.showToastFail('Failed! to Upload Image.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addStoryPlease = () => {
    return (
      <View style={styles.imageContainer}>
        <View style={styles.storyContainer}>
          {user.pictureUrl ? (
            <FastImage
              resizeMode={'cover'}
              source={{ uri: user.pictureUrl }}
              style={styles.image}
            />
          ) : (
            <View style={styles.image}>
              <F
                name={'user'}
                style={{ color: THEME.colors.blck, fontSize: WP(10) }}
              />
            </View>
          )}
          <View style={styles.plusIcon}>
            <Feather name="plus" size={HP(2)} />
          </View>
        </View>

        <Text style={[styles.textName]}>{'Add'}</Text>
      </View>
    );
  };

  return (
    <View style={{ height: HP('11%') }}>
      {stories.length > 0 ? (
        <ScrollView
          horizontal
          contentContainerStyle={[{ paddingHorizontal: 10, marginTop: HP(2) }]}
          showsHorizontalScrollIndicator={false}>
          {loading ? (
            <View style={styles.imageContainer}>
              <View style={[styles.storyContainer, styles.loadingContainer]}>
                <ActivityIndicator color={'#000'} />
              </View>
              <Text style={[styles.textName]}>{'Uploading...'}</Text>
            </View>
          ) : (
            <Touch
              onPress={() => {
                // setModalVisible(!modalVisible)
                actionSheet.show();
              }}>
              {addStoryPlease()}
            </Touch>
          )}

          {stories.map((poster: any, index: number) => {
            return (
              <Touch
                key={index}
                onPress={() => {
                  setShowStory({
                    status: true,
                    index: index,
                  });
                }}>
                <View style={styles.imageContainer}>
                  <View style={styles.storyContainer}>
                    {poster && poster.stories.length > 0 ? (
                      poster.stories[0].type.includes('video') ?
                        <>
                          <View style={[styles.image, { backgroundColor: '#000' }]}>
                            <Feather name={"play"} size={RF(20)} style={{ color: '#fff', }} />
                          </View>
                        </> :
                        <FastImage
                          source={{ uri: poster.stories[0].content }}
                          style={[styles.image, { borderColor: 'black' }]}
                        />
                    ) : null}
                  </View>
                  <Text style={[styles.textName]}>
                    {poster?.own ? 'Your story' : poster.user}
                  </Text>
                </View>
              </Touch>
            );
          })}
        </ScrollView>
      ) : (
        <Touch
          style={{ marginTop: HP(2) }}
          onPress={() => {
            // setModalVisible(!modalVisible)
            actionSheet.show();
          }}>
          {addStoryPlease()}
        </Touch>
      )}
      <Options
        init={(s: any) => {
          actionSheet = s;
        }}
        heading={'Choose story'}
        options={['Launch camera', 'Gallery', 'Cancel']}
        closeIndex={2}
        press={(index: any) => {
          index == 0
            ? cameraPressHandler()
            : index == 1
              ? gallaryPressHandler()
              : null;
          //   if (index == 0) {
          //     camera();
          //   } else if (index == 1) {
          //     chooseImage();
          //   }
        }}
      />
      {showStory.status ? (
        <Stories
          statuses={stories || []}
          showThis={showStory.index}
          showStory={showStory.status}
          closeIt={() => {
            setShowStory({
              status: false,
              index: 0,
            });
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  loadingContainer: {
    height: HP(6.5),
    width: HP(6.5),
    borderRadius: WP('8%'),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: HP(6.5),
    width: HP(6.5),
    borderRadius: WP('8%'),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: WP(19),
    alignItems: 'center',
  },
  textName: {
    color: '#333',
    fontSize: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  plusIcon: {
    backgroundColor: '#fff',

    width: HP(2.6),
    height: HP(2.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: HP(2.6) / 2,
    position: 'absolute',
    bottom: 0,
    right: -3,
    borderWidth: 0.8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnParentSection: {
    height: HP(22),
    width: WP(70),

    marginTop: HP(40),
    alignSelf: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 20,
  },
  btnSection: {
    margin: HP(1),
  },
  btnText: {},
});

export default StorySlider;
