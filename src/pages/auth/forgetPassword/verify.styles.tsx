import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME, WP, HP } from '../../../shared/exporter';

export const STYLES = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    margin: RFValue(20),
    marginTop: HP(1),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  textFieldContainer: {
    paddingHorizontal: RFValue(40),
    paddingVertical: RFValue(20),
  },
  inputFieldStyles: {
    paddingTop: RFValue(20),
    fontSize: RFValue(16),
    fontFamily: THEME.fonts.montRegular,
  },
  backBtn: {
    marginLeft: WP(3),
    marginTop: HP(2),

  },
  subHeader: {
    paddingTop: RFValue(50),
    paddingHorizontal: RFValue(40),
  },
  headerText: {
    fontSize: RFValue(17),
    fontFamily: THEME.fonts.boldJost,
    paddingTop: RFValue(20),
    marginHorizontal: WP(4),
  },
  verifyText: {
    fontSize: RFValue(17),
    fontFamily: THEME.fonts.primaryJost,
    paddingTop: RFValue(20),
    marginHorizontal: WP(4),
  },
  headerSubText: {
    color: '#898D98',
    fontSize: RFValue(20),
    fontFamily: THEME.fonts.semiBoldJost,
  },
  continueContainer: {
    width: WP(80),

    alignSelf: 'center',
    position: 'absolute',
    bottom: HP(3),
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: RFValue(30),
  },
  skipStyle: {
    alignItems: 'center',
    marginVertical: RFValue(10),
  },
  skipText: {
    paddingTop: RFValue(5),
    color: 'black',
    fontSize: RFValue(20),
    fontFamily: THEME.fonts.semiBoldJost,
  },
  removeTopShadow: {
    height: RFValue(50),
    width: '100%',
    borderTopColor: 'white',
    borderTopWidth: 2,
    backgroundColor: 'white',
    position: 'absolute',
    top: -10,
    left: 0,
    opacity: 1000,
    zIndex: 888888,
  },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: {
    marginTop: HP(10),
    marginBottom: HP(5),
    marginHorizontal: WP(10),
  },
  cell: {
    width: HP(5),
    height: HP(5),
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: THEME.colors.lavender,
    textAlign: 'center',
    backgroundColor: 'white',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 5,
  },
  focusCell: {
    borderColor: '#000',
  },
});
