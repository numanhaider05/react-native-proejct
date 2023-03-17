//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GST } from '../../exporter';
// create a component
const Wrapper = ({ children, style }: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }, style]}>
      {children}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: '100%',
    position: 'relative',
  },
});

//make this component available to the app
export default Wrapper;
