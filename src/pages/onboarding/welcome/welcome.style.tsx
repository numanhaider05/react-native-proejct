import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {THEME, WP} from './../../../shared/exporter';

export const STYLES = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    margin: RFValue(20),
    marginTop: RFValue(60),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  subHeader: {
    paddingTop: RFValue(50),
    paddingHorizontal: RFValue(40),
  },
  headerText: {
    fontSize: RFValue(17),
    fontFamily: THEME.fonts.boldJost,
    paddingTop: RFValue(20),
  },
  headerSubText: {
    paddingTop: RFValue(5),
    color: '#898D98',
    fontSize: RFValue(20),
    fontFamily: THEME.fonts.semiBoldJost,
  },
  continueContainer: {
    flex: 1,
    height: 80,
    justifyContent: 'flex-end',
    marginTop: RFValue(50),
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
});
