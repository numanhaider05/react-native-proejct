import { StyleSheet } from 'react-native';
import { HP, THEME, WP } from '../../../shared/exporter';

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white
  },
  sendWrap: { width: WP(10), height: WP(8), alignSelf: 'center', alignItems: 'center', justifyContent: 'center' },
  iconPlus: {
    width: WP(6),
    height: WP(6),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: HP(4.5) / 2,
    borderWidth: 1,
    borderColor: THEME.colors.blck,
    backgroundColor: THEME.colors.white
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
  profileImage: {
    backgroundColor: 'white',
    height: HP(5),
    width: HP(5),
    borderRadius: HP(6) / 2,
    marginRight: WP(3),
    borderWidth: 3,
  },
  chatProfileImage: {
    backgroundColor: 'white',
    height: HP(7),
    width: HP(7),
    borderRadius: HP(7) / 2,
    marginRight: WP(3),
    borderWidth: 1.5,
    borderColor: THEME.colors.blck
  },
  titlename: {
    fontSize: HP(1.8),
    fontFamily: THEME.fonts.montRegular,
    fontWeight: 'bold'
  },
  active: {
    fontSize: HP(1.6),
    fontFamily: THEME.fonts.montRegular,
  },
  chattime: {
    fontSize: HP(1.9),
    fontWeight: 'bold',
    fontFamily: THEME.fonts.montRegular,
  },
  chatTitle: {
    fontSize: HP(1.9),
    fontFamily: THEME.fonts.montRegular,
    fontWeight: 'bold',
  },
  chatText: {
    width: WP(70),
    marginTop: HP(0.5),
    fontSize: HP(1.8),
    fontFamily: THEME.fonts.montRegular,
  },
  chatImage: {
    alignSelf: 'center',
    height: HP(13),
    width: WP(70)
  },

  rbTopText: {
    alignSelf: 'center',
    marginTop: HP(3),
    fontSize: HP(2.3),
    fontWeight: 'bold',
  },
  rbbtnsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HP(7),
    justifyContent: 'space-between',
    paddingHorizontal: WP(8),
  },
  rbbtn: {
    borderWidth: 1,
    padding: HP(1.8),
    borderRadius: HP(1),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

  },
  rbImg: {
  }
});
