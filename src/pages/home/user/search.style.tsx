import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { HP, THEME, WP } from '../../../shared/exporter';

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white
  },
  textField: {
    marginLeft: WP(2.5),
    width: WP(72),
    fontFamily: THEME.fonts.montRegular,
    fontSize: RFValue(15),
  },
  searchIcon: {
    height: HP(2.5),
    width: HP(2.5),
    resizeMode: 'contain'
  },
  textFieldContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: THEME.colors.placeHolder,
    borderBottomColor: THEME.colors.placeHolder,
    borderRadius: HP(3) / 2,
    width: WP(95),
    padding: HP(1),
    alignSelf: 'center'
  },
  cardContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tabs: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: HP(4),
    borderColor: THEME.colors.gray,
    borderBottomWidth: 1,
  },
  selectedTab: {
    alignItems: 'center',
    width: WP(20),
    borderBottomWidth: HP(0.8),
    marginHorizontal: WP(2),
    borderColor: '#ebc77a'
  },
  tab: {
    alignItems: 'center',
    width: WP(22),
    marginHorizontal: WP(1)
  },
  tabText: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(1.8)
  },
  subtabs: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: HP(3),
    paddingBottom: HP(0.3),
    borderColor: THEME.colors.gray,
    borderBottomWidth: 1,
    marginHorizontal: WP(8)
  },
  subtab: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: WP(27),
    marginHorizontal: WP(1)
  },
  subtabText: {
    marginRight: WP(2),
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(1.8)
  },
  recommendation: {
    height: HP(75),
  },
  recommendationText: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(1.8),
  },
  logoText: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.white,
    fontSize: HP(3), alignSelf: 'center', fontWeight: 'bold',
    marginBottom: HP(1.5)
  },
  back: {
    backgroundColor: THEME.colors.white,
    padding: HP(1),
    borderRadius: HP(3) / 2,
    position: 'absolute',
    bottom: HP(5.5),
    left: WP(3.5)
  },
  gradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WP(3),
    alignItems: 'center',
    height: HP(4),
    width: WP(100),
  },
  viewsite: {
    fontFamily: THEME.fonts.montRegular,
    textDecorationLine: 'underline'
  },


  // more infor

  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    paddingHorizontal: WP(2)
  },
  scrollContainer: {
    alignItems: 'center',
  },
  back: {
    position: 'absolute',
    top: HP(6.5),
    left: WP(5)
  },
  heading: {
    marginTop: HP(6),
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.blck,
    fontSize: HP(2.7),
    fontWeight: 'bold',
  },
  heading2: {
    marginVertical: HP(1),
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.blck,
    fontSize: HP(2.3),
    fontWeight: 'bold',
  },
  topView: {
    marginTop: HP(2),
    marginHorizontal: WP(2),
    borderBottomWidth: 1,
    paddingBottom: HP(1)
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: HP(0.5)
  },
  barOut: {
    height: HP(4),
    backgroundColor: THEME.colors.lavender,
    borderRadius: HP(1), overflow: 'hidden',
    marginBottom: HP(1)
  },
  barIn: {
    height: HP(4),
    backgroundColor: THEME.colors.headings,
    alignItems: 'center', justifyContent: 'center',
  },
  percent: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.white,
    fontSize: HP(2),
    fontWeight: 'bold',
  },
  txt: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(1.7),
  },
  txtBold: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(1.8),
    fontWeight: 'bold'
  },

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
    marginRight: WP(10),
    borderWidth: 0.3,
    borderRadius: WP(10) / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
