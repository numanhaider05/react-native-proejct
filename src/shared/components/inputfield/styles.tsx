import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    borderBottomColor: '#D2D2D2',
    borderBottomWidth: RFValue(2),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(14),
  },
  icon: {
    width: RFValue(6),
    height: RFValue(6),
    resizeMode: 'contain',
  },
  backBtnContainer: {
    width: RFValue(6),
    alignItems: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    color: 'black',
    padding: 0,
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: RFValue(12),
  },
});

export default styles;
