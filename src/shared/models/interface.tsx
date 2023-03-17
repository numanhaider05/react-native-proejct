import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
  ImageRequireSource,
  ImageURISource,
  StyleProp,
  TextInputProps,
  ViewProps,
  TextProps,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from 'react-native';
export interface TextInputInterface extends TextInputProps {
  value?: any;
  label?: string;
  capitalize?: any;
  icon?: ImageRequireSource;
  rightIconVisible?: boolean;
  password?: boolean;
  multiline?: boolean;
  prefix?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  image?: StyleProp<ImageStyle>;
}

export type Story = {
  user: string,
  stories: any[],
  own: boolean
};

export type UserInfo = {
  cellPhone: string,
  createdAt: string,
  designation: string,
  facebook: string,
  roleId: number,
  role: string,
  college: any,
  school: any,
  class: any,
  firstName: any,
  userSports: any[]
};

export interface GenericNavigation {
  navigation: NavigationProp<any>,
  route: RouteProp<any, any>
}

export interface InfoType {
  category: string,
  key: string,
  type: any
}

