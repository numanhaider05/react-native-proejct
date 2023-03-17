import React, { useState, useRef } from 'react';
import { View, Image, Text, ScrollView, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { STYLES } from './menu';
import { HP, THEME, WP } from '../../../shared/exporter';
import Touch from '../../../shared/components/touch/touch';
import { useDispatch } from 'react-redux';
import { helpQuestion } from '../../../shared/services/AuthService';
import Loader from '../../../shared/components/loader';
import { RootStateOrAny, useSelector } from 'react-redux';
import InputField from '../../../shared/components/inputfield';
import helpers from '../../../shared/utils/helpers';
import { TextInput } from 'react-native-gesture-handler';
import { prepareDataForValidation } from 'formik';

const Help = ({ navigation }: any) => {

    const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);
    const [loading, setLoading] = useState(false);

    const [question, setQuestion] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = () => {

        setLoading(true);
        const params = {
            "question": question,
        };

        helpQuestion(params)
            .then(res => {
                console.log(res.data)
                helpers.showToastSuccess('We have received your request. We will get back to you shortly.')
                navigation.goBack()
            })
            .catch(err => {
                if (err.response) {
                    helpers.showToastFail(err.response?.data?.meta?.message)
                    console.log(err.response?.data?.meta?.message)
                }
            })
            .finally(() => {
                setLoading(false);
            });

    };


    return (<>
        {loading && <Loader />}
        <View
            style={STYLES.View}
        >

            <View style={STYLES.backCont}>
                <Touch onPress={() => navigation.goBack()}>
                    <MaterialIcons name={'arrow-back-ios'} size={HP(2.8)} />
                </Touch>
                <Text style={STYLES.heading}>Help</Text>
            </View>

            <View style={{
                marginHorizontal: WP(10),
                height: HP(15),
                backgroundColor: THEME.colors.lavender,
                borderWidth: 0.3,
                borderColor: THEME.colors.gray,
                borderRadius: 15,
                marginTop: HP(3),
                padding: WP(2)
            }}>
                <TextInput
                    multiline
                    value={question}
                    onChangeText={setQuestion}
                    placeholder={'Describe you Question here'}
                    placeholderTextColor={THEME.colors.blck}
                    style={STYLES.inputFieldStylesHelp}
                />
            </View>



            <View style={{ marginTop: HP(3) }}>
                <Touch onPress={() => handleSubmit()} style={STYLES.btn}>
                    <Text style={STYLES.btnStyle}>Send</Text>
                </Touch>

                {/* <Touch style={STYLES.bottomBtn}>
            <Text style={STYLES.bottomBtnText} >Delete My Account</Text>
          </Touch> */}
            </View>

        </View >

    </>
    );
};
export default Help;