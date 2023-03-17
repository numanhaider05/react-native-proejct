import React, { createRef, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  DeviceEventEmitter,
} from 'react-native';
// import Modal from 'react-native-modalbox';
import GestureRecognizer from 'react-native-swipe-gestures';
import ProgressArray from './ProgressArray';
import { RFValue as RF } from 'react-native-responsive-fontsize';
import { THEME } from '../../theme/colors';
import FastImage from 'react-native-fast-image';
import F from 'react-native-vector-icons/FontAwesome';
import { WP } from '../../theme/responsive';
import Touch from '../touch/touch';
import { displayAlert } from '../../utils/helpers';
import { deleteStory, viewStory } from '../../services/HomeService';
import { useDispatch } from 'react-redux';
import { removeStory } from '../../store/reducers/userReducer';
import Sheet from '../sheet/sheet';
import moment from 'moment';
import CustomViewer from '../customViewer';
import VideoPlayer from '../video/videoWrap';

const actionSheetRef: any = createRef();
const SCREEN_WIDTH = Dimensions.get('window').width;

const StoryContainer = (props: {
  onStoryNext?: any;
  onStoryPrevious?: any;
  onClose?: any;
  isNewStory?: any;
  status?: any;
  nowShowing: boolean;
}) => {
  const { status } = props;
  const { stories = [] } = status || {};
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModelOpen, setModel] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [viewOpened, setViewsOpened] = useState(false);
  const [duration, setDuration] = useState(3);
  const story = stories.length ? stories[currentIndex] : {};
  // const { isReadMore, url } = story || {};
  // const onVideoLoaded = (length) => {
  //   props.onVideoLoaded(length.duration);
  // };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  useEffect(() => {
    // console.log(status);
    if (!status.own) {
      increaseView();
    }
  }, [currentIndex]);

  const increaseView = () => {
    viewStory(stories[currentIndex].id)
      .then(sucs => {
        // console.log(sucs);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const changeStory = (evt: any) => {
    // console.log('side click event', evt);
    if (evt.locationX > SCREEN_WIDTH / 2) {
      nextStory();
    } else {
      prevStory();
    }
  };

  const nextStory = () => {
    if (stories.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
      setLoaded(false);
      setDuration(3);
    } else {
      if (stories.length - 1 == currentIndex) {
        props.onStoryNext();
      } else {
        setCurrentIndex(0);
        setLoaded(false);
        setDuration(3);
      }
    }
  };

  const shouldCallNextStory = () => {
    if (!story.type.includes('video')) {
      nextStory();
    }
  }

  const prevStory = () => {
    if (currentIndex > 0 && stories.length) {
      setCurrentIndex(currentIndex - 1);
      setLoaded(false);
      setDuration(3);
    } else {
      // setCurrentIndex(0);
      props.onStoryPrevious();
    }
  };

  const onImageLoaded = () => {
    setLoaded(true);
  };

  const onPause = (result: boolean | ((prevState: boolean) => boolean)) => {
    setIsPause(result);
  };

  const onSwipeDown = () => {
    if (!viewOpened) props.onClose();
    // if (!isModelOpen) {
    //   props.onClose();
    // } else {
    //   setModel(false);
    // }
  };

  const onSwipeUp = () => {
    if (!isModelOpen) {
      setModel(true);
    }
  };

  return (
    <>
      <GestureRecognizer
        onSwipeDown={onSwipeDown}
        onSwipeUp={onSwipeUp}
        config={config}
        style={styles.container}>
        {status.own ? (
          <>
            <Touch
              onPress={() => {
                setIsPause(true);
                displayAlert(
                  'Are you sure?',
                  'Do you really want to delete this story?',
                  true,
                  (what: boolean) => {
                    if (what) {
                      deleteStory(story.id)
                        .then(() => {
                          onSwipeDown();
                          dispatch(removeStory(story));
                        })
                        .catch(() => { });
                    } else {
                      setIsPause(false);
                    }
                  },
                );
              }}
              style={styles.trashWrap}>
              <F name={'trash'} style={styles.icn} size={WP(8)} />
            </Touch>
            <Touch
              onPress={() => {
                setIsPause(true);
                setViewsOpened(true);
                actionSheetRef.current?.setModalVisible();
              }}
              style={styles.viewsWrap}>
              <F
                name={'angle-double-up'}
                style={[styles.icn, { position: 'absolute', bottom: 30 }]}
                size={WP(8)}
              />
              <F name={'eye'} style={styles.icn} size={WP(5)} />
              <Text style={styles.noOfViews}>{story.noOfViews}</Text>
            </Touch>
          </>
        ) : null}

        <TouchableOpacity
          activeOpacity={1}
          // delayLongPress={200}
          onPress={e => changeStory(e.nativeEvent)}
          onLongPress={() => onPause(true)}
          onPressOut={() => onPause(false)}
          style={styles.container}>
          <View style={[styles.container]}>
            {
              story.type.includes('video') ?
                <VideoPlayer
                  currentItemNumber={0}
                  currentVideoIndex={0}
                  videoUrl={story.content}
                  pauseIt={isPause}
                  type={'story'}
                  wrapperStyle={{ width: '100%', height: Dimensions.get('window').height }}
                  videoLoaded={(res: any) => {
                    setDuration(res.duration);
                  }}
                  onBuffered={() => {
                    setLoaded(true);
                  }}
                  onVideoEnded={() => {
                    nextStory();
                  }}
                ></VideoPlayer> :
                <FastImage
                  source={{
                    uri: story.content,
                    priority: FastImage.priority.high,
                  }}
                  onLoadEnd={onImageLoaded}
                  resizeMode="contain"
                  style={{ width: '100%', height: '100%', zIndex: 0 }}
                />
            }

            <CustomViewer source={story.content} type={'video'} />
            {props.nowShowing ? (
              <ProgressArray
                next={shouldCallNextStory}
                isLoaded={isLoaded}
                duration={duration}
                pause={isPause}
                isNewStory={props.isNewStory}
                stories={stories}
                currentIndex={currentIndex}
                currentStory={stories[currentIndex]}
                length={stories.map((_: any, i: any) => i)}
                progress={{ id: currentIndex }}
              />
            ) : null}
            <Sheet
              ref={actionSheetRef}
              isCustomView={true}
              itIsClosed={() => {
                setViewsOpened(false);
              }}>
              {story.views.map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      actionSheetRef.current?.hide();
                    }}>
                    <View
                      style={{
                        marginVertical: 15,
                        borderRadius: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingBottom: 5,
                        borderBottomWidth: 1,
                        borderBottomColor: THEME.colors.mdlBack,
                      }}>
                      <Text>{item.name || 'Numan Dallan'}</Text>
                      <Text>{moment(item.viewedAt).fromNow()}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Sheet>
          </View>
        </TouchableOpacity>
      </GestureRecognizer>
    </>
  );
};

