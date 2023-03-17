import React, { useState, useRef } from 'react';
import { View, Image, Text, ScrollView, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { STYLES } from './menu';
import { HP, THEME, WP } from '../../../shared/exporter';
import Touch from '../../../shared/components/touch/touch';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../../shared/services/AuthService';
import Loader from '../../../shared/components/loader';
import { RootStateOrAny, useSelector } from 'react-redux';
import InputField from '../../../shared/components/inputfield';
import helpers from '../../../shared/utils/helpers';

const ChangePassword = ({ navigation }: any) => {

    const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);
    const [loading, setLoading] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const check = () => {
        if (newPassword !== confirmPassword) {
            helpers.showToastSuccess('Password Does not matched.')
        }
    }

    const handleSubmit = () => {
        console.log(user.accessToken)
        setLoading(true);
        const params = {
            "oldPassword": oldPassword,
            "password": newPassword
        };

        changePassword(params)
            .then(res => {
                helpers.showToastSuccess('Password has been changed.')
                navigation.goBack()
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
        <View
            style={STYLES.View}
        >

            <View style={STYLES.backCont}>
                <Touch onPress={() => navigation.goBack()}>
                    <MaterialIcons name={'arrow-back-ios'} size={HP(2.8)} />
                </Touch>
                <Text style={STYLES.heading}>Change Password</Text>
            </View>

            <View style={{
                marginHorizontal: WP(10)
            }}>
                <InputField
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    placeholder={'Current Password'}
                    inputStyle={STYLES.inputFieldStyles}
                    password={true}
                />

                <InputField
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder={'New Password'}
                    inputStyle={STYLES.inputFieldStyles}
                    password={true}
                />

                <InputField
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder={'Confirm New Password'}
                    inputStyle={STYLES.inputFieldStyles}
                    onEndEditing={() => check()}
                    password={true}
                />
            </View>



            <View style={{ marginTop: HP(3) }}>
                <Touch onPress={() => handleSubmit()} style={STYLES.btn}>
                    <Text style={STYLES.btnStyle}>Change Password</Text>
                </Touch>

                {/* <Touch style={STYLES.bottomBtn}>
            <Text style={STYLES.bottomBtnText} >Delete My Account</Text>
          </Touch> */}
            </View>

        </View >

    </>
    );
};
export default ChangePassword;