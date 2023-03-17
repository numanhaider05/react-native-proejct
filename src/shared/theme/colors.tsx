import { Platform } from 'react-native';

export const THEME = {
  fonts: {
    primaryJost: Platform.OS == 'android' ? 'JostRegular' : 'Jost-Regular',
    boldJost: Platform.OS == 'android' ? 'JostBold' : 'Jost-Bold',
    semiBoldJost: Platform.OS == 'android' ? 'JostSemiBold' : 'Jost-SemiBold',
    mediumJost: Platform.OS == 'android' ? 'JostMedium' : 'Jost-Medium',
    montRegular:
      Platform.OS == 'android' ? 'MontserratRegular' : 'Montserrat-Regular',
    // montBold: Platform.OS == 'android' ? 'MontserratBold' : 'Montserrat-Bold',
  },
  colors: {
    primary: '#4766af',
    headings: '#1d5d99',
    light: '#ffffff',
    field: '#F3F3F6',
    btnBck: '#00AEEF',
    placeHolder: '#C7C7CD',
    placeHolderDark: '#696969',
    error: '#FF4050',
    blck: '#000000',
    mdlBack: '#F3F3F6',
    mdlFld: '#F8F8F8',
    white: '#fff',
    lightcyan: '#c9ecff',
    seaBlue: '#119DDB',
    darkGrey: '#565656',
    gray: '#808080',
    lavender: '#ebebeb',
    gold: '#EAC67A',
    overlay: 'rgba(0,0,0,0.4)',
  },
};
