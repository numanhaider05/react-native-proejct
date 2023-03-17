import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Wrapper from '../../../shared/components/wrapper/wrapper';
import HeaderLeft from '../../../shared/components/headerLeft';
import { STYLES } from './guardian.style';

import InputField from '../../../shared/components/inputfield';
import AppButton from '../../../shared/components/button';
import { GuardianImage } from '../../../assets/images';
import { GST, HP } from '../../../shared/exporter';

import { signUp } from '../../../shared/services/AuthService';
import Loader from '../../../shared/components/loader';
import helpers from '../../../shared/utils/helpers';

const Guardian = ({ navigation, route }: any) => {

  const [params, setParams] = useState(route.params.params);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    console.log('params', route.params.sportIds)
    console.log(route.params);
    route.params?.sportIds ?
      setParams({ ...params, sportIds: route.params.sportIds })
      :
      setParams({ ...params, sportIds: [] })
  }, []);

  const handleSubmit = () => {
    setLoading(true);

    name !== '' ? setParams({ ...params, guardianName: name }) : delete params.guardianName;
    email !== '' ? setParams({ ...params, guardianEmail: name }) : delete params.guardianEmail;
    number !== '' ? setParams({ ...params, guardianPhoneNumber: name }) : delete params.guardianPhoneNumber;

    signUp(params)
      .then(res => {
        if (res.data.data.success) {
          helpers.showToastSuccess(res.data.data.message)
          navigation.navigate('Verify', { params: params })
        } else {
          helpers.showToastFail(res.data.data.message)
        }
      })
      .catch(err => {
        helpers.showToastFail(err.response?.data?.meta?.message)
        console.log(err.response?.data?.meta?.message)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (


    <Wrapper style={GST.wrap}>
      {loading && <Loader />}
      <KeyboardAwareScrollView>
        <View style={STYLES.header}>
          <HeaderLeft navigation={navigation} />
        </View>
        <View style={STYLES.subHeader}>
          <Text style={STYLES.headerText}>Almost there!</Text>
          <Text style={STYLES.headerSubText}>
            Please list your Guardian (Optional)
          </Text>
        </View>
        <View style={STYLES.textFieldContainer}>
          <InputField
            onChangeText={(value) => setName(value)}
            placeholder={'FULL NAME'}
            inputStyle={STYLES.textField} />
          <InputField
            onChangeText={(value) => setEmail(value)}
            placeholder={'E-MAIL'}
            inputStyle={STYLES.textField} />
          <InputField
            onChangeText={(value) => setNumber(value)}
            placeholder={'PHONE NUMBER'}
            inputStyle={STYLES.textField}
          />
          <View style={STYLES.imageContainer}>
            <Image source={GuardianImage} style={STYLES.imageStyles} />
          </View>
          <View style={STYLES.continueContainer}>
            <AppButton
              name="Create Account"
              onPress={() => {
                handleSubmit()
                // navigation.navigate('Verify', { params: params })
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};
export default Guardian;
