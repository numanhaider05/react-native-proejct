import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME } from '../../exporter';
export const STYLES = StyleSheet.create({
  cardSubContainer: {
    width: RFValue(110),
    height: RFValue(140),
    marginVertical: RFValue(5),
    borderRadius: RFValue(15),
  },
  iosShadow: {
    shadowColor: '#D2D2D2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  androidShadow: {},
  imageStyle: {
    width: RFValue(110),
    height: RFValue(140),
    resizeMode: 'contain',
  },
  footerText: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  footerTextStyle: {
    color: 'white',
    fontFamily: THEME.fonts.boldJost,
    fontSize: RFValue(15),
  },
});
