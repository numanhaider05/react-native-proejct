//import liraries
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import I from 'react-native-vector-icons/Feather';
import { THEME } from '../../theme/colors';
import { HP, WP } from '../../theme/responsive';

const Loader = (props: any) => {
  return (
    <View style={[styles.container, styles.horizontal, props.style]}>
      <ActivityIndicator size='large' color={THEME.colors.primary} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    position: 'absolute',
    height: HP(100),
    width: WP(100),
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 99
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Loader;
