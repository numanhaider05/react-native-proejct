import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomAvatar from '../../../shared/components/customAvatar';
import CustomText from '../../../shared/components/customText';
import {HP, WP} from '../../../shared/exporter';

const StoryBtnStack = ({
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
      <TouchableOpacity
        style={{
          height: HP(50),
          width: WP(80),
          marginBottom: WP(20),
          backgroundColor: 'transparent',
        }}
        onPress={() =>
          navigation.navigate('PostViewScreen', {postId: item.id})
        }></TouchableOpacity>
      <View style={styles.leftDetail}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UserDetails', {item: item.userId})
          }
          style={styles.profile}>
          <CustomAvatar
            source={item.pictureUrl ? {uri: item.pictureUrl} : userPlaceholder}
          />
          <CustomText>{item.userName}</CustomText>
        </TouchableOpacity>
        <View>
          <CustomText style={styles.text}>{item.caption}</CustomText>
        </View>
      </View>
      <View style={styles.sideBar}>
        <View style={styles.profile}>
          <View style={styles.icon}>
            <Feather name="user-plus" size={HP(3)} color={THEME.colors.white} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            isLiked ? unlike() : like();
          }}
          style={styles.profile}>
          <CustomText style={styles.iconsTxt}>{likes}</CustomText>
          <View
            style={{
              ...styles.icon,
              backgroundColor: isLiked ? THEME.colors.primary : 'transparent',
            }}>
            <FA name="diamond" size={HP(3)} color={THEME.colors.white} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          style={styles.profile}>
          <CustomText style={styles.iconsTxt}>{noComments}</CustomText>
          <View style={styles.icon}>
            <Feather
              name="message-square"
              size={HP(3)}
              color={THEME.colors.white}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onShare()} style={styles.profile}>
          <CustomText style={styles.iconsTxt}>{item.noOfShare}</CustomText>
          <View style={styles.icon}>
            <Feather name="send" size={HP(3)} color={THEME.colors.white} />
          </View>
        </TouchableOpacity>
        <View style={{height: HP(8)}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default StoryBtnStack;
