import React, { useRef, useState } from 'react';
import { Text, View, ImageBackground, ScrollView, Image, Alert } from 'react-native';
import { STYLES } from './athleteInfo.style';
import { RFValue } from 'react-native-responsive-fontsize';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import * as yup from 'yup';
import DatePicker from 'react-native-datepicker'

import { InputBackground1, InputBackground2 } from '../../../assets/images';
import HeaderLeft from '../../../shared/components/headerLeft';
import Wrapper from '../../../shared/components/wrapper/wrapper';
import InputField from '../../../shared/components/inputfield';
import AppButton from '../../../shared/components/button';
import Touch from '../../../shared/components/touch/touch';
import * as ImagePicker from "react-native-image-picker"
import { Formik, FormikValues, useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, upload } from '../../../shared/services/AuthService';
import Loader from '../../../shared/components/loader';
import { THEME, WP } from '../../../shared/exporter';
import helpers, { CustomSpinner } from '../../../shared/utils/helpers';
import { OtherSignupVS } from '../../../shared/utils/validations';
import { ROLES_MAP } from '../../../shared/models/enums';
import { useCustomSelector } from '../../../shared/store/store';

const AthleteInfo = ({ navigation, route }: any) => {
  const [type, setType] = useState(route.params.type);
  const [data, setData] = useState(route.params.values);
  const fcmToken = useCustomSelector(state => state.root.user.fcmToken);
  let otherFormRef = useRef<any>()
  const initialVals = {
    others: {
      name: '',
      state: '',
      school: '',
      dob: ''
    }
  }
  const DOBStyles: any = {
    dateIcon: {
      height: 0, width: 0,
    },
    placeholderText: {
      padding: 0,
      alignItems: 'center',
      width: '100%',
      fontSize: RFValue(16),
      fontFamily: THEME.fonts.montRegular,
    },
    dateText: {
      color: 'black',
      padding: 0,
      alignItems: 'center',
      width: '100%',
      fontSize: RFValue(16),
      fontFamily: THEME.fonts.montRegular,
    },
    dateTouchBody: {
      width: '100%',
    },
    dateInput: {
      borderWidth: 0,
      width: '100%',
    }
  }

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [school, setSchool] = useState('');
  const [dob, setDob] = useState('');
  const [graduation, setGraduation] = useState('');

  const [schoolId, setSchoolId] = useState<any>();
  const [schoolIdKey, setSchoolIdKey] = useState();
  const [sports, setSports] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState('');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [values, setValues] = useState({
    menActive: false,
    womenActive: false,
  });

  const [loading, setLoading] = useState(false);

  const imageGalleryLaunch = () => {
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (res: any) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        Alert.alert(res.customButton);
      } else {
        let file = {
          uri: res.assets[0].uri,
          type: res.assets[0].type,
          name: res.assets[0].fileName
        }
        uploadToServer(file)
        setSchoolId(file)
      }
    });
  }

  const uploadToServer = async (file: any) => {

    const data = new FormData();
    data.append('type', 'school');
    data.append('file', file);

    setLoading(true);
    upload(data)
      .then(res => {
        console.log(res.data)
        setSchoolIdKey(res.data.data.filekey)
      })
      .catch(err => {
        console.log(err.response.data)
        Alert.alert('Failed! to Upload Image.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let schema = yup.object().shape({
    email: yup.string().email(),
  });

  let schemaplayer = yup.object().shape({
    name: yup.string().required(),
    phone: yup.string().required(),
    zip: yup.string().required(),
    dob: yup.date().required(),
    school: yup.string().required(),
    graduation: yup.string().required(),
    // schoolid: yup.string().required(),
    // schoolemail: yup.string().email(),
  });

  let schemacoach = yup.object().shape({
    name: yup.string().required(),
    school: yup.string().required(),
    schoolemail: yup.string().email().required(),
  });

  const submit = () => {
    if (type === 'Coach') {
      checkcoach()
    } else if (type == 'Athlete') {
      checkplayer()
    }
  }

  const checkplayer = () => {
    schemaplayer
      .isValid({
        name: name,
        phone: phone,
        zip: zip,
        school: school,
        dob: dob,
        graduation: graduation,
      }).then(valid => {
        if (!valid) {
          helpers.showToastFail('Please fill all feilds.')
        } else if (!values.menActive && !values.womenActive) {
          helpers.showToastFail('Please select Sport Type, from men\'s sport or women\'s sport.')
        } else {
          onContinue()
        }
      })
  }

  const emailCheck = () => {
    schema
      .isValid({
        email: schoolEmail,
      }).then(valid => {
        if (!valid) {
          helpers.showToastFail('Invalid Email.')
        }
      })
  }

  const checkcoach = () => {
    schemacoach
      .isValid({
        name: name,
        school: school,
        schoolid: schoolId,
        schoolemail: schoolEmail,
      }).then(valid => {
        if (!valid) {
          console.log(valid)
          helpers.showToastFail('Please enter all fields in valid format.')
        } else if (!values.menActive && !values.womenActive) {
          helpers.showToastFail('Please select Sport Type, from men\'s sport or women\'s sport.')
        } else if (schoolId === '') {
          helpers.showToastFail('Please select school id Picture.')
        } else if (schoolEmail !== emailVerify) {
          helpers.showToastFail('School email does not match.')
        } else {
          onContinue()
        }
      })
  }

  const onContinue = () => {
    const playerParams = {
      role: ROLES_MAP.PLAYER,
      firstName: name,
      email: data.name,
      password: data.password,
      phoneNumber: phone,
      state: zip,
      school: school,
      dateOfBirth: dob,
      graduationYear: graduation,
      competeIn: values.womenActive ? 'women' : values.menActive ? 'men' : '',
      deviceId: fcmToken,
      mainSportId: '',
      sportIds: [],
    }

    const coachParams = {
      role: ROLES_MAP.COACH,
      firstName: name,
      email: data.name,
      password: data.password,
      school: school,

      schoolEmail: schoolEmail,
      schoolCardKey: schoolIdKey,
      // schoolCardKey: "00ad620f-82a1-4cbb-8700-f67f6e19a815-1627162379309-Screenshot_2021_07_20_at_2.20.30_AM.png",

      mainSportId: "23",
      competeIn: values.womenActive ? 'women' : values.menActive ? 'men' : '',
      deviceId: fcmToken,
    };

    if (type === 'Coach') {
      navigation.navigate('SelectSport', { params: coachParams, type: type, sportsType: values })
    } else {
      navigation.navigate('SelectSport', { params: playerParams, type: type, sportsType: values })
    }

  }

  const signUpOthers = (values: any, action: any) => {
    setLoading(true);
    let params = {
      role: ROLES_MAP.OTHERS,
      firstName: values.name,
      email: data.name,
      password: data.password,
      state: values.state,
      school: values.school,
      dateOfBirth: values.dob,
      deviceId: fcmToken,
    }
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
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Wrapper>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={true}>
        <View style={STYLES.header}>
          <HeaderLeft navigation={navigation} />
        </View>
        <ImageBackground
          source={InputBackground1}
          style={STYLES.topBgImage}></ImageBackground>
        <View style={STYLES.subHeader}>
          <Text style={STYLES.headerText}>{type} it is!</Text>
          <Text style={STYLES.headerSubText}>Let's get your stats</Text>
        </View>
        {
          type == 'Other' ?
            <Formik
              innerRef={otherFormRef}
              initialValues={initialVals.others}
              onSubmit={signUpOthers}
              validationSchema={OtherSignupVS}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                setFieldValue,
                setValues,
              }) => (
                <>
                  <View style={STYLES.textFieldContainer}>
                    <InputField
                      onChangeText={handleChange('name')}
                      placeholder={'FULL NAME'}
                      inputStyle={STYLES.textField}
                    />
                    <Text style={STYLES.error}>
                      {touched.name && errors.name ? errors.name : ''}
                    </Text>
                    <InputField
                      onChangeText={handleChange('state')}
                      placeholder={'STATE'}
                      inputStyle={STYLES.textField}
                    />
                    <Text style={STYLES.error}>
                      {touched.state && errors.state ? errors.state : ''}
                    </Text>
                    <InputField
                      onChangeText={handleChange('school')}
                      placeholder={'SCHOOL'}
                      inputStyle={STYLES.textField}
                    />
                    <Text style={STYLES.error}>
                      {touched.school && errors.school ? errors.school : ''}
                    </Text>
                    <DatePicker
                      date={values.dob}
                      mode="date"
                      placeholder="DATE OF BIRTH"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      style={STYLES.dobFieldWrap}
                      customStyles={DOBStyles}
                      onDateChange={(date) => {
                        setFieldValue('dob', date);
                      }}
                    />
                    <Text style={STYLES.error}>
                      {touched.dob && errors.dob ? errors.dob : ''}
                    </Text>
                  </View>
                  <View style={[STYLES.footerContainer, STYLES.continueContainer]}>
                    <AppButton
                      name="Continue"
                      onPress={handleSubmit}
                    />
                  </View>
                </>
              )}
            </Formik> : null
        }
        {
          type === 'Athlete' ?
            <View style={STYLES.textFieldContainer}>
              <InputField
                value={name}
                onChangeText={setName}
                placeholder={'FULL NAME'}
                inputStyle={STYLES.textField}
              />
              <Text style={STYLES.error}>
                {/* {touched.name && errors.name ? errors.name : ''} */}
              </Text>

              <InputField
                value={phone}
                onChangeText={setPhone}
                placeholder={'PHONE NUMBER'}
                inputStyle={STYLES.textField}
                keyboardType={'number-pad'}
              />
              <Text style={STYLES.error}>
                {/* {touched.name && errors.name ? errors.name : ''} */}
              </Text>
              <InputField
                value={zip}
                onChangeText={setZip}
                placeholder={'STATE'}
                inputStyle={STYLES.textField}
              />
              <Text style={STYLES.error}>
                {/* {touched.name && errors.name ? errors.name : ''} */}
              </Text>
              <InputField
                value={school}
                onChangeText={setSchool}
                placeholder={'HIGH SCHOOL'}
                inputStyle={STYLES.textField}
              />
              <Text style={STYLES.error}>
                {/* {touched.name && errors.name ? errors.name : ''} */}
              </Text>
              <DatePicker
                date={dob}
                mode="date"
                placeholder="DATE OF BIRTH"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                style={STYLES.dobFieldWrap}
                customStyles={DOBStyles}
                onDateChange={(date) => { setDob(date) }}
              />
              <Text style={STYLES.error}>
                {/* {touched.name && errors.name ? errors.name : ''} */}
              </Text>
              <InputField
                value={graduation}
                onChangeText={setGraduation}
                placeholder={'GRADUATION YEAR'}
                inputStyle={STYLES.textField}
                keyboardType={'number-pad'}
              />
              <Text style={STYLES.error}>
                {/* {touched.name && errors.name ? errors.name : ''} */}
              </Text>

            </View>
            : null
        }
        {
          type == 'Coach' ?
            <View style={STYLES.textFieldContainer}>
              <InputField
                value={name}
                onChangeText={setName}
                placeholder={'NAME'}
                inputStyle={STYLES.textField} />
              <Text style={STYLES.error}>
                {/* {touched.name && errors.name ? errors.name : ''} */}
              </Text>
              <InputField
                value={school}
                onChangeText={setSchool}
                placeholder={'SCHOOL'}
                inputStyle={STYLES.textField}
              />
              <Text style={STYLES.error}>
                {/* {touched.name && errors.name ? errors.name : ''} */}
              </Text>
              <Touch
                onPress={() => {
                  imageGalleryLaunch()
                }}
                style={STYLES.schoolIdField}
              >
                <Text style={{ ...STYLES.textField, color: '#C7C7CD' }}>{schoolId ? schoolId.name : 'SCHOOL ID'}</Text>
              </Touch>
              <Text style={STYLES.error}>
                {/* {touched.name && errors.name ? errors.name : ''} */}
              </Text>
              <InputField
                value={schoolEmail}
                onChangeText={setSchoolEmail}
                placeholder={'SCHOOL EMAIL'}
                keyboardType={'email-address'}
                inputStyle={STYLES.textField}
                onEndEditing={() => emailCheck()}
              />
              <Text style={STYLES.error}>
                {/* {touched.name && errors.name ? errors.name : ''} */}
              </Text>
              <InputField
                value={emailVerify}
                onChangeText={setEmailVerify}
                placeholder={'VERIFY EMAIL'}
                keyboardType={'email-address'}
                inputStyle={STYLES.textField}
              />
              <Text style={STYLES.error}>
                {/* {touched.name && errors.name ? errors.name : ''} */}
              </Text>
            </View> : null
        }
        {
          type != 'Other' ?
            <View style={STYLES.footerContainer}>
              <View style={STYLES.competeUnderline}>
                <Text style={STYLES.competeStyle}>I {type === 'Athlete' ? 'Play' : type}</Text>
              </View>
              <View style={STYLES.choiceContainer}>
                <View
                  style={
                    values.menActive ? STYLES.mSportActive : STYLES.mSportContainer
                  }>
                  <Touch
                    onPress={() => {
                      setValues(prev => ({
                        ...prev,
                        menActive: true,
                        womenActive: false,
                      }));
                    }}>
                    <Text
                      style={
                        values.menActive ? STYLES.activeText : STYLES.textColor
                      }>
                      MEN'S SPORTS
                    </Text>
                  </Touch>
                </View>
                <View style={STYLES.verticalDivider}></View>
                <Touch
                  onPress={() => {
                    setValues(prev => ({
                      ...prev,
                      menActive: false,
                      womenActive: true,
                    }));
                  }}>
                  <View
                    style={
                      values.womenActive
                        ? STYLES.wSportActive
                        : STYLES.wSportContainer
                    }>
                    <Text
                      style={
                        values.womenActive ? STYLES.activeText : STYLES.textColor
                      }>
                      WOMEN'S SPORTS
                    </Text>
                  </View>
                </Touch>
              </View>

              <View style={STYLES.continueContainer}>
                <AppButton
                  name="Continue"
                  onPress={() => {
                    submit()
                  }}
                />
              </View>
            </View> : null
        }

        <ImageBackground
          source={InputBackground2}
          resizeMode={'contain'}
          style={STYLES.bottomBgImage} />


      </KeyboardAwareScrollView>
      <CustomSpinner
        visible={loading} />
    </Wrapper>
  );
};
export default AthleteInfo;
