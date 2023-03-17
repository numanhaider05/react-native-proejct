import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Marker } from 'react-native-svg';
import { HP, THEME, WP } from '../../../shared/exporter';

export const STYLES = StyleSheet.create({
  heading: {
    marginLeft: WP(5),
    marginBottom: HP(1),
    fontFamily: THEME.fonts.montRegular,
    fontSize: RFValue(20),
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
    resizeMode: 'contain',
    marginRight: WP(10)
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
  }
});
