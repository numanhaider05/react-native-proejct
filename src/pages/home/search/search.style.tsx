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
    height: WP(12),
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
    height: WP(12),
    padding: HP(1),
    alignItems: 'center',
    alignSelf: 'center'
  },
  cardContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tabsSports: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: HP(1),
    borderColor: THEME.colors.gray,
    borderBottomWidth: 1,
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
    height: HP(60),
    alignItems: 'center',
    justifyContent: 'center',
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
    width: WP(90),
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
  choiceContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: HP(3),
  },
  mSportContainer: {
    paddingRight: RFValue(10),
    paddingTop: RFValue(10),
  },
  mSportActive: {
    color: 'white',
    paddingHorizontal: RFValue(10),
    paddingTop: RFValue(10),
    backgroundColor: 'black',
    borderTopLeftRadius: RFValue(10),
    borderBottomLeftRadius: RFValue(10),
    padding: RFValue(5),
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  wSportActive: {
    color: 'white',
    paddingHorizontal: RFValue(10),
    paddingTop: RFValue(10),
    backgroundColor: 'black',
    borderTopRightRadius: RFValue(10),
    borderBottomRightRadius: RFValue(10),
    padding: RFValue(5),
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  mSportActiveText: {
    color: 'white',
  },
  textColor: {
    fontSize: RFValue(14),
    color: '#808080',
    fontFamily: THEME.fonts.montRegular,
  },
  verticalDivider: {
    height: 38,
    width: 3,
    backgroundColor: 'black',
  },
  wSportContainer: {
    paddingLeft: RFValue(10),
    paddingTop: RFValue(10),
  },
  activeText: {
    color: 'white',
    fontSize: RFValue(14),
    fontFamily: THEME.fonts.montRegular,
  },
});
