import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME, WP, HP } from './../../../shared/exporter';

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white
  },
  skipStyle: {
    alignItems: 'flex-end',
    paddingRight: RFValue(20),
    paddingTop: RFValue(50),
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
  subHeader: {
    paddingVertical: RFValue(15),
    marginHorizontal: RFValue(40),
    borderBottomColor: 'black',
    borderBottomWidth: RFValue(1),
  },
  getDiscovered: {
    color: 'black',
    fontFamily: THEME.fonts.boldJost,
    fontSize: RFValue(20),
  },
  swiperContainer: {
    marginTop: RFValue(50),
    height: HP(62),
  },
  slide: {
    flex: 1,
    // height: RFValue(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationStyle: {
    position: 'absolute',
    bottom: -HP(4),
  },
  navigationContainer: {
    marginTop: RFValue(10),
    flexDirection: 'row',
  },
  descriptionHeader: {
    height: RFValue(130),
    paddingVertical: RFValue(15),
    marginHorizontal: RFValue(50),
  },
  description: {
    paddingTop: RFValue(5),
    color: '#898D98',
    fontSize: RFValue(15),
    fontFamily: THEME.fonts.montRegular,
  },
  angleLeft: {
    alignItems: 'center',
    width: RFValue(25),
    height: RFValue(25),
    borderRadius: 30 / 2,
    backgroundColor: '#2E5D94',
    justifyContent: 'center',
    marginLeft: RFValue(20),
    paddingRight: RFValue(2),
  },
  emptyangleLeft: {
    alignItems: 'center',
    width: RFValue(25),
    height: RFValue(25),
    borderRadius: 30 / 2,
    justifyContent: 'center',
    marginLeft: RFValue(20),
    paddingHorizontal: RFValue(10),
  },
  angleRightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: RFValue(20),
  },

  angleRight: {
    width: RFValue(25),
    height: RFValue(25),
    borderRadius: 30 / 2,
    backgroundColor: '#2E5D94',
    justifyContent: 'center',
    paddingHorizontal: RFValue(10),
    alignItems: 'center',
  },
  emptyangleRight: {
    width: RFValue(25),
    height: RFValue(25),
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    resizeMode: 'contain',
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: RFValue(12),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  cardHeader: {
    fontFamily: THEME.fonts.boldJost,
    fontSize: RFValue(14),
    color: '#8A8A8A',
    paddingHorizontal: RFValue(5),
    marginBottom: HP(0.5),
  },
  cardBody: {
    fontSize: RFValue(11.2),
    fontFamily: THEME.fonts.montRegular,
    color: '#989898',
    paddingHorizontal: RFValue(5),
    width: WP(55),
  },
});
