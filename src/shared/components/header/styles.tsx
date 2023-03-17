import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME } from '../../theme/colors';
import { HP, WP } from '../../theme/responsive';

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WP(2),
    paddingTop: Platform.OS === 'ios' ? HP(5) : HP(5),
    paddingBottom: HP(1),

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WP(2),
    paddingTop: Platform.OS === 'ios' ? HP(5) : HP(5),
    paddingBottom: HP(1),

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageBack: {
    height: HP(23),
    width: WP(100),
    zIndex: 99,
    position: 'relative'
  },
  tempCover: {
    position: 'absolute',
    top: 0,
    height: HP(23),
    width: WP(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  img: {
    height: HP(4.8),
    width: HP(18),
    resizeMode: 'contain'
  },
  logo: {
    height: WP(20),
    width: WP(20),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -HP(3)
  },
  logoText: {
    fontFamily: THEME.fonts.montRegular,
    // color: THEME.colors.white,
    fontWeight: 'bold',
    fontSize: HP(2.5),
    alignSelf: 'center',
    marginTop: HP(1)
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HP(1),
    height: HP(4),
    width: WP(100),
    paddingHorizontal: WP(3),
    justifyContent: 'space-between',
  },
  viewSiteTxt: {
    fontFamily: THEME.fonts.montRegular,
    marginLeft: WP(3.5),
    textDecorationLine: 'underline'
  },
  backContainer: {
    position: 'absolute',
    padding: HP(1),
    borderRadius: HP(2),
    bottom: HP(3),
    left: WP(2.5),
    borderWidth: 1,
    backgroundColor: THEME.colors.white,
  },



  penView: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: WP(10),
    right: 5,
    padding: HP(1),
    borderWidth: 2,
    borderRadius: HP(4.5) / 2,
    borderColor: '#5a7c93',
  },
  profilePencilIcon: {

  },
});

export default styles;
