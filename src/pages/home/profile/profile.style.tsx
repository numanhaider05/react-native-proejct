import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { HP, THEME, WP } from '../../../shared/exporter';

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white
  },
  images: {
    height: WP(29),
    width: WP(29),
    resizeMode: 'contain'
  },
  recommendation: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationText: {
    textAlign: 'center',
    fontSize: HP(2.5),
    width: WP(60)
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  profileDet: {
    position: 'absolute',
    bottom: -HP(7),
    left: 0,
    zIndex: 999
  },
  back: {
    position: 'absolute',
    top: HP(6.5),
    left: WP(5)
  },
  schoolContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: HP(8),
    width: WP(95),
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopRightRadius: HP(2),
    borderBottomRightRadius: HP(2),
    paddingVertical: HP(0.7),
    paddingLeft: WP(4)
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
  schoolContainerCoach: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: HP(8),
    width: WP(65),
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopRightRadius: HP(2),
    borderBottomRightRadius: HP(2),
    paddingVertical: HP(0.7),
    paddingLeft: WP(4)
  },
  schoolCont: {
    paddingRight: WP(5),
    alignItems: 'center'
  },
  schoolHead: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.headings,
    fontSize: HP(2),
    fontWeight: '900',
    textAlign: 'center'
  },
  schoolname: {
    fontFamily: THEME.fonts.montRegular,
  },
  schoolLogo: {
    marginTop: WP(1),
    height: WP(7),
    width: WP(7)
  },
  penView: {
    backgroundColor: 'white',
    position: 'absolute',
    top: -HP(2), right: -HP(0.5),
    padding: HP(0.5),
    borderWidth: 1,
    borderRadius: HP(4.5) / 2,
    borderColor: THEME.colors.lightcyan,
  },
  about: {
    paddingHorizontal: WP(1),
    margin: WP(4)
  },
  aboutHeadCont: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  aboutHead: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.headings,
    fontSize: HP(2.2),
    fontWeight: '900',
  },
  aboutSave: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.headings,
    fontSize: HP(2.2),
    textDecorationLine: 'underline'
  },
  aboutDesp: {
    marginTop: HP(0.4),
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(1.8),
  },

  aboutPen: {
    marginLeft: WP(2),
    marginBottom: HP(1)
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
  infoPen: {
    marginLeft: WP(2),
    marginBottom: HP(2)
  },
  options: {
    alignItems: 'center',
    width: WP(30),
  },
  line: {
    backgroundColor: THEME.colors.blck,
    height: HP(5),
    width: 1,
    marginHorizontal: WP(1)
  },
  optionsHead: {
    marginTop: HP(1.4),
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.headings,
    fontSize: HP(1.8),
    fontWeight: '900',
  },
  tabs: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: HP(1.5)
  },
  selectedTab: {
    alignItems: 'center',
    width: WP(15),
    borderBottomWidth: 5,
    marginHorizontal: WP(1)
  },
  tab: {
    alignItems: 'center',
    width: WP(15),
    marginHorizontal: WP(1)
  },
  tabText: {
    fontFamily: THEME.fonts.montRegular,
  },



  textField: {
    marginLeft: WP(2.5),
    width: WP(72),
    fontFamily: THEME.fonts.montRegular,
    fontSize: RFValue(15),
  },

  textField2: {
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
    marginTop: HP(1),
    width: WP(85),
    padding: HP(0.8),
    alignSelf: 'center'
  },
  heading: {
    marginTop: HP(6),
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.blck,
    fontSize: HP(2.7),
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  cont: {
    borderBottomWidth: 0.4,
    paddingHorizontal: WP(5),
    paddingVertical: WP(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  logoSchool: {
    height: WP(10),
    width: WP(10),
    resizeMode: 'contain',
    // marginRight: WP(10)
  },
  swipePressable: {
    marginTop: HP(0.5),
    width: WP(20),
    height: HP(7.3),
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10,
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
  wrapper: {
    marginTop: HP(9),
    alignItems: 'center', justifyContent: 'center'
  },

  bottomtxt: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.blck,
    fontSize: HP(1.6),
    fontWeight: 'bold',
  },
  cardContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});


export const STYLES2 = StyleSheet.create({

  schoolContainerCoach: {
    marginTop: HP(8),
    paddingLeft: WP(4)
  },
  title: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(2.3),
    textAlign: 'center'
  },
  schoolnameCoach: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(1.7),
  },
  sportname: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(1),
  },
  schoolLogo: {
    marginHorizontal: WP(2),
    marginRight: WP(4)
  },
  schoolname: {
    fontFamily: THEME.fonts.montRegular,
    fontSize: HP(1.5),
  },

});
