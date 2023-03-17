import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  View,
  Modal,
  DeviceEventEmitter,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FA from 'react-native-vector-icons/FontAwesome';

import { STYLES } from './activityPage.style';
import { HP, RF, THEME, WP } from '../../../shared/exporter';
import PostItem from '../../../shared/components/home/PostItem';
import Touch from '../../../shared/components/touch/touch';
import Loader from '../../../shared/components/loader';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import { RootStateOrAny, useSelector } from 'react-redux';
import {
  getPostById,
  likePost,
  unLikePost,
  userFollowingsPosts,
} from '../../../shared/services/HomeService';
import helpers from '../../../shared/utils/helpers';
import Comments from '../../../shared/components/home/Comments';
import Share from 'react-native-share';
import { GenericNavigation } from '../../../shared/models/interface';
import VideoPlayer from '../../../shared/components/video/videoWrap';

const PostViewScreen = ({ navigation, route }: any) => {
  const { user } = useSelector((state: RootStateOrAny) => state.root.user);

  const refRBSheet: any = useRef();

  const [imgLoading, setImgLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState(route.params?.postId);
  const [isComment, setisComment] = useState(route.params?.comment);
  const [post, setPost] = useState<any>([]);

  const [likes, setLikes] = useState(parseInt(post.noOfLikes));
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [noComments, setNoComments] = useState(post.noOfComments);

  const isFocused = useIsFocused();

  useEffect(() => {
    isComment
      ? setTimeout(function () {
        refRBSheet.current.open();
      }, 1000)
      : {};
  }, [post]);

  useEffect(() => {
    setLoading(true);
    getPosts();
  }, [isFocused]);

  const getPosts = () => {
    setLoading(true);
    // userPosts(user.id)
    getPostById(postId)
      .then(res => {
        setPost(res.data.data);
        // console.log(res.data.data);
        setLikes(res.data.data.noOfLikes);
        setIsLiked(res.data.data.isLiked);
        setNoComments(res.data.data.noOfComments);
      })
      .catch(err => { })
      .finally(() => {
        setLoading(false);
      });
  };

  const like = () => {
    // setLoading(true);

    setLikes(likes + 1);
    setIsLiked(true);
    let token = user.accessToken;
    const params = post.id;

    likePost(params, token)
      .then(res => {
        // console.log(res.data);
        // helpers.showToastSuccess('Liked')
      })
      .catch(err => {
        console.log(err.response.data.meta.message);
        helpers.showToastSuccess(err.response.data.meta.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const unlike = () => {
    let token = user.accessToken;
    const params = post.id;

    setLikes(likes - 1);
    setIsLiked(false);

    unLikePost(params, token)
      .then(res => {
        // helpers.showToastSuccess('Un-liked')
      })
      .catch(err => {
        helpers.showToastSuccess(err.response.data.meta.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onShare = async () => {
    const params = post.id;

    const shareOption: any = {
      message: `www.nxtgem.com/Posting/?postId=${params}`,
    };

    Share.open(shareOption)
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const profileDetails = (
    <View style={styles.details}>
      <View>
        <Touch
          onPress={() =>
            navigation.navigate('UserDetails', { item: post.userId })
          }
          style={styles.profile1}>
          {post.pictureUrl ? (
            <FastImage
              source={{ uri: post.pictureUrl }}
              style={[
                styles.profileImage,
                { borderColor: 'rgb(28,93,153)' },
              ]}
            />
          ) : (
            <View
              style={{
                ...styles.profileImage,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FA name={'user'} style={{ fontSize: WP(8) }} />
            </View>
          )}

          <Text style={styles.textName}>{post.userName}</Text>
        </Touch>
        <View>
          <Text style={styles.text}>{post.caption}</Text>
        </View>
      </View>
    </View>
  )

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1, position: 'relative', flexDirection: 'column' }}>
          <>
            {post.contents[0].type.includes('video') ? (
              <VideoPlayer
                currentItemNumber={1}
                currentVideoIndex={0}
                videoUrl={post.contents[0].contentUrl}
                wrapperStyle={{ width: '100%', height: '100%' }}>
                {profileDetails}
              </VideoPlayer>
            ) : (
              <>
                <View style={styles.imageBack}>
                  <FastImage style={{ width: '100%', height: '100%' }} source={{ uri: post.contents[0].contentUrl }} resizeMode={'contain'} />
                  {profileDetails}
                </View>
              </>
            )}


            <RBSheet
              ref={refRBSheet}
              height={HP(50)}
              customStyles={{
                container: {
                  borderTopRightRadius: HP(3),
                  borderTopLeftRadius: HP(3),
                },
                wrapper: {
                  height: HP(50),
                },
                draggableIcon: {
                  backgroundColor: '#000',
                },
              }}>
              <Comments
                post={post}
                user={user}
                noComments={noComments}
                setNoComments={setNoComments}
              />
            </RBSheet>
          </>
          <View style={styles.sideBar}>
            <Touch
              onPress={() => {
                isLiked ? unlike() : like();
              }}
              style={{ ...styles.profile }}>
              <View
                style={{
                  ...styles.icon,
                  backgroundColor: isLiked
                    ? THEME.colors.primary
                    : 'transparent',
                }}>
                <FA name="diamond" size={HP(3)} color={THEME.colors.blck} />
              </View>
              <Text style={styles.iconsTxt}>{likes}</Text>
            </Touch>
            <Touch
              onPress={() => refRBSheet.current.open()}
              style={styles.profile}>
              <View style={styles.icon}>
                <Feather
                  name="message-square"
                  size={HP(3)}
                  color={THEME.colors.blck}
                />
              </View>
              <Text style={styles.iconsTxt}>{noComments}</Text>
            </Touch>
            <Touch
              onPress={() => {
                onShare();
              }}
              style={styles.profile}>
              <View style={styles.icon}>
                <Feather name="send" size={HP(3)} color={THEME.colors.blck} />
              </View>
              <Text style={styles.iconsTxt}>{post.noOfShare}</Text>
            </Touch>
            <View style={{ height: HP(8) }} />
          </View>
        </View>
      )}
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
  imageBack: {
    height: '85%',
    width: '100%',
    zIndex: 9,
    backgroundColor: THEME.colors.blck
  },
  details: {
    position: 'absolute',
    bottom: 0,
    zIndex: 99,
    width: '100%',
    minHeight: RF(100),
    flexDirection: 'column',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: THEME.colors.overlay,
  },
  profile: {
    marginRight: WP(4),
    alignItems: 'center',
  },

  profile1: {
    marginRight: WP(4),
    alignItems: 'flex-start',
  },
  textName: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.white,
    fontWeight: '800',
    marginVertical: WP(2),
  },
  profileImage: {
    backgroundColor: 'white',
    height: HP(6),
    width: HP(6),
    borderRadius: HP(6) / 2,
    borderWidth: 3,
  },
  title: {
    width: WP(60),
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.white,
    fontWeight: '500',
  },
  text: {
    width: WP(70),
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.white,
    fontWeight: '500',
  },
  sideBar: {
    margin: WP(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: HP(5),
    height: HP(5),
    marginBottom: WP(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: HP(5) / 2,
    borderWidth: 1.5,
    borderColor: THEME.colors.blck,
  },
  iconsTxt: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.blck,
    fontWeight: '500',
  },
});

export default PostViewScreen;
