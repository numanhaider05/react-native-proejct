import React from 'react'
import { View, Image, ImageBackground, Text, StyleSheet } from 'react-native'

import I from 'react-native-vector-icons/SimpleLineIcons';
import { THEME } from '../../theme/colors';
import { HP, WP } from '../../theme/responsive';

import LinearGradient from 'react-native-linear-gradient';

const CoachProfileDetails = ({ followers, followings, name, profilePicture }: any) => {
    return (
        <>
            <View style={{ ...styles.profile }}>
                <View style={{ zIndex: 999, marginLeft: WP(3) }}>
                    {profilePicture === null ?
                        <Image
                            source={require('../../../assets/images/user.png')}
                            style={[styles.profileImage,]}
                        />
                        :
                        <Image
                            source={{ uri: profilePicture }}
                            style={[styles.profileImage,]}
                        />
                    }
                </View>
                <View style={{ position: 'absolute', zIndex: 9, paddingTop: HP(3.5) }}>
                    <ImageBackground
                        source={require('../../../assets/images/rectangleBack.png')}
                        style={styles.imgBack} imageStyle={{ tintColor: '#EAC67A', }}
                    >
                        <Text style={styles.textName} >{name}</Text>
                    </ImageBackground>
                    <View style={{}}>
                        <LinearGradient
                            colors={['#f5fdff', '#eaf5fe', '#fef3fe']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            style={{ ...styles.gradient }}>
                            <Text style={styles.follow}>Following <Text style={styles.followNo}>{followings}</Text></Text>
                            <Text style={styles.follow}>Followers <Text style={styles.followNo}>{followers}</Text></Text>
                        </LinearGradient>
                    </View>
                </View>
            </View>
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
        color: THEME.colors.blck,
        fontSize: HP(2),
        fontWeight: '900',
        marginLeft: WP(17),
    },
    profileImage: {
        backgroundColor: 'white',
        height: HP(15),
        width: HP(15),
        borderRadius: HP(15) / 2,
        borderWidth: 3,
        borderColor: '#EAC67A'
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
    },

})


export default CoachProfileDetails;