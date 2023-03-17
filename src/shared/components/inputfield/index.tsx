import React, {forwardRef, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TextInputInterface} from '../../models/interface';
import CustomText from '../customText';
import styles from './styles';

const InputField = forwardRef(
  (
    {
      label,
      placeholder,
      prefix,
      value,
      onChangeText,
      password = false,
      containerStyle,
      editable = true,
      inputStyle,
      maxLength,
      multiline = multiline ? multiline : false,
      capitalize,
      onEndEditing,
      keyboardType = 'default',
    }: TextInputInterface,
    ref: any,
  ) => {
    const [showPrefix, setShowPrefix] = useState(false);
    const onFocusHandler = () => {
      prefix && setShowPrefix(true);
    };
    const onBlurHandler = () => {
      prefix && !value && setShowPrefix(false);
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.subContainer}>
          <View style={styles.textInputContainer}>
            {showPrefix && <CustomText size={14}>{prefix}</CustomText>}
            <TextInput
              ref={ref}
              autoCapitalize={
                capitalize
                  ? capitalize
                  : keyboardType === 'email-address'
                  ? 'none'
                  : 'words'
              }
              underlineColorAndroid="transparent"
              editable={editable}
              maxLength={maxLength}
              placeholder={placeholder}
              placeholderTextColor={'#D2D2D2'}
              value={value}
              onFocus={onFocusHandler}
              onBlur={onBlurHandler}
              onChangeText={onChangeText}
              style={[styles.textInput, inputStyle]}
              secureTextEntry={password}
              multiline={multiline}
              keyboardType={keyboardType}
              blurOnSubmit={true}
              onEndEditing={onEndEditing}
            />
          </View>
        </View>
      </View>
    );
  },
);

export default InputField;
