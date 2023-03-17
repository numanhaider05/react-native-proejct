import React from 'react';
import {TouchableOpacity} from 'react-native';
import I from 'react-native-vector-icons/FontAwesome';

const HeaderLeft = ({navigation}: any) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <I name="angle-left" color="black" size={35} />
    </TouchableOpacity>
  );
};
export default HeaderLeft;
