import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, View, Platform } from 'react-native';
import { STYLES } from './signup.styles';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFValue } from 'react-native-responsive-fontsize';
import * as yup from 'yup';

import { GST } from '../../../shared/exporter';
import { SignupImage } from '../../../assets/images';
import Wrapper from '../../../shared/components/wrapper/wrapper';
import InputField from '../../../shared/components/inputfield';
import AppButton from '../../../shared/components/button';
import HeaderLeft from '../../../shared/components/headerLeft';
import { Alert } from 'react-native';
import helpers from '../../../shared/utils/helpers';

const Signup = ({ navigation }: any) => {

  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [confirm, setConfirm] = useState<any>('');


  let emailschema = yup.object().shape({
    email: yup.string().email(),
  });

  let schema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().required()
  });

  const passwordCheck = () => {
    if (password !== confirm) {
      helpers.showToastFail('Passwords do not Match')
    }
  }

  const emailCheck = () => {
    emailschema
      .isValid({
        email: email,
      }).then(valid => {
        if (!valid) {
          helpers.showToastFail('Invalid Email.')
        }
      })
  }

  const check = () => {
    schema
      .isValid({
        email: email,
        password: password,
      }).then(valid => {
        if (!valid) {
          helpers.showToastFail('Invalid Email.')
        } else if (password !== confirm) {
          helpers.showToastFail('Passwords do not Match.')
        } else {
          navigation.navigate('SelectProfession', { email: email, password: password })
        }
      })
  }

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: 'white' }}>
      <Wrapper style={GST.wrap}>
        <View style={{ height: RFValue(450) }}>
          <ImageBackground source={SignupImage} style={{ flex: 1 }}>
            <View style={STYLES.header}>
              <HeaderLeft navigation={navigation} />
              <Text style={STYLES.headerText}>Welcome!</Text>
              <Text style={STYLES.headerSubText}>
                Please enter your information
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={STYLES.textFieldContainer}>
          <InputField
            value={email}
            onChangeText={setEmail}
            placeholder={'EMAIL'}
            keyboardType={'email-address'}
            inputStyle={STYLES.textField}
            onEndEditing={() => emailCheck()}
          />
          <InputField
            value={password}
            onChangeText={setPassword}
            placeholder={'PASSWORD'}
            inputStyle={STYLES.textField}
            password={true}
          />
          <InputField
            value={confirm}
            onChangeText={setConfirm}
            placeholder={'CONFIRM'}
            inputStyle={STYLES.textField}
            onEndEditing={() => passwordCheck()}
            password={true}
          />
          <View style={STYLES.continueContainer}>
            <AppButton
              name="Continue"
              onPress={() => check()}
            />
          </View>
        </View>
      </Wrapper>
    </KeyboardAwareScrollView>
  );
};
export default Signup;
