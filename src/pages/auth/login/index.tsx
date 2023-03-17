//import liraries
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import * as yup from 'yup';
import Wrapper from '../../../shared/components/wrapper/wrapper';
import { STYLES } from './login.styles';
import { GST } from '../../../shared/exporter';
import Touch from '../../../shared/components/touch/touch';
import { NxtGem } from '../../../assets/images';
import InputField from '../../../shared/components/inputfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import LinearGradient from 'react-native-linear-gradient';
import AppButton from '../../../shared/components/button';
import { THEME } from './../../../shared/exporter';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../shared/services/AuthService';
import { setUser } from '../../../shared/store/reducers/userReducer';
import Loader from '../../../shared/components/loader';
import helpers from '../../../shared/utils/helpers';
import { store } from '../../../shared/store/store';

const Login = ({ navigation }: any) => {
  const { fcmToken }: any = store.getState().root.user;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  let schema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().required()
  });
  const check = () => {
    schema
      .isValid({
        email: email,
        password: password
      }).then(valid => {
        if (!valid) {
          helpers.showToastFail('Invalid Email.')
        } else {
          handleSubmit()
        }
      })
  }

  const handleSubmit = () => {
    setLoading(true);
    const params = {
      "emailOrPhone": email,
      "password": password,
      "deviceId": fcmToken
    };

    signIn(params)
      .then(res => {
        dispatch(setUser(res.data.data));
        helpers.showToastSuccess('Log in a Success.')
      })
      .catch(err => {
        if (err.response)
          helpers.showToastFail(err.response?.data?.meta?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (<>
    {loading && <Loader />}

    <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
      <Wrapper style={GST.wrap}>
        <LinearGradient
          colors={['#f5fdff', '#eaf5fe', '#fef3fe']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <View style={STYLES.header}>
            <Text style={STYLES.headerText}>Hi there!</Text>
            <Text style={STYLES.headerSubText}>Login in to Continue</Text>
          </View>
          <View style={STYLES.logoStyle}>
            <Image source={NxtGem}></Image>
          </View>
        </LinearGradient>

        <View style={STYLES.textFieldContainer}>
          <InputField
            value={email}
            onChangeText={setEmail}
            placeholder={'EMAIL OR PHONE NUMBER'}
            keyboardType={'email-address'}
            inputStyle={STYLES.inputFieldStyles}
          />
          <InputField
            value={password}
            onChangeText={setPassword}
            placeholder={'PASSWORD'}
            password={true}
            inputStyle={STYLES.inputFieldStyles}
            onEndEditing={() => check()}
          />

          <Touch onPress={() => navigation.navigate('ForgetPassword')} style={STYLES.forgotPassword}>
            <Text style={STYLES.forgotPasswordText}>Forgot Password?</Text>
          </Touch>
          <View style={STYLES.loginContainer}>
            <AppButton onPress={() => {
              // navigation.navigate('Home')
              check()
            }} name="Login" />
          </View>
          <Touch
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <View style={STYLES.createAccount}>
              <Text style={STYLES.createAccountText}>Create Account</Text>
            </View>
          </Touch>
        </View>
      </Wrapper>
    </KeyboardAwareScrollView>
  </>
  );
};

export default Login;

