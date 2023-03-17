import { StyleSheet } from 'react-native';
import { THEME } from './colors';
import { WP } from './responsive';
import { RFValue as RF } from 'react-native-responsive-fontsize';

export const GST = StyleSheet.create({
  headingFontSize: {
    fontSize: RF(45),
    fontFamily: THEME.fonts.boldJost,
  },
  normalFontSize: {
    fontSize: RF(20),
    fontFamily: THEME.fonts.montRegular,
  },
  mrgnBtm: {
    marginBottom: WP(4),
  },
  wrap: { paddingTop: 0 },
  btnG: {
    width: WP(40),
    padding: WP(5),
    backgroundColor: THEME.colors.btnBck,
    alignItems: 'center',
    borderRadius: 20,
  },
  txt: {
    color: THEME.colors.light,
    fontSize: WP(5),
    fontFamily: THEME.fonts.montRegular,
  },
  upCircle: {
    position: 'absolute',
    top: 5,
    right: 0,
    width: WP(20),
    height: WP(20),
  },
  wedge: {
    position: 'absolute',
    top: WP(40),
    left: 0,
    width: WP(15),
    height: WP(15),
  },
  dwn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: WP(25),
    height: WP(25),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
