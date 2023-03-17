import { StyleSheet } from 'react-native';
import { GST, RF, THEME, WP } from '../../../shared/exporter';
const { white, btnBck, gray, blck } = THEME.colors;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  noteImage: {
    height: RF(100),
    width: RF(100),
    borderRadius: RF(10),
    marginRight: RF(4),
  },
  noteContainer: {
    backgroundColor: gray,
    width: RF(6),
    height: RF(6),
    borderRadius: RF(3),
    marginRight: RF(4),
  },
  img: { width: RF(80), height: RF(80), borderRadius: RF(8) },
  imgMainContainer: { width: RF(80) },
  imgRemoveContainer: {
    position: 'absolute',
    top: -RF(5),
    right: -RF(5),
    backgroundColor: blck,
    width: RF(16),
    height: RF(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RF(8),
  },
  calendarItemContainer: {
    padding: RF(8),
    borderWidth: 0.5,
    borderColor: gray,
    borderRadius: RF(4),
    marginRight: RF(8),
    marginVertical: RF(4),
  },
  noteMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: RF(4),
    paddingRight: RF(4),
  },
  inputMainContainer: { width: WP(80), padding: RF(10) },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  pickerContainer: {
    padding: RF(8),
    borderRadius: RF(8),
    backgroundColor: white,
    ...GST.shadow,
    width: RF(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerIcon: { width: RF(20), height: RF(20), marginBottom: RF(4) },
  themeB: {
    backgroundColor: white,
    color: btnBck,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...GST.shadow,
    backgroundColor: btnBck,
    padding: RF(4),
    borderRadius: RF(6),
    marginTop: RF(6),
  },
  emptyDataContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  inputField: {
    fontFamily: THEME.fonts.primaryJost,
    height: RF(100),
    paddingHorizontal: RF(6),
    fontSize: RF(14),
    borderWidth: 0.5,
    borderColor: gray,
    borderRadius: RF(4),
    marginBottom: RF(8),
  },
  w49: {
    width: '49%',
  },
  line: {
    marginVertical: RF(4),
    height: RF(1),
    width: '100%',
    backgroundColor: gray,
    alignSelf: 'center',
  },
  inputFieldBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RF(10),
    justifyContent: 'space-between',
  },
  agendaItemContainer: {
    flex: 1,
    marginVertical: RF(4),
    paddingVertical: RF(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: RF(4),
    borderColor: 'gray',
    marginHorizontal: RF(4),
  },
  notesScrolWrap: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.overlay
  },
  notesWrao: {
    width: '80%',
    height: 'auto',
    backgroundColor: THEME.colors.light
  }
});

export default styles;
