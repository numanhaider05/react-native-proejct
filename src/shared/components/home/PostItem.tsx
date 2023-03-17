import React, { useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Share from 'react-native-share';
import Feather from 'react-native-vector-icons/Feather';
import FA from 'react-native-vector-icons/FontAwesome';
import { userPlaceholder } from '../../../assets/images';
import {
  likePost,
  sharePost,
  unLikePost,
} from '../../../shared/services/HomeService';
import { THEME } from '../../theme/colors';
import { HP, RF, WP } from '../../theme/responsive';
import helpers from '../../utils/helpers';
import CustomAvatar from '../customAvatar';
import Touch from '../touch/touch';
import Comments from './Comments';
import VideoPlayer from '../video/videoWrap';


const sheetCustomStyles = {
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
};

const PostItem = ({ navigation, item, user, refresh, setLoading, index, currentVideoIndex }: any) => {
  const [likes, setLikes] = useState(parseInt(item?.noOfLikes));
  const [isLiked, setIsLiked] = useState(item?.isLiked);
  const [noComments, setNoComments] = useState(item?.noOfComments);
  const refRBSheet: any = useRef();

  const share = () => {
    setLoading(true);
    let token = user.accessToken;
    const params = item.id;
    sharePost(params, token)
      .then(res => {
        console.log(res.data);
        helpers.showToastSuccess('Shared');
        refresh();
      })
      .catch(err => {
        console.log(err.response.data.meta.message);
        helpers.showToastSuccess(err.response.data.meta.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onShare = async () => {
    const params = item.id;
    const shareOption: any = {
      message: `www.nxtgem.com/Posting/?postId=${params}`,
    };
    Share.open(shareOption)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const like = () => {
    setLikes(likes + 1);
    setIsLiked(true);
    let token = user.accessToken;
    const params = item.id;

    likePost(params, token)
      .then(res => {
        refresh();
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
    const params = item.id;

    setLikes(likes - 1);
    setIsLiked(false);

    unLikePost(params, token)
      .then(res => {
        refresh();
      })
      .catch(err => {
        helpers.showToastSuccess(err.response.data.meta.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>

      {item.contents[0].type.includes('video') ? (
        <VideoPlayer
          currentItemNumber={index}
          currentVideoIndex={currentVideoIndex}
          videoUrl={item.contents[0].contentUrl}
          wrapperStyle={styles.imageBack}>
          <StoryFrontLayer
            {...{
              navigation,
              item,
              isLiked,
              likes,
              like,
              unlike,
              refRBSheet,
              noComments,
              onShare,
            }}
          />
        </VideoPlayer>
      ) : (
        <ImageBackground
          resizeMode={'stretch'}
          source={{ uri: item?.contents[0].contentUrl }}
          imageStyle={styles.imageBack}
          style={styles.imageBack}>
          <StoryFrontLayer
            {...{
              navigation,
              item,
              isLiked,
              likes,
              like,
              unlike,
              refRBSheet,
              noComments,
              onShare,
            }}
          />
        </ImageBackground>
      )}

      <RBSheet
        ref={refRBSheet}
        height={HP(50)}
        customStyles={sheetCustomStyles}>
        <Comments
          post={item}
          user={user}
          noComments={noComments}
          setNoComments={setNoComments}
        />
      </RBSheet>
    </>
  );
};

const StoryFrontLayer = ({
  navigation,
  item,
  isLiked,
  likes,
  like,
  unlike,
  refRBSheet,
  noComments,
  onShare,
}: {
  navigation: any;
  item: any;
  isLiked: boolean;
  likes: number;
  like: () => void;
  unlike: () => void;
  refRBSheet: any;
  noComments: string;
  onShare: () => void;
}) => {
  return (
    <View style={styles.details}>
      <View style={styles.leftDetail}>
        <Touch
          onPress={() =>
            navigation.navigate('UserDetails', { item: item.userId })
          }
          style={styles.profile}>
          <CustomAvatar
            source={
              item?.pictureUrl ? { uri: item?.pictureUrl } : userPlaceholder
            }
          />
          <Text style={styles.textName}>{item?.userName}</Text>
        </Touch>
        <View>
          <Text style={styles.text}>{item?.caption}</Text>
        </View>
      </View>
      <View style={styles.sideBar}>
        <View style={styles.profile}>
          <View style={styles.icon}>
            <Feather name="user-plus" size={HP(3)} color={THEME.colors.white} />
          </View>
        </View>
        <Touch
          onPress={() => {
            isLiked ? unlike() : like();
          }}
          style={{ ...styles.profile }}>
          <Text style={styles.iconsTxt}>{likes}</Text>
          <View
            style={{
              ...styles.icon,
              backgroundColor: isLiked ? THEME.colors.primary : 'transparent',
            }}>
            <FA name="diamond" size={HP(3)} color={THEME.colors.white} />
          </View>
        </Touch>
        <Touch onPress={() => refRBSheet.current.open()} style={styles.profile}>
          <Text style={styles.iconsTxt}>{noComments}</Text>
          <View style={styles.icon}>
            <Feather
              name="message-square"
              size={HP(3)}
              color={THEME.colors.white}
            />
          </View>
        </Touch>
        <Touch onPress={() => onShare()} style={styles.profile}>
          <Text style={styles.iconsTxt}>{item?.noOfShare}</Text>
          <View style={styles.icon}>
            <Feather name="send" size={HP(3)} color={THEME.colors.white} />
          </View>
        </Touch>
        <Touch onPress={() => {
          navigation.navigate('PostViewScreen', { postId: item.id })
        }} style={styles.profile}>
          <View style={styles.icon}>
            <FA name="info" size={HP(3)} color={THEME.colors.white} />
          </View>
        </Touch>
      </View>
    </View>
  );
};

const heightOfPost = Dimensions.get('window').height - HP(30);

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  loadingWrap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: heightOfPost,
    backgroundColor: THEME.colors.overlay,
    margin: 'auto',
    zIndex: 999
  },
  animationIcon: {
    height: 150,
    width: 150
  },
  imageBack: {
    height: heightOfPost,
    width: WP(100),
    zIndex: 9,
  },
  postViewContainer: {
    height: HP(50),
    width: WP(80),
    marginBottom: WP(20),
    backgroundColor: 'blue',
  },
  details: {
    position: 'absolute',
    left: RF(20),
    right: RF(20),
    flexDirection: 'row',
    bottom: RF(50),
    zIndex: 9999
  },
  leftDetail: {
    position: 'absolute',
    bottom: 0,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HP(1),
  },
  textName: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.white,
    fontWeight: '800',
    marginLeft: 10,
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
    position: 'absolute',
    alignItems: 'flex-end',
    bottom: RF(50),
    right: 0,
  },
  icon: {
    width: HP(5),
    height: HP(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: HP(5) / 2,
    borderWidth: 1.5,
    borderColor: THEME.colors.white,
  },
  iconsTxt: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.white,
    fontWeight: '500',
    marginRight: WP(2),
  },

  plus: {
    marginTop: HP(3),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HP(1),
    borderWidth: 2,
    borderColor: THEME.colors.white,
    borderRadius: HP(5) / 2,
    padding: 1,
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

export default PostItem;
