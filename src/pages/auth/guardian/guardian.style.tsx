import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {THEME, WP} from './../../../shared/exporter';

export const STYLES = StyleSheet.create({
  header: {
    paddingLeft: RFValue(30),
    paddingTop: RFValue(50),
  },
  subHeader: {
    paddingLeft: RFValue(30),
  },
  headerText: {
    fontSize: RFValue(20),
    fontFamily: THEME.fonts.boldJost,
    paddingTop: RFValue(20),
  },
  headerSubText: {
    paddingTop: RFValue(5),
    color: '#898D98',
    fontSize: RFValue(20),
    fontFamily: THEME.fonts.semiBoldJost,
  },
  textFieldContainer: {
    flex: 1,
    paddingLeft: RFValue(30),
    paddingRight: RFValue(40),
    paddingTop: RFValue(20),
  },
  textField: {
    fontFamily: THEME.fonts.montRegular,
    paddingTop: RFValue(20),
    fontSize: RFValue(16),
  },
  imageContainer: {
    flex: 1,
    marginLeft: RFValue(5),
  },
  imageStyles: {
    height: 190,
    width: '100%',
    resizeMode: 'contain',
    marginTop: RFValue(40),
  },
  continueContainer: {
    flex: 1,
    height: 80,
    justifyContent: 'flex-end',
    marginTop: RFValue(50),
  },
});
