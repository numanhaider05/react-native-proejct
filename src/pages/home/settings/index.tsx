import React, { useState, useRef } from 'react';
import { View, Image, Text, Alert, ScrollView, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { STYLES } from './menu';
import { HP, THEME, WP } from '../../../shared/exporter';
import Touch from '../../../shared/components/touch/touch';
import { useDispatch } from 'react-redux';
import Loader from '../../../shared/components/loader';
import { RootStateOrAny, useSelector } from 'react-redux';
import { deleteUser } from '../../../shared/services/HomeService';
import { signOut } from '../../../shared/store/reducers/userReducer';

const Settings = ({ navigation }: any) => {

  const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();

  const signout = () => {
    setLoading(true)
    try {
      dispatch(signOut(null));
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const deleteConfirm = () => {
    Alert.alert(
      "Delete Account",
      "This will completely delete your account. Are you Sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => DeleteAccount() }
      ]
    );

  }

  const DeleteAccount = () => {
    const token = user.accessToken
    deleteUser(token)
      .then((res) => {
        signout()
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
      .finally(() => {
        setLoading(false);
      });
  }


  return (<>
    {loading ?
      <Loader />
      :
      <View
        style={STYLES.View}
      >

        <View style={STYLES.backCont}>
          <Touch onPress={() => navigation.goBack()}>
            <MaterialIcons name={'arrow-back-ios'} size={HP(2.8)} />
          </Touch>
          <Text style={STYLES.heading}>Settings</Text>
        </View>

        <View style={{ marginTop: HP(3) }}>
          <Touch onPress={() => navigation.navigate('ChangePassword')} style={STYLES.btn}>
            <Text style={STYLES.btnStyle}>Change Password</Text>
          </Touch>

          <Touch onPress={() => deleteConfirm()} style={STYLES.bottomBtn}>
            <Text style={STYLES.bottomBtnText} >Delete My Account</Text>
          </Touch>
        </View>

      </View >
    }


  </>
  );
};
export default Settings;