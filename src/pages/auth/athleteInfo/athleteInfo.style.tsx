import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME, WP, HP } from './../../../shared/exporter';

export const STYLES = StyleSheet.create({
  error: {
    color: THEME.colors.error,
    marginBottom: RFValue(5)
  },
  header: {
    paddingLeft: RFValue(30),
    paddingTop: RFValue(20),
  },
  subHeader: {
    paddingLeft: RFValue(20),
  },
  headerText: {
    fontSize: RFValue(20),
    fontFamily: THEME.fonts.boldJost,
    paddingTop: RFValue(20),
  },
  topBgImage: {
    flex: 1,
    position: 'absolute',
    height: RFValue(180),
    width: RFValue(200),
    top: RFValue(90),
    left: RFValue(40),
  },
  textField: {
    paddingBottom: RFValue(5),
    fontSize: RFValue(16),
    fontFamily: THEME.fonts.montRegular,
  },
  schoolIdField: {
    fontSize: RFValue(16),
    fontFamily: THEME.fonts.montRegular,
    borderBottomWidth: 2,
    borderColor: '#C7C7CD'
  },
  headerSubText: {
    fontSize: RFValue(20),
    fontFamily: THEME.fonts.semiBoldJost,
    color: '#898D98',
  },
  textFieldContainer: {
    paddingHorizontal: RFValue(40),
    paddingTop: RFValue(20),
  },
  bottomBgImage: {
    flex: 1,
    position: 'absolute',
    height: RFValue(180),
    width: RFValue(200),
    left: RFValue(118),
    bottom: RFValue(130),
  },
  footerContainer: {
    paddingHorizontal: RFValue(40),
    paddingTop: RFValue(60),
  },
  competeUnderline: {
    borderBottomColor: '#D2D2D2',
    borderBottomWidth: 2,
    width: 125,
  },
  competeStyle: {
    lineHeight: RFValue(40),
    fontSize: RFValue(16),
    fontFamily: THEME.fonts.montRegular,
  },
  choiceContainer: {
    flexDirection: 'row',
    marginTop: RFValue(20),
  },
  mSportContainer: {
    paddingRight: RFValue(10),
    paddingTop: RFValue(10),
  },
  mSportActive: {
    color: 'white',
    paddingHorizontal: RFValue(10),
    paddingTop: RFValue(10),
    backgroundColor: 'black',
    borderTopLeftRadius: RFValue(10),
    borderBottomLeftRadius: RFValue(10),
    padding: RFValue(5),
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  wSportActive: {
    color: 'white',
    paddingHorizontal: RFValue(10),
    paddingTop: RFValue(10),
    backgroundColor: 'black',
    borderTopRightRadius: RFValue(10),
    borderBottomRightRadius: RFValue(10),
    padding: RFValue(5),
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  mSportActiveText: {
    color: 'white',
  },
  textColor: {
    fontSize: RFValue(14),
    color: '#808080',
    fontFamily: THEME.fonts.montRegular,
  },
  verticalDivider: {
    height: 38,
    width: 3,
    backgroundColor: 'black',
  },
  wSportContainer: {
    paddingLeft: RFValue(10),
    paddingTop: RFValue(10),
  },
  continueContainer: {
    marginTop: RFValue(30),
    marginBottom: HP(5)
  },
  choosePText: {
    color: '#808080',
    fontSize: 18,
    fontWeight: 'bold',
  },
  activeText: {
    color: 'white',
    fontSize: RFValue(14),
    fontFamily: THEME.fonts.montRegular,
  },
  dobFieldWrap: {
    width: '100%',
    justifyContent: 'center',
    borderBottomColor: '#D2D2D2',
    borderBottomWidth: RFValue(2),
  }
});
