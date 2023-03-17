//import liraries
import React, { useState, useEffect } from 'react';
import {
    ImageBackground, Image, Text,
    View, Alert, ActivityIndicator
} from 'react-native';
import Header from './header';
import styles from './styles';
import I from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import { HP } from '../../theme/responsive';
import Touch from '../touch/touch';
import { THEME } from '../../theme/colors';
import FastImage from 'react-native-fast-image';
import { NxtGem } from '../../../assets/images';
import * as ImagePicker from "react-native-image-picker"

import { RootStateOrAny, useSelector } from 'react-redux';
import { updateUserInfo, updateUserProfile, upload } from '../../../shared/services/HomeService';
import { useDispatch } from 'react-redux';
import Loader from '../../../shared/components/loader';
import helpers from '../../utils/helpers';
import { setUser } from '../../store/reducers/userReducer';
import { CONSTANTS } from '../../utils/constants';
import { ROLES } from '../../models/enums';


const HeaderBg = ({ children, bg, title, backgroundColor, editable, navigation, location, item, cover, updateUser }: any) => {

    const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);
    const [coverLoading, setCoverLoading] = useState(true);

    const imageGalleryLaunch = () => {
        let options: any = {
            mediaType: 'photo',
            includeBase64: true,
            maxWidth: 500,
            maxHeight: 400,
            quality: 1,
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

        setCoverLoading(true);
        upload(data)
            .then(res => {
                if (res.data.meta.status) {
                    let url = `${CONSTANTS.PROFILE_PIC_PATH}${res.data.data.filekey}`;
                    let params = {
                        coverKey: res.data.data.filekey
                    }
                    save(params);
                }
            })
            .catch(err => {
                console.log(err.response.data)
                helpers.showToastFail('Failed! to Upload Image.')
            })
    };

    const save = (params: any) => {
        updateUserProfile(user.id, params)
            .then(res => {
                if (res.data.data) {
                    updateUser(res.data.data.coverUrl);
                }
                helpers.showToastSuccess('Cover Updated');
            })
            .catch(err => {
                helpers.showToastFail(err.response?.data?.meta?.message)
                console.log(err.response.data.meta.message)
            })
            .finally(() => {
                setCoverLoading(false);
            });
    }

    return (<>
        {backgroundColor ?
            <View style={{ ...styles.imageBack, backgroundColor: backgroundColor }}>
                <Header navigation={navigation} style={{ zIndex: 99 }} />
                <FastImage style={styles.logo} source={{ uri: item.logoUrl }} />
                <Touch onPress={() => navigation.goBack()} style={styles.backContainer}>
                    <SimpleLineIcons name='arrow-left' />
                </Touch>
                <Text style={styles.logoText}>{item.name}</Text>
                <View style={{}}>
                    <LinearGradient
                        colors={['#f5fdff', '#eaf5fe', '#fef3fe']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}
                        style={{ ...styles.gradient }}>
                        <I name={'heart'} size={HP(3)} />
                        <Text style={styles.viewSiteTxt}>View site</Text>
                    </LinearGradient>
                </View>
                {children}
            </View>
            :
            bg ?
                <ImageBackground
                    resizeMode={'cover'}
                    source={bg}
                    imageStyle={styles.imageBack}
                    style={styles.imageBack}
                >
                    <Header navigation={navigation} style={{ zIndex: 99 }} />
                    <View style={{ marginTop: HP(4.5), zIndex: 999, alignItems: 'center', }}>
                        <Touch onPress={() => navigation.goBack()} style={{ ...styles.backContainer, bottom: HP(1), }}>
                            <SimpleLineIcons name='arrow-left' />
                        </Touch>
                        <Text style={{ ...styles.logoText, marginBottom: HP(1) }}>{title}</Text>
                    </View>
                    <View style={{ zIndex: 9999 }}>
                        <LinearGradient
                            colors={['#f5fdff', '#eaf5fe', '#fef3fe']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            style={{ ...styles.gradient }}>
                            <I name={'heart'} size={HP(3)} />
                            <Text style={styles.viewSiteTxt}>View site</Text>
                        </LinearGradient>
                    </View>
                    {children}
                </ImageBackground>
                :
                <>
                    {location === 'coach' ?
                        <View
                            style={styles.imageBack}
                        >
                            <Header navigation={navigation} style={{ zIndex: 99 }} />
                            <Image style={styles.logo} source={{ uri: item.logoUrl }} />
                            {children}
                        </View>
                        :
                        <>
                            <ImageBackground
                                resizeMode={cover ? 'cover' : 'center'}
                                source={cover ? { uri: cover } : NxtGem}
                                style={styles.imageBack}
                                onLoadStart={() => setCoverLoading(true)}
                                onLoadEnd={() => setCoverLoading(false)}>
                                {
                                    coverLoading ?
                                        <View style={styles.tempCover}>
                                            <ActivityIndicator color={THEME.colors.primary} />
                                        </View> : null
                                }


                                <Header navigation={navigation} style={{ zIndex: 99 }} />
                                {
                                    editable ?
                                        <Touch
                                            onPress={() => {
                                                imageGalleryLaunch();
                                            }}
                                            style={{ ...styles.penView, right: 10, padding: HP(0.7), zIndex: 9999 }}>
                                            <SimpleLineIcons name={'pencil'} style={styles.profilePencilIcon} size={HP(2)} />
                                        </Touch> : null
                                }
                                {children}
                            </ImageBackground>

                        </>
                    }
                </>
        }
    </>
    )
};

export default HeaderBg;
