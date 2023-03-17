//import liraries
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import I from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import Wrapper from '../../../shared/components/wrapper/wrapper';
import { STYLES } from './forget.styles';
import { GST } from '../../../shared/exporter';
import Touch from '../../../shared/components/touch/touch';
import { RFValue } from 'react-native-responsive-fontsize';
import { NxtGem } from '../../../assets/images';
import InputField from '../../../shared/components/inputfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import LinearGradient from 'react-native-linear-gradient';
import AppButton from '../../../shared/components/button';
import { THEME } from './../../../shared/exporter';
import { useDispatch } from 'react-redux';
import { forgetPassword, signIn } from '../../../shared/services/AuthService';
import { setUser } from '../../../shared/store/reducers/userReducer';
import Loader from '../../../shared/components/loader';
import helpers from '../../../shared/utils/helpers';

const ForgetPassword = ({ navigation }: any) => {

  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  let schema = yup.object().shape({
    email: yup.string().email(),
  });
  const check = () => {
    schema
      .isValid({
        email: email,
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
      "email": email,
    };

    forgetPassword(params)
      .then(res => {
        helpers.showToastSuccess('We have sent a code to your eamil address.')
        navigation.navigate('ForgetVerify', { email: email })
      })
      .catch(err => {
        if (err.response) {
          helpers.showToastFail(err.response?.data?.meta?.message)
        }
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
          <View>
            <I name={'back'} />
          </View>
          <View style={STYLES.header}>
            <Text style={STYLES.headerText}>Forgot Password!</Text>
            <Text style={STYLES.headerSubText}>Enter your email address to reset your password</Text>
          </View>
          <View style={STYLES.logoStyle}>
            <Image source={NxtGem}></Image>
          </View>
        </LinearGradient>

        <View style={STYLES.textFieldContainer}>
          <InputField
            value={email}
            onChangeText={setEmail}
            placeholder={'ENTER YOUR EMAIL'}
            keyboardType={'email-address'}
            inputStyle={STYLES.inputFieldStyles}
          />

          {/* <Touch style={STYLES.forgotPassword}>
            <Text style={STYLES.forgotPasswordText}>Forgot Password?</Text>
          </Touch> */}
          <View style={STYLES.loginContainer}>
            <AppButton onPress={() => {
              // navigation.navigate('Home')
              check()
            }} name="Forgot Password" />
          </View>
          {/* <Touch
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <View style={STYLES.createAccount}>
              <Text style={STYLES.createAccountText}>Create Account</Text>
            </View>
          </Touch> */}
        </View>
      </Wrapper>
    </KeyboardAwareScrollView>
  </>
  );
};

export default ForgetPassword;