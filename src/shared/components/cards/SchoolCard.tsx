import React, { useState } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

import { THEME } from '../../theme/colors';
import { HP, WP } from '../../theme/responsive';
import Touch from '../touch/touch';

import { addSchool } from '../../../shared/services/HomeService';
import Loader from '../../../shared/components/loader';

import { RootStateOrAny, useSelector } from 'react-redux';
import helpers from '../../utils/helpers';


const SchoolCard = ({ item, navigation, bold }) => {
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state: RootStateOrAny) => state.root.user);

    const onAdd = () => {
        setLoading(true);

        let token = user.accessToken
        const params = {
            "collegeId": item.id
        };

        addSchool(params, token)
            .then(res => {
                console.log(res)
                helpers.showToastSuccess(item.name + ' successfully Added been added to your Schools')
            })
            .catch(err => {
                helpers.showToastSuccess(err.response.data.meta.message)
                console.log(err.response.data)
            })
            .finally(() => {
                setLoading(false);
            });
    };


    // console.log(item)
    return (
        <View style={styles.container}>
            {loading && <Loader />}
            <View style={styles.leftcontainer} >
                <Image source={{ uri: item.logoUrl }} style={styles.logo} />
                <Touch onPress={() => onAdd()}>
                    <Text style={styles.addtxt}>Add to my schools</Text>
                </Touch>
                <Touch onPress={() => navigation.navigate('SchoolDetails', { item: item })} style={styles.viewBtn}>
                    <Text style={styles.viewtxt}>View School</Text>
                </Touch>
            </View>
            <View style={styles.rightcontainer} >

                <Text style={{ ...styles.name, fontWeight: bold ? 'bold' : '400' }}>{item.name}</Text>
                <Text style={styles.location}>{item.state}</Text>

                {/* <Text style={styles.infoTxt}>Academics: {item.academics}</Text>
                <Text style={styles.infoTxt}>Athletics: {item.athletics}</Text>
                <Text style={styles.infoTxt}>Campus size: {item.size}</Text> */}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: WP(5),

        height: HP(20),
        width: WP(90),
        marginTop: HP(2.5),
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
    leftcontainer: {
        alignItems: 'center',
        width: WP(33)
    },
    rightcontainer: {
        alignItems: 'flex-start',
        width: WP(40)
    },
    addtxt: {
        fontFamily: THEME.fonts.montRegular,
        textAlign: 'center',
        fontSize: HP(1.4),
        marginTop: HP(0.3),
        marginBottom: HP(1.4),
        textDecorationLine: 'underline'
    },
    viewBtn: {
        backgroundColor: THEME.colors.headings,
        borderRadius: HP(1)
    },
    viewtxt: {
        fontFamily: THEME.fonts.montRegular,
        color: THEME.colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: HP(1.6),
        padding: HP(1),
        paddingHorizontal: HP(2),
    },
    infoTxt: {
        fontFamily: THEME.fonts.montRegular,
        textAlign: 'center',
        fontSize: HP(1.55),
        marginBottom: HP(0.5)
    },
    name: {
        fontFamily: THEME.fonts.montRegular,
        fontSize: HP(2.2),
        textAlign: 'left',
        marginBottom: HP(0.3),

    },
    location: {
        fontFamily: THEME.fonts.montRegular,
        fontSize: HP(1.7),
        textAlign: 'center',
        marginBottom: HP(1.5)
    },
    logo: {
        height: WP(15),
        width: WP(15),
        resizeMode: 'contain'
    }
})


export default SchoolCard;