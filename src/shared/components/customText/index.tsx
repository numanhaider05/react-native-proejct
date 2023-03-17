import React from 'react';
import {Text} from 'react-native';
import {THEME, RF} from '../../exporter';
const {blck} = THEME.colors;
const {primaryJost, boldJost} = THEME.fonts;

const CustomText = ({
  children,
  size = 12,
  color = blck,
  textAlign = 'left',
  bold = false,
  style,
  opacity = 1,
  numberOfLines,
}: any) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: bold ? boldJost : primaryJost,
          color: color,
          fontSize: RF(size),
          textAlign: textAlign,
          opacity: opacity,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default CustomText;
