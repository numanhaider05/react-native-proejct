import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME, WP } from './../../../shared/exporter';

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: THEME.colors.primary,
  },
  header: {
    paddingLeft: RFValue(30),
    paddingTop: RFValue(60),
  },
  headerText: {
    fontSize: 20,
    fontFamily: THEME.fonts.boldJost,
    paddingTop: RFValue(20),
  },
  headerSubText: {
    fontFamily: THEME.fonts.semiBoldJost,
    fontSize: 20,
    color: '#898D98',
  },
  logoFootball: {
    height: RFValue(200),
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: RFValue(40),
    paddingRight: RFValue(40),
  },
  logoStyle: {
    height: RFValue(200),
    marginTop: RFValue(-80),
    width: '100%',
    paddingLeft: RFValue(20),
  },
  textFieldContainer: {
    flex: 1,
    paddingHorizontal: RFValue(30),
    paddingTop: RFValue(20),
  },
  textField: {
    fontFamily: THEME.fonts.montRegular,
    paddingTop: RFValue(20),
    fontSize: RFValue(16),
  },
  loginContainer: {
    marginVertical: RFValue(15),
  },
  continueContainer: {
    flex: 1,
    height: 80,
    justifyContent: 'flex-end',
    marginTop: RFValue(50),
  },
  createAccountText: {
    fontWeight: 'bold',
    color: '#709BE4',
    fontSize: 16,
  },
});
