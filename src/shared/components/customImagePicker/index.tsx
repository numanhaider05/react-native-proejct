import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import FastImage, {Source} from 'react-native-fast-image';
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {camera, gallary} from '../../../assets/images';
import {THEME} from '../../exporter';
import {RF} from '../../theme/responsive';
import CustomText from '../customText';
const {seaBlue, darkGrey} = THEME.colors;

interface Props {
  visible: boolean;
  toggleImagePicker: () => void;
  getSource: (image: Source) => void;
}

interface FieldBtnProps {
  label: string;
  icon: Source;
  onPress: () => void;
}

const options: CameraOptions = {
  mediaType: 'mixed',
  maxWidth: RF(480),
  maxHeight: RF(640),
  quality: 1,
  videoQuality: 'low',
  durationLimit: 15,
};

const CustomImagePicker = ({visible, toggleImagePicker, getSource}: Props) => {
  const resHandler = (res: any) => {
    toggleImagePicker();
    getSource(res.assets[0]);
  };

  const cameraPressHandler = () => {
    launchCamera(options, (res: any) => resHandler(res));
  };

  const gallaryPressHandler = () => {
    launchImageLibrary(options, (res: any) => resHandler(res));
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleImagePicker}
      overlayStyle={styles.overlay}>
      <View style={styles.container}>
        <CustomText bold size={18} color={seaBlue} style={styles.title}>
          Add Photo!
        </CustomText>
      </View>
      <FieldBtn
        label={'Take Photo'}
        icon={camera}
        onPress={cameraPressHandler}
      />
      <FieldBtn
        label={'Choose from Gallary'}
        icon={gallary}
        onPress={gallaryPressHandler}
      />
    </Overlay>
  );
};

const FieldBtn = ({label, icon, onPress}: FieldBtnProps) => (
  <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
    <FastImage
      source={icon}
      resizeMode={'contain'}
      style={styles.icon}
      tintColor={darkGrey}
    />
    <CustomText bold size={14} style={styles.label}>
      {label}
    </CustomText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: {
    paddingHorizontal: 0,
    borderRadius: RF(8),
  },
  title: {
    paddingHorizontal: RF(16),
    paddingVertical: RF(8),
  },
  label: {
    paddingHorizontal: RF(16),
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: seaBlue,
    marginBottom: RF(8),
    paddingBottom: RF(4),
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RF(16),
    paddingVertical: RF(8),
  },
  icon: {
    width: RF(20),
    height: RF(20),
  },
});

export default CustomImagePicker;
