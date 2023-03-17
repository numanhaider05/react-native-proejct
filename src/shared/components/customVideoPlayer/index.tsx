import React, {useEffect, useRef} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import {RF} from '../../exporter';

const CustomVideoPlayer = ({source}: {source: any}) => {
  const playerRef = useRef(null);

  const onBuffer = () => {
    console.log('buffering');
  };

  const onVideoError = () => {};
  return (
    <View style={styles.container}>
      <Video
        fullscreen
        repeat={false}
        source={{uri: source}}
        resizeMode={'cover'}
        ref={playerRef}
        onBuffer={onBuffer}
        onError={onVideoError}
        style={styles.backgroundVideo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default CustomVideoPlayer;
