import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Overlay } from 'react-native-elements';
import { RF } from '../../exporter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const CustomOverlay = ({
  visible,
  children,
  toggleOverlay,
  overlayStyle,
}: {
  visible: boolean;
  children: any;
  toggleOverlay?: () => void;
  overlayStyle?: ViewStyle;
}) => (

  <Overlay
    isVisible={visible}
    animationType={'fade'}
    onBackdropPress={toggleOverlay}
    overlayStyle={[styles.overlay, overlayStyle]}>
    {children}
  </Overlay>

);

const styles = StyleSheet.create({
  overlay: {
    borderRadius: RF(6),
  },
});

export default CustomOverlay;
