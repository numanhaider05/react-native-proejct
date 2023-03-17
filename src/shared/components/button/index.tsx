import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME } from '../../theme/colors';
import Touch from '../touch/touch';
const AppButton = ({ name, onPress, disabled }: any) => {
  return (
    <LinearGradient colors={['#6895DE', '#98CCF2']}>
      <Touch disableIt={disabled} onPress={onPress}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>{name}</Text>
        </View>
      </Touch>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    height: RFValue(35),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontFamily: THEME.fonts.boldJost,
    color: 'white',
  },
});
export default AppButton;
