import React, { useState } from 'react'
import { View, TextInput, Image, ImageBackground, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native'

import I from 'react-native-vector-icons/SimpleLineIcons';
import F from 'react-native-vector-icons/FontAwesome';
import { THEME } from '../../theme/colors';
import { HP, WP } from '../../theme/responsive';

import LinearGradient from 'react-native-linear-gradient';
import { RootStateOrAny, useSelector } from 'react-redux';
import Touch from '../touch/touch';

import * as ImagePicker from "react-native-image-picker"

import { updateUserInfo, updateUserProfile, upload } from '../../../shared/services/HomeService';
import { useDispatch } from 'react-redux';
import Loader from '../../../shared/components/loader';
import helpers from '../../utils/helpers';
import { useEffect } from 'react';
import { setUser } from '../../store/reducers/userReducer';
import { CONSTANTS } from '../../utils/constants';
import FastImage from 'react-native-fast-image';
import { NxtGem } from '../../../assets/images';
import { ROLES } from '../../models/enums';
import Stories from '../story/Stories';

const ProfileDetails = ({ userDetails, navigation, editable, origin, stories }: any) => {
    const dispatch = useDispatch();
    const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);
    const { firstName, pictureUrl, noOfFollowers, noOfFollowings } = userDetails;
    const [nameEdit, setNameEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState({
        pictureKey: '',
        firstName: firstName
    });
    const [showStatus, setShowStatus] = useState(false);

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
            }
        });
    }

    const uploadToServer = async (file: any) => {
        const data = new FormData();
        data.append('type', 'profile');
        data.append('file', file);

        setLoading(true);
        upload(data)
            .then(res => {
                console.log(res);
                if (res.data.meta.status) {
                    let url = `${CONSTANTS.PROFILE_PIC_PATH}${res.data.data.filekey}`;
                    console.log(url);
                    setBody({ ...body, pictureKey: url })
                    let params = {
                        pictureKey: res.data.data.filekey
                    }
                    save(params);
                }
            })
            .catch(err => {
                console.log(err.response.data)
                helpers.showToastFail('Failed! to Upload Image.')
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        setBody({
            ...body,
            firstName: firstName
        })
    }, [userDetails]);

    const updateName = () => {
        let params = {
            firstName: body.firstName
        }
        save(params);
    }

    const save = (params: any) => {
        setLoading(true);

        updateUserProfile(user.id, params)
            .then(res => {
                if (res.data.data) {
                    let tempUser = {
                        ...user,
                        firstName: body.firstName
                    }
                    dispatch(setUser(tempUser));
                }
                helpers.showToastSuccess('Profile Updated');
            })
            .catch(err => {
                helpers.showToastFail(err.response?.data?.meta?.message)
                console.log(err.response.data.meta.message)
            })
            .finally(() => {
            });
    }

    const openStory = () => {
        if (stories.length > 0 && stories[0].stories.length > 0) {
            setShowStatus(true);
        }
    }


    return (
        <>
            <View style={{ ...styles.profile }}>
                <View style={{ zIndex: 999, marginLeft: WP(3) }}>
                    {
                        pictureUrl || body.pictureKey != '' ?
                            <Touch
                                onPress={openStory}>
                                <FastImage
                                    resizeMode={'cover'}
                                    source={{ uri: body.pictureKey != '' ? body.pictureKey : pictureUrl }}
                                    style={{ ...styles.profileImage, borderColor: userDetails.roleId === ROLES.COACH ? THEME.colors.gold : stories && stories.length > 0 ? THEME.colors.primary : THEME.colors.blck, }}
                                    onLoadStart={() => {
                                        setLoading(true)
                                    }}
                                    onLoadEnd={() => {
                                        setLoading(false)
                                    }}
                                >
                                    {loading && <ActivityIndicator color={THEME.colors.primary} />}
                                </FastImage>
                            </Touch>
                            :
                            <Touch
                                onPress={openStory}
                                style={{ ...styles.profileImage, borderColor: userDetails.roleId === ROLES.COACH ? THEME.colors.gold : THEME.colors.blck, alignItems: 'center', justifyContent: 'center' }}>
                                <F name={'user'} style={{ color: userDetails.roleId === ROLES.COACH ? THEME.colors.gold : THEME.colors.blck, fontSize: WP(22) }} />
                            </Touch>
                    }
                    {
                        editable ?
                            <Touch
                                onPress={() => {
                                    imageGalleryLaunch()
                                }}
                                style={styles.penView}>
                                <I name={'pencil'} style={styles.profilePencilIcon} size={HP(2)} />
                            </Touch> : null
                    }

                </View>
                <View style={{ position: 'absolute', zIndex: 9, paddingTop: HP(3.5) }}>
                    <ImageBackground
                        source={require('../../../assets/images/rectangleBack.png')}
                        style={styles.imgBack}
                        imageStyle={{ tintColor: userDetails.roleId === ROLES.COACH ? THEME.colors.gold : THEME.colors.blck }}
                    >
                        <TextInput
                            multiline={false}
                            value={body.firstName}
                            onChangeText={(v) => { setBody({ ...body, "firstName": v }) }}
                            style={{ ...styles.textName, color: userDetails.roleId === ROLES.COACH ? THEME.colors.blck : THEME.colors.light }}
                            editable={nameEdit}
                            returnKeyType={'done'}
                            onEndEditing={() => updateName()}
                        />
                        {
                            editable ?
                                <Touch onPress={() => { setNameEdit(!nameEdit) }}>
                                    <I name={'pencil'} color={userDetails.roleId === ROLES.COACH ? 'black' : 'white'} style={styles.pencilIcon} size={HP(2)} />
                                </Touch> : null
                        }

                    </ImageBackground>
                    <View style={{}}>
                        <LinearGradient
                            colors={['#f5fdff', '#eaf5fe', '#fef3fe']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            style={{ ...styles.gradient }}>
                            <Touch onPress={() => { origin === 'publicUser' ? navigation.navigate('Followings', { userDetails: userDetails, origin: origin }) : navigation.navigate('Followings', { userDetails: userDetails, origin: 'personal' }) }}>
                                <Text style={styles.follow}>Following <Text style={styles.followNo}>{noOfFollowings}</Text></Text>
                            </Touch>
                            <Touch onPress={() => { origin === 'publicUser' ? navigation.navigate('Followers', { userDetails: userDetails, origin: origin }) : navigation.navigate('Followers', { userDetails: userDetails, origin: 'personal' }) }}>
                                <Text style={styles.follow}>Followers <Text style={styles.followNo}>{noOfFollowers}</Text></Text>
                            </Touch>
                        </LinearGradient>
                    </View>
                </View>
            </View>
            <Stories
                statuses={stories}
                showThis={0}
                showStory={showStatus}
                closeIt={() => {
                    setShowStatus(false);
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: HP(1),
    },
    textName: {
        fontFamily: THEME.fonts.montRegular,
        color: THEME.colors.white,
        fontWeight: '900',
        marginLeft: WP(5),
    },
    profileImage: {
        backgroundColor: 'white',
        height: HP(15),
        width: HP(15),
        borderRadius: HP(15) / 2,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pencilIcon: {
        marginLeft: WP(2)
    },
    imgBack: {
        marginLeft: HP(16),
        flexDirection: 'row',
        alignItems: 'center',
        height: HP(3),
        width: WP(60)
    },
    penView: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0, right: 0,
        padding: HP(1),
        borderWidth: 2,
        borderRadius: HP(4.5) / 2,
        borderColor: '#5a7c93',
    },
    profilePencilIcon: {

    },

    gradient: {
        paddingLeft: WP(36.5),
        flexDirection: 'row',
        alignItems: 'center',
        height: HP(4),
        width: WP(100),
    },
    follow: {
        fontFamily: THEME.fonts.montRegular,
        marginLeft: WP(3.5)
    },
    followNo: {
        fontFamily: THEME.fonts.montRegular,
        color: '#043659',
        fontWeight: 'bold'
    },

})


export default ProfileDetails;