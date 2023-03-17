import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import CustomVideoPlayer from '../customVideoPlayer';

const CustomViewer = forwardRef(
  ({source, type}: {source: any; type: string}, ref: any) => {
    return (
      <>
        {type === 'image' ? (
          <FastImage
            source={{
              uri: source,
              priority: FastImage.priority.high,
            }}
            resizeMode="contain"
            style={{width: '100%', height: '100%', zIndex: 0}}
          />
        ) : (
          <CustomVideoPlayer source={source} />
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default CustomViewer;