const styles = StyleSheet.create({
  trashWrap: {
    position: 'absolute',
    zIndex: 9999,
    top: WP(15),
    right: WP(5),
    width: WP(10),
    height: WP(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewsWrap: {
    position: 'absolute',
    zIndex: 9999,
    bottom: WP(9),
    left: Dimensions.get('window').width / 2 - 25,
    width: WP(15),
    height: WP(15),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  noOfViews: { color: '#fff', fontWeight: 'bold' },
  icn: {
    color: '#fff',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtPlace: {
    flex: 0.4,
    width: '100%',
    padding: RF(25),
    paddingTop: RF(70),
  },
  btnPlace: {
    flex: 0.6,
    width: '100%',
    alignItems: 'center',
    padding: RF(25),
  },
  norms: {
    marginTop: RF(10),
    color: THEME.colors.light,
  },
  bckImg: {
    width: RF(250),
    height: RF(250),
  },
  head: {
    color: THEME.colors.light,
  },
  btn: {
    width: '100%',
    padding: RF(15),
    backgroundColor: THEME.colors.light,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnTxt: {
    // fontFamily: THEME.fonts.desc,
    fontWeight: 'bold',
    fontSize: RF(20),
    color: THEME.colors.blck,
  },
  progressBarArray: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    width: '98%',
    height: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 55,
    width: '98%',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 3,
    marginLeft: 12,
    color: 'white',
  },
  content: {
    width: '100%',
    height: '100%',
  },
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '100%',
    height: '90%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bar: {
    width: 50,
    height: 8,
    backgroundColor: 'gray',
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 8,
  },
});

export default StoryContainer;
