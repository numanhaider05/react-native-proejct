import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME, WP, HP } from '../../../shared/exporter';
import { Platform } from 'react-native';

export const STYLES = StyleSheet.create({
  View: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? HP(6) : HP(6),

  },
  backCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: WP(5),
    marginBottom: HP(1),
  },
  heading: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: RFValue(20),
    marginLeft: WP(5)
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: HP(0.5),
    padding: HP(1.4),
    marginHorizontal: WP(9),
    marginVertical: HP(1.5),
  },
  btnStyle: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.blck,
    fontWeight: '600',
    fontSize: RFValue(16),
  },
  bottomBtn: {
    alignSelf: 'center',
    marginVertical: HP(1),
  },
  bottomBtnText: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.blck,
    fontSize: RFValue(18),
  },






  //change Password

  inputFieldStyles: {
    paddingTop: RFValue(20),
    fontSize: RFValue(16),
    fontFamily: THEME.fonts.montRegular,
  },


  inputFieldStylesHelp: {
    fontSize: RFValue(16),
    fontFamily: THEME.fonts.montRegular,
  },
});
