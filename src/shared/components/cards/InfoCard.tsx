import React, { createRef, useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, Touchable, Modal, Alert } from 'react-native'
import { THEME } from '../../theme/colors';
import { HP, RF, WP } from '../../theme/responsive';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Sheet from '../sheet/sheet';
import { InfoType } from '../../models/interface';
import Touch from '../touch/touch';
import { GST, ONLY_IMG_OPTS, upload } from '../../exporter';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CONSTANTS } from '../../utils/constants';
import helpers, { CustomSpinner, Options } from '../../utils/helpers';
import FastImage from 'react-native-fast-image';
import E from 'react-native-vector-icons/Entypo';
interface InfCard {
    information: InfoType,
    infoParams: any,
    updated?: (res: any) => void,
    shouldSave: boolean
}
const InfoCard = ({ information, infoParams, updated, shouldSave }: InfCard) => {
    let actionSheet: any = null;
    const [infoText, setInfoText] = useState<any>();
    const [loading, setLoading] = useState<any>();
    const [showImage, showImageInView] = useState<any>(false);
    const actionSheetRef: any = createRef();

    const saveIt = () => {
        actionSheetRef.current?.hide();
        infoParams[information.key] = infoText;
        if (updated)
            updated(infoParams);
    }

    const cameraPressHandler = () => {
        launchCamera(ONLY_IMG_OPTS, (res: any) => resHandler(res));
    };

    const gallaryPressHandler = () => {
        launchImageLibrary(ONLY_IMG_OPTS, (res: any) => resHandler(res));
    };

    const resHandler = (res: any) => {
        if (!res.didCancel) {
            let file = {
                uri: res.assets[0].uri,
                type: res.assets[0].type,
                name: res.assets[0].filename || `NxtGem${new Date().getTime()}.png`,
            };
            uploadToServer(file);
        }
    };

    const uploadToServer = async (file: any) => {
        setLoading(true);
        const data = new FormData();
        data.append('type', 'transcript');
        data.append('file', file);
        upload(data)
            .then(res => {
                if (res.data.meta.status) {
                    infoParams[information.key] = res.data.data.filekey;
                    if (updated)
                        updated(infoParams);
                }
            })
            .catch(err => {
                console.log(err);
                helpers.showToastFail('Failed! to Upload Image.');
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    setInfoText(infoParams[information.key]);
                    if (information.type === 'picture') {
                        if (shouldSave)
                            actionSheet.show();
                        else
                            showImageInView(true);
                    } else {
                        actionSheetRef.current?.setModalVisible();
                    }

                }}
                style={styles.container}>
                <View style={styles.middle}>
                    <Text style={{ width: '80%', overflow: 'hidden', }} numberOfLines={2} ellipsizeMode={'tail'}>{infoParams[information.key] || '--'}</Text>
                    <View style={styles.line} />
                </View>
                <LinearGradient
                    colors={['#5a93e4', '#92d3f7']}
                    style={styles.bottom}>
                    <Text style={styles.categoryTxt}>{information.category}</Text>
                </LinearGradient>
            </TouchableOpacity>
            <Sheet
                ref={actionSheetRef}
                isCustomView={true}
                itIsClosed={() => {
                    setInfoText('');
                }}>
                <View style={{ minHeight: WP(70) }}>
                    <Text style={{ fontSize: RF(20) }}>Update {information.category}</Text>
                    {
                        shouldSave ?
                            <TextInput
                                value={`${infoText}`}
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={(val: any) => {
                                    setInfoText(val);
                                }}
                                placeholder={'Enter updated value here.'}
                                keyboardType={information.type}
                                placeholderTextColor={THEME.colors.placeHolderDark}
                                style={styles.infoTxtTrue}
                            /> :
                            <Text style={[GST.txt, { color: '#000' }]}>{infoParams[information.key]}</Text>
                    }
                    {
                        shouldSave ?
                            <Touch
                                onPress={saveIt}
                                style={{
                                    marginTop: 20, paddingTop: 10, paddingBottom: 10, alignItems: 'center',
                                    backgroundColor: THEME.colors.primary
                                }}>
                                <Text style={GST.txt}>Submit</Text>
                            </Touch> : null
                    }

                </View>
            </Sheet>
            <Options
                init={(s: any) => {
                    actionSheet = s;
                }}
                heading={'Choose transcript'}
                options={['View Transcript', 'Launch camera', 'Choose from Gallery', 'Cancel']}
                closeIndex={3}
                press={(index: any) => {
                    index === 0 ?
                        infoParams[information.key] ?
                            showImageInView(true) :
                            Alert.alert('No transcript uploaded yet') :
                        index == 1
                            ? cameraPressHandler()
                            : index == 2
                                ? gallaryPressHandler()
                                : null;
                }}
            />
            <Modal
                transparent={true}
                visible={showImage}>
                <Touch style={styles.crossP} onPress={() => {
                    showImageInView(false);
                }}>
                    <E style={{ color: "#fff", fontSize: WP(7) }} name={'cross'} />
                </Touch>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', alignItems: 'center', justifyContent: 'center', zIndex: -1 }}>
                    <FastImage style={{ width: '100%', height: '80%' }} source={{
                        uri: infoParams[information.key]
                    }} />
                </View>

            </Modal>
            <CustomSpinner
                visible={loading} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: HP(16),
        width: WP(28),
        margin: HP(0.7),
        borderRadius: HP(1),
        backgroundColor: THEME.colors.white,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,

        elevation: 5,
    },
    middle: {
        alignItems: 'center', justifyContent: 'center',
        marginTop: HP(4.5)
    },
    crossP: {
        width: WP(10), height: WP(10), alignItems: 'center', justifyContent: 'center',
        position: 'absolute',
        right: 5, top: 20
    },
    infoTxt: {
        fontFamily: THEME.fonts.montRegular,
        textAlign: 'center',
        fontSize: HP(1.2),
    },
    infoTxtTrue: {
        fontFamily: THEME.fonts.montRegular,
        fontSize: WP(3.5),
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: 15
    },
    line: {
        height: 0.7,
        backgroundColor: 'black',
        width: '80%',
        marginVertical: HP(0.5)
    },
    bottom: {
        height: HP(4),
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        width: WP(28),
        borderBottomRightRadius: HP(1),
        borderBottomLeftRadius: HP(1),
        alignItems: 'center', justifyContent: 'center',
    },
    categoryTxt: {
        fontFamily: THEME.fonts.montRegular,
        color: THEME.colors.white,
        fontSize: HP(1.5),
        textAlign: 'center',
        fontWeight: 'bold',
    },
})

export default InfoCard;