import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Marker } from 'react-native-svg';
import { HP, THEME, WP } from '../../../shared/exporter';

export const STYLES = StyleSheet.create({
  heading: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: RFValue(20),
    marginLeft: WP(5)
  },
  backCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: WP(5),
    marginBottom: HP(1),
  },
  cont: {
    marginVertical: WP(1),
    marginHorizontal: WP(4),
    paddingHorizontal: WP(5),
    paddingVertical: WP(3),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  logo: {
    height: WP(10),
    width: WP(10),
    resizeMode: 'stretch',
    marginRight: WP(6),
    borderRadius: WP(10) / 2
  },

  title: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: RFValue(13),
    fontWeight: 'bold',
    width: WP(58)
  },
  text: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: RFValue(12),
    width: WP(60)
  },

  swipePressable: {
    marginTop: HP(0.5),
    width: WP(20),
    height: HP(7.3),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  swipeimage: {
    height: WP(7.5),
    width: WP(7.5),
    tintColor: 'white'
  },
  swipeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: HP(2)
  },

  name: {
    fontWeight: 'bold'
  },
  recommendation: {
    flex: 1
  },
  gradient: {
    margin: WP(3.5),
    marginRight: 0,
    height: HP(5),
    width: WP(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: HP(0.7)
  },
  moreInfo: {
    color: THEME.colors.white,
    fontSize: HP(1.8),
    fontWeight: '800'
  },
});
