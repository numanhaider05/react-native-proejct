import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME, WP } from './../../../shared/exporter';

export const STYLES = StyleSheet.create({
  header: {
    paddingLeft: RFValue(30),
    paddingTop: RFValue(80),
  },
  headerText: {
    fontSize: RFValue(20),
    paddingTop: RFValue(20),
    fontFamily: THEME.fonts.boldJost,
  },
  headerSubText: {
    fontSize: RFValue(20),
    color: '#898D98',
    fontFamily: THEME.fonts.semiBoldJost,
  },
  choosePText: {
    color: '#808080',
    fontSize: RFValue(20),
    fontFamily: THEME.fonts.semiBoldJost,
  },
  swipeMore: {
    fontSize: RFValue(22),
    paddingTop: RFValue(20),
    fontFamily: THEME.fonts.semiBoldJost,
  },
  cardShadowContainer: {
    height: RFValue(350),
    width: RFValue(200),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    marginVertical: RFValue(5),
  },
  subtitle: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginVertical: RFValue(10),
    paddingLeft: Platform.OS === 'ios' ? RFValue(20) : RFValue(0),
  },
  subtitleStyles: {
    fontWeight: 'bold',
    fontSize: RFValue(36),
    color: '#76A3E3',
    fontFamily: THEME.fonts.montRegular,
  },
  imgWrap: {
    height: RFValue(280),
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselWrap: {
    height: RFValue(290),
  },
  slideWrap: { backgroundColor: "#fff", borderRadius: 20 }
});
