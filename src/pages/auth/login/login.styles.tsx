import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME, WP } from './../../../shared/exporter';

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    paddingLeft: RFValue(40),
    paddingTop: RFValue(80),
  },
  headerText: {
    fontSize: 16,
    fontFamily: THEME.fonts.boldJost,
  },
  headerSubText: {
    fontSize: 16,
    color: '#898D98',
    fontFamily: THEME.fonts.semiBoldJost,
  },
  logoStyle: {
    height: RFValue(300),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFieldContainer: {
    paddingHorizontal: RFValue(40),
    paddingVertical: RFValue(20),
  },
  inputFieldStyles: {
    paddingTop: RFValue(20),
    fontSize: RFValue(16),
    fontFamily: THEME.fonts.montRegular,
  },
  forgotPassword: {
    paddingVertical: RFValue(5),
  },
  forgotPasswordText: {
    fontSize: 12,
    fontFamily: THEME.fonts.montRegular,
    color: '#99BEEC',
  },
  loginContainer: {
    marginTop: RFValue(30),
    marginVertical: RFValue(15),
  },
  createAccount: {
    width: '100%',
    height: RFValue(35),
    borderColor: '#579BF2',
    borderWidth: RFValue(0.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountText: {
    color: '#709BE4',
    fontSize: 20,
    fontFamily: THEME.fonts.boldJost,
  },
});
