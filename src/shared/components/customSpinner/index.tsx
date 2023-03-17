import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';
import {THEME} from '../../exporter';

const CustomSpinner = ({visible}: {visible: boolean}) => {
  return (
    <Overlay isVisible={visible} overlayStyle={styles.overlay}>
      <ActivityIndicator size="large" color={THEME.colors.primary} />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomSpinner;
