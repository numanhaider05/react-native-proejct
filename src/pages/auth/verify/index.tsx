import React, { useState } from 'react';
import { Text, View } from 'react-native';
import I from 'react-native-vector-icons/MaterialIcons'
import AppButton from '../../../shared/components/button';
import Touch from '../../../shared/components/touch/touch';
import { STYLES } from './verify.styles';
import Wrapper from '../../../shared/components/wrapper/wrapper';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from '../../../shared/components/inputfield/styles';
import { HP } from '../../../shared/exporter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { useDispatch } from 'react-redux';
import { setUser } from '../../../shared/store/reducers/userReducer';
import { verify } from '../../../shared/services/AuthService';
import Loader from '../../../shared/components/loader';
import helpers from '../../../shared/utils/helpers';


const CELL_COUNT = 4;

const Verify = (props: any) => {
  const [params, setParams] = useState(props.route.params.params)

  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  const dispatch = useDispatch();

  const handleSubmit = (values: any, action: any) => {
    setLoading(true);

    const par = {
      "email": params.email,
      "code": code
    }

    verify(par)
      .then(res => {
        dispatch(setUser(res.data.data));
        props.navigation.navigate('Welcome', { user: res.data.data })
      })
      .catch(err => {
        helpers.showToastFail(err.response.data.meta.message)
      })
      .finally(() => {
        setLoading(false);
      });
  };



  const shadowOpt = {
    width: 250,
    height: 340,
    color: '#000',
    border: 8,
    radius: 20,
    opacity: 0.1,
    x: 2,
    y: 3,
    style: { marginVertical: 5 },
  };


  return (
    <Wrapper>
      {loading && <Loader />}
      <View style={STYLES.container}>
        <KeyboardAwareScrollView style={{ backgroundColor: 'white', flex: 1 }}>

          <Touch onPress={() => props.navigation.goBack()} style={STYLES.backBtn}>
            <I name={'arrow-back-ios'} size={HP(3)} />
          </Touch>
          <Text style={STYLES.headerText}>{params.firstName}, We've sent a code to your email! Please Verify</Text>

          <CodeField
            // ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={STYLES.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[STYLES.cell, isFocused && STYLES.focusCell]}
              // onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

        </KeyboardAwareScrollView>
        <View style={STYLES.continueContainer}>
          <AppButton
            name="Continue"
            onPress={() => { handleSubmit() }}
          />
        </View>
      </View>
    </Wrapper>
  );
};
export default Verify;
