import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

import I from 'react-native-vector-icons/Feather';
import { THEME } from '../../theme/colors';
import { HP, WP } from '../../theme/responsive';
import LinearGradient from 'react-native-linear-gradient';
import { forHorizontalIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import Touch from '../touch/touch';
import { NxtGem } from '../../../assets/images';

const InfoCard = ({ item, navigation, schoolDetails, sport }) => {
    console.log('coaches  ::::: ', item)
    return <View style={{ ...styles.container, paddingTop: item.userId !== null ? 0 : 10 }}>
        <Touch onPress={() => {
            if (item.userId !== null) {
                navigation.navigate('CoachDetails', { coach: item, schoolDetails: schoolDetails, sport: sport })
            }
        }} style={styles.middle}>
            <Text style={styles.title} numberOfLines={2}>{item?.designation ? item?.designation : 'Coach'}</Text>
            <View
                style={{
                    backgroundColor: 'white',
                    marginVertical: WP(0.5),
                    height: WP(15),
                    width: WP(15),
                    borderRadius: WP(15) / 2,
                    borderWidth: 3,
                    borderColor: "#c28d00", alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                <Image
                    source={item.pictureUrl ? { uri: item.pictureUrl } : NxtGem}
                    // source={{ uri: item.pictureUrl ? item.pictureUrl :  }}
                    style={item.pictureUrl ? styles.profileImage : styles.profileImageNxtGem}
                />
            </View>

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>

        </Touch>

        {(item.userId !== null) && <Touch style={styles.bottom} onPress={() => item.userId !== null && navigation.navigate('ChatScreen', { userDetails: item })}>
            <LinearGradient
                colors={['#5a93e4', '#92d3f7']}
                style={styles.bottom}
            >
                <Image style={styles.msgIcon} source={require('../../../assets/images/messagesIcon.png')} />
                <Text style={styles.categoryTxt}>Message</Text>
            </LinearGradient>
        </Touch>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: HP(26),
        width: WP(43),
        margin: HP(0.7),
        borderRadius: HP(2),
        backgroundColor: THEME.colors.white,
        borderWidth: 1,
        borderColor: '#5a93e4',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,

        elevation: 5,
    },
    middle: {
        alignItems: 'center', justifyContent: 'center',
        marginTop: HP(2)
    },
    profileImage: {
        resizeMode: 'contain',
        height: WP(15),
        width: WP(15),
        borderRadius: WP(15) / 2,
    },
    profileImageNxtGem: {
        resizeMode: 'contain',
        height: WP(11),
        width: WP(11),
        borderRadius: WP(15) / 2,
    },
    title: {
        fontFamily: THEME.fonts.montRegular,
        fontWeight: 'bold',
        width: WP(32),
        height: HP(3.4),
        textAlign: 'center',
    },
    name: {
        marginBottom: HP(0.7),
        fontSize: HP(1.5),
        marginTop: HP(0.5)
    },
    email: {
        fontFamily: THEME.fonts.montRegular,
        fontSize: HP(1.5),
        marginBottom: HP(0.7),
        width: WP(32),
        textAlign: 'center'
    },
    bottom: {
        flexDirection: 'row',
        height: HP(6),
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        width: WP(43),
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
    msgIcon: {
        height: HP(3),
        width: HP(4),
        resizeMode: 'contain',
        tintColor: THEME.colors.white
    }
})


export default InfoCard;