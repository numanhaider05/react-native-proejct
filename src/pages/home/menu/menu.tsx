import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME, WP, HP } from '../../../shared/exporter';
import { Platform } from 'react-native';

export const STYLES = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: THEME.colors.white
  },
  close: {
    marginTop: Platform.OS === 'ios' ? HP(6) : HP(6),
    alignSelf: 'flex-end',
    right: WP(4)
  },
  profile: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  textName: {
    marginTop: HP(0.8),
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.blck,
    fontWeight: '900',
    fontSize: RFValue(17),
  },
  profileImage: {
    backgroundColor: 'white',
    height: HP(15),
    width: HP(15),
    borderRadius: HP(15) / 2,
    borderWidth: 3,
  },
  pencilIcon: {
    position: 'absolute',
    right: -WP(5),
    bottom: 0
  },
  calendar: {
    marginTop: HP(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: WP(8),
    paddingBottom: HP(2),
    borderBottomColor: 'grey',
    borderBottomWidth: 5
  },
  calendarIcon: {

  },
  textCalendar: {
    width: WP(60),
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.blck,
    fontWeight: '900',
    fontSize: RFValue(22),
    textAlign: 'center'
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
  bottomBtns: {
    marginTop: HP(3)
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





  /// connections styles


  heading: {
    marginLeft: WP(5),
    marginBottom: HP(1),
    fontFamily: THEME.fonts.boldJost,
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
