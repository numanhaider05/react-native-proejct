import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage, {ResizeMode, Source} from 'react-native-fast-image';
import {RF, THEME} from '../../exporter';

const CustomAvatar = ({
  source,
  size = 15,
  resizeMode = 'cover',
}: {
  source: number | Source | any;
  size?: number;
  resizeMode?: ResizeMode;
}) => {
  return (
    <View
      style={[
        styles.container,
        {width: RF(size), height: RF(size), borderRadius: RF(size) / 2},
      ]}>
      <FastImage source={source} style={styles.img} resizeMode={resizeMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
  container: {
    alignSelf: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.lavender,
  },
});

export default CustomAvatar;
