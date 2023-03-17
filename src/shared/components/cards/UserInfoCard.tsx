import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

import Feather from 'react-native-vector-icons/Feather';
import { THEME } from '../../theme/colors';
import { HP, WP } from '../../theme/responsive';
import LinearGradient from 'react-native-linear-gradient';

const InfoCard = (item, index) => {
    console.log(item)
    return (
        <View style={styles.container}>
            <View style={styles.middle}>
                <Text style={item.value ? styles.infoTxtTrue : styles.infoTxt}>{item.value ? item.value : 'No Info'}</Text>
                <View style={styles.line} />
                {item.phone && <Text style={styles.infoTxt}>{item.phone}</Text>}
            </View>
            <LinearGradient
                colors={['#5a93e4', '#92d3f7']}
                style={styles.bottom}>
                <Text style={styles.categoryTxt}>{item.category}</Text>
            </LinearGradient>
        </View>
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
    infoTxt: {
        fontFamily: THEME.fonts.montRegular,
        textAlign: 'center',
        fontSize: HP(1.2),
    },
    infoTxtTrue: {
        fontFamily: THEME.fonts.montRegular,
        textAlign: 'center',
        fontSize: HP(1.2),
        fontWeight: 'bold'
    },
    line: {
        height: 0.7,
        backgroundColor: 'black',
        width: WP(15),
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