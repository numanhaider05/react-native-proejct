import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME, WP } from './../../../shared/exporter';

export const STYLES = StyleSheet.create({
  header: {
    paddingLeft: RFValue(30),
    paddingTop: RFValue(50),
  },
  subHeader: {
    paddingLeft: RFValue(30),
  },
  skipStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: RFValue(20),
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
  cardContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
    width: '100%',
    height: '100%',
    borderRadius: RFValue(15),
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
  nextArrowContainer: {
    height: RFValue(50),
    alignSelf: 'flex-end',
    marginRight: RFValue(30),
  },
});
