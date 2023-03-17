//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { WP, THEME } from '../../exporter';
import I from 'react-native-vector-icons/FontAwesome';
import Touch from '../touch/touch';

// create a component
const Field = (props: any) => {
    const { cst, icon, code, showTouch, press } = props;
    return (
        <View style={[styles.container, cst]}>
            <View style={styles.icArea}>
                {
                    icon ?
                        <I style={styles.icon} name={icon} /> :
                        <Text style={styles.icon}>{code}</Text>
                }

            </View>
            <View style={styles.input}>
                {
                    !showTouch ?
                        <TextInput
                            style={styles.fentry}
                            underlineColorAndroid={'transparent'}
                            {...props}
                        /> :
                        <Touch
                            onPress={press}
                            style={[styles.fentry, styles.btn]}>
                            <Text style={styles.txt}>{'Select Country'}</Text>
                        </Touch>
                }

            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: WP(14),
        backgroundColor: THEME.colors.field,
        borderRadius: 25,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    icArea: {
        width: WP(18),
        height: '100%',
        borderRadius: 20,
        backgroundColor: THEME.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: WP(8),
        fontWeight: 'bold',
        color: THEME.colors.light
    },
    input: {
        flex: 1,
        paddingLeft: WP(2)
    },
    fentry: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        fontSize: WP(5),
        borderBottomWidth: 0
    },
    btn: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    txt: {
        fontSize: WP(5),
        color: THEME.colors.placeHolder
    }
});

//make this component available to the app
export default Field;
