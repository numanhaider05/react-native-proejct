import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  View,
  Modal,
  DeviceEventEmitter,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

import { STYLES } from './activityPage.style';
import { HP, THEME, WP } from '../../../shared/exporter';
import HomeHeader from '../../../shared/components/header/homeheader';
import StorySlider from '../../../shared/components/home/StorySlider';
import PostItem from '../../../shared/components/home/PostItem';
import Touch from '../../../shared/components/touch/touch';
import Loader from '../../../shared/components/loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import ImagePicker from 'react-native-image-crop-picker';
import { useIsFocused } from '@react-navigation/native';

import { useDispatch } from 'react-redux';
import {
  getMyStories,
  upload,
  spotLight,
  getStories,
  addPost,
  userFollowingsPosts,
} from '../../../shared/services/HomeService';
import { Story } from '../../../shared/models/interface';
import helpers, { LOG } from '../../../shared/utils/helpers';
import { setOwnStories } from '../../../shared/store/reducers/userReducer';
import { useCustomSelector } from '../../../shared/store/store';
import { CONSTANTS, IMAGE_PICKER_OPTIONS } from '../../../shared/utils/constants';
import CustomImagePicker from '../../../shared/components/customImagePicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ActivityPage = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const { user, ownStories }: any = useCustomSelector(state => state.root.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [ownSLoading, setOwnSLoading] = useState(false);
  const [video, setVideo] = useState<any>();
  const [following, setFollowing] = useState([]);
  const [spotlight, setSpotlight] = useState([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [mediaType, setMediaType] = useState('');
  const isFocused = useIsFocused();
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [contentKey, setContentKey] = useState({
    contentKey: '',
    type: 'post',
  });
  const [body, setBody] = useState({
    caption: '',
    description: '--',
    contents: [contentKey],
  });
  const [currentPost, setCurrentPost] = useState(0);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const onViewRef = useRef(({ viewableItems }: any) => {
    const currentIndex = viewableItems[0]?.index || 0;
    setCurrentPost(currentIndex);
  });

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadOwnStories();
      getPosts();
      spotlights();
    }
  }, [isFocused]);

  useEffect(() => { }, [selectedTab]);

  useEffect(() => {
    if (ownStories.length > 0 && stories.length > 0) {
      if (stories[0].own) {
        let temp = stories;
        temp[0] = ownStories[0];
        setStories(temp);
      }
    } else {
      if (ownStories.length > 0) setStories(ownStories[0]);
      else setStories([]);
    }
  }, [ownStories]);

  const refresh = () => {
    getPosts();
    spotlights();
  };

  const loadOwnStories = () => {
    setOwnSLoading(true);
    getMyStories()
      .then(res => {
        setOwnSLoading(false);
        if (res.data.data.length > 0) {
          getFollowingStories(res.data.data);
        } else {
          getFollowingStories([]);
        }
      })
      .catch(err => {
        setOwnSLoading(false);
      });
  };

  const getPosts = () => {
    setLoading(true);
    // userPosts(user.id)
    userFollowingsPosts()
      .then(res => {
        setFollowing(res.data.data);
      })
      .catch(err => { })
      .finally(() => {
        setLoading(false);
      });
  };

  const spotlights = () => {
    setLoading(true);

    let token = user.accessToken;

    spotLight(token)
      .then(res => {
        setSpotlight(res.data.data);
      })
      .catch(err => {
        console.log(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getFollowingStories = (ownStories: []) => {
    getStories()
      .then(res => {
        if (ownStories.length > 0) {
          let temp: Story = {
            user: user.firstName,
            stories: ownStories.reverse(),
            own: true,
          };
          let resultant: Story[] = [temp, ...res.data.data];
          setStories(resultant);

          dispatch(setOwnStories([temp]));
        } else {
          setStories(res.data.data);
        }
      })
      .catch(err => {
        if (ownStories.length > 0) {
          let temp: Story = {
            user: user.firstName,
            stories: ownStories.reverse(),
            own: true,
          };
          let resultant: Story[] = [temp];
          setStories(resultant);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateStory = (storyUrl: string, fileType: string) => {
    loadOwnStories();
    // if (stories.length == 0) {
    //   let temp = {
    //     user: user.firstName,
    //     stories: [storyUrl],
    //     own: true
    //   }
    //   stories.push(temp);
    // } else {
    //   let myStory = stories.filter(s => s.own == true);
    //   if (myStory.length > 0) {
    //     myStory[0].stories.unshift(storyUrl);
    //   } else {
    //     let temp = {
    //       user: user.firstName,
    //       stories: [storyUrl],
    //       own: true
    //     }
    //     stories.unshift(temp);
    //   }
    // }
  };

  const resHandler = (res: any) => {
    if (!res.didCancel) {
      let file = {
        uri: res.assets[0].uri,
        type: res.assets[0].type ? res.assets[0].type : 'video/mp4',
        name: res.assets[0].filename || `NxtGem${new Date().getTime()}.mp4`,
      };
      setMediaType(file.type);
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
    const data = new FormData();
    data.append('type', 'post');
    data.append('file', file);

    setLoading(true);
    upload(data)
      .then(res => {
        if (res.data.meta.status) {
          setContentKey({ ...contentKey, contentKey: res.data.data.filekey });
          setBody({ ...body, contents: [contentKey] });
        }
      })
      .catch(err => {
        helpers.showToastFail('Failed! to Upload Image.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const save = () => {
    setLoading(true);
    let params = {
      caption: body.caption,
      contents: [
        {
          contentKey: contentKey.contentKey,
          type: mediaType,
        },
      ],
    };
    addPost(params)
      .then(res => {
        helpers.showToastSuccess('Post Added');
        setBody({
          caption: '',
          description: '',
          contents: [],
        });
        setContentKey({
          contentKey: '',
          type: '',
        });
      })
      .catch(err => {
        helpers.showToastFail(err.response?.data?.meta?.message);
        closeImgModal();
      })
      .finally(() => {
        setModalVisible(false);
        setLoading(false);
        refresh();
      });
  };

  const closeImgModal = () => {
    setModalVisible(false);
    setBody({
      caption: '',
      description: '',
      contents: [],
    });
    setContentKey({
      contentKey: '',
      type: '',
    });
  };

  const tabsView = (
    <View style={STYLES.tabs}>
      <Touch
        onPress={() => setSelectedTab(1)}
        style={selectedTab === 1 ? STYLES.selectedTab : STYLES.tab}>
        <Text
          style={
            selectedTab === 1 ? STYLES.tabTextSelected : STYLES.tabText
          }>
          Following
        </Text>
      </Touch>
      <Touch
        onPress={() => setSelectedTab(2)}
        style={selectedTab === 2 ? STYLES.selectedTab : STYLES.tab}>
        <Text
          style={
            selectedTab === 2 ? STYLES.tabTextSelected : STYLES.tabText
          }>
          Spotlight
        </Text>
      </Touch>
    </View>
  )

  const postListing = (dataToPopulate: any[]) => {
    return (
      <FlatList
        style={{ height: '100%', width: '100%' }}
        pagingEnabled={true}
        data={dataToPopulate}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        extraData={dataToPopulate}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        keyExtractor={(item, index) => `id_${index}`}
        renderItem={({ item, index }) => {
          return (
            <PostItem
              navigation={navigation}
              key={index}
              user={user}
              item={item}
              currentVideoIndex={currentPost}
              index={index}
              refresh={refresh}
              loading={loading}
              setLoading={setLoading}
            />
          );
        }}
      />
    )
  }

  return (
    <>
      {loading && <Loader />}

      <LinearGradient
        colors={['#f5fdff', '#eaf5fe', '#fef3fe']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={STYLES.linearGradientStyle}>
        <HomeHeader navigation={navigation} />
        <StorySlider stories={stories} updateStory={updateStory} user={user} />
      </LinearGradient>

      <View
        style={{
          height: Dimensions.get('window').height - HP(30),
          overflow: 'scroll',
        }}>
        {tabsView}

        {selectedTab === 1 ? postListing(following) : postListing(spotlight)}
        <Touch
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.plus}>
          <View style={styles.iconPlus}>
            <Feather name="plus" size={HP(2)} />
          </View>
        </Touch>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <KeyboardAwareScrollView
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={styles.btnParentSection}>
            {loading && <Loader />}

            <Text
              style={{
                ...styles.btnText,
                marginBottom: HP(1),
                fontWeight: '900',
                letterSpacing: 1,
              }}>
              Select Image/Video
            </Text>

            {/* <Touch onPress={chooseImage} style={styles.btnSection}> */}
            <Touch onPress={gallaryPressHandler} style={styles.btnSection}>
              <Text style={styles.btnText}>Choose From Library</Text>
            </Touch>

            {/* <Touch onPress={camera} style={styles.btnSection}> */}
            <Touch onPress={cameraPressHandler} style={styles.btnSection}>
              <Text style={styles.btnText}>Launch Camera</Text>
            </Touch>

            <TextInput
              value={contentKey.contentKey}
              // onChangeText={(value) => onChangeText(value)}
              placeholder={'Select Image/Video'}
              placeholderTextColor={THEME.colors.placeHolder}
              style={{ ...styles.textInput }}
              blurOnSubmit={true}
              editable={false}
              // onPressIn={() => chooseImage()}
              onPressIn={gallaryPressHandler}
            />

            <TextInput
              value={body.caption}
              onChangeText={v => {
                setBody({ ...body, caption: v });
              }}
              placeholder={'Add Caption'}
              placeholderTextColor={THEME.colors.placeHolder}
              style={{ ...styles.textInput }}
            />

            {/* <TextInput
              value={body.description}
              onChangeText={(v) => {
                setBody({ ...body, description: v })
              }}
              placeholder={'Add Description'}
              placeholderTextColor={THEME.colors.placeHolder}
              style={{ ...styles.textInput, }}
            /> */}

            <Touch
              onPress={() => {
                save();
              }}
              style={{ ...styles.btnSection2, marginTop: WP(7) }}>
              <Text style={styles.ModalbBtnText}>Add</Text>
            </Touch>

            <Touch onPress={closeImgModal} style={styles.btnSection}>
              <Text style={styles.btnText}>Cancel</Text>
            </Touch>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  plus: {
    position: 'absolute',
    bottom: WP(10),
    right: WP(3.5),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: THEME.colors.white,
    borderRadius: HP(5) / 2,
    padding: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  iconPlus: {
    width: HP(4.8),
    height: HP(4.8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: HP(4.5) / 2,
    backgroundColor: THEME.colors.white,
  },
  btnParentSection: {
    height: HP(42),
    width: WP(75),
    marginTop: HP(30),
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
  btnText: {
    fontSize: HP(2),
  },
  btnSection2: {
    margin: HP(0.2),
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: WP(5),
    paddingVertical: WP(1),
    borderRadius: WP(6) / 2,
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

export default ActivityPage;
