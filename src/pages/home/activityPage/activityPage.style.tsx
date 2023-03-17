import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME, WP, HP } from '../../../shared/exporter';

export const STYLES = StyleSheet.create({
  container: {
    flex: 1
  },
  linearGradientStyle: {
    height: HP(23),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  tabs: {
    zIndex: 999,
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: HP(1),
    alignSelf: 'center'
  },
  selectedTab: {
    alignItems: 'center',
    width: WP(20),
    borderBottomWidth: 5,
    marginHorizontal: WP(1),
    borderBottomColor: THEME.colors.white,
    paddingBottom: HP(0.4)
  },
  tab: {
    alignItems: 'center',
    width: WP(20),
    marginHorizontal: WP(1),
  },
  tabText: {
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.white
  },
  tabTextSelected: {
    fontWeight: 'bold',
    fontFamily: THEME.fonts.montRegular,
    color: THEME.colors.white
  },
});
