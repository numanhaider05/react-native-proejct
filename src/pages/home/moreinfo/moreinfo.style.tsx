import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { HP, THEME, WP } from '../../../shared/exporter';
import { Platform } from 'react-native';

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    alignItems: 'center',
    paddingHorizontal: WP(2)
  },
  back: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? HP(6.5) : HP(3),
    left: WP(5)
  },
  heading: {
    marginTop: Platform.OS === 'ios' ? HP(6) : HP(3),
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
  save: {
    // backg
    position: 'absolute',
    bottom: WP(5),
    right: WP(8),
    width: WP(25),

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,

    elevation: 5,
  },

  saveGradient: {
    paddingVertical: WP(2.5),
    borderRadius: WP(6) / 2,
  },
  categoryTxt: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.white,
    fontSize: HP(1.5),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rowView: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',

  }
});
