import React, { useState } from 'react'
import { View, Image, Pressable, Text, StyleSheet } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar, Time, Day, } from 'react-native-gifted-chat'
import { HP, THEME, WP } from '../../../shared/exporter';

import { STYLES } from './chats.style';

import { RootStateOrAny, useSelector } from 'react-redux';


const RenderMessage = ({ props }: any) => {
    const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);

    if (props.currentMessage.activity) {
        if (props.currentMessage.user._id === 1) {
            return (
                <View style={{ marginBottom: hp(2), alignSelf: 'flex-end' }}>

                    <View style={{ flexDirection: 'row', width: wp(95), justifyContent: 'space-between' }}>
                        <Pressable style={{}}>
                            {/* <Image source={require('../../images/EclipseIcon.png')} style={{}} /> */}
                        </Pressable>
                        <View
                            style={{
                                backgroundColor: THEME.colors.primary,
                                borderRadius: 1,
                                maxWidth: wp(80),
                                borderBottomRightRadius: 0,
                                marginRight: wp(5),

                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,

                                elevation: 5,
                            }}
                        >

                            {/* <Image source={require('../../images/msgImg.jpeg')} style={{ height: hp(15), width: wp(70), borderTopLeftRadius: 20, borderTopRightRadius: 20, resizeMode: 'stretch' }} /> */}
                            <Text
                                style={{
                                    marginTop: hp(1),
                                    paddingHorizontal: wp(3),
                                    paddingVertical: hp(0.2),
                                    maxWidth: wp(70),
                                    // ...MyStyles.blackTextMid,
                                    fontWeight: '900'
                                }}
                            >
                                {props.currentMessage.text}
                            </Text>
                            <Text
                                style={{
                                    maxWidth: wp(70), paddingHorizontal: wp(3),
                                    paddingVertical: hp(0.2),
                                    // ...MyStyles.greyTextMid,

                                }}
                            >
                                {props.currentMessage.category}
                            </Text>
                            <Text
                                style={{
                                    maxWidth: wp(70), paddingHorizontal: wp(3),
                                    paddingVertical: hp(0.2),
                                    // ...MyStyles.greyTextMid,
                                }}
                            >
                                12 JUN 2021
                            </Text>
                            <Text
                                style={{
                                    maxWidth: wp(70), paddingHorizontal: wp(3),
                                    paddingVertical: hp(0.2),
                                    marginBottom: hp(1),
                                    // ...MyStyles.greyTextMid,
                                }}
                            >
                                Ronaldo Football Stadium, Dubai
                            </Text>
                        </View>
                    </View>
                </View>
            )
        } else {
            console.log('asdas')
            return (
                <View style={{}}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#2B2828', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: WP(2), paddingBottom: HP(1) }}>
                        <Text style={STYLES.chattime}>Today</Text>
                        <Text style={STYLES.chattime}>9:41 PM</Text>
                    </View>
                    <View style={{ flexDirection: 'row', padding: HP(1.5) }}>
                        <Image
                            source={{ uri: 'https://picsum.photos/200/200?' }}
                            style={[STYLES.chatProfileImage,]}
                        />
                        <View>
                            <Text style={STYLES.chatTitle}>{user.firstName}, AHS ‘22</Text>
                            <Text style={STYLES.chatText}>Hey Coach, I am very interested in joining UT’s tennis programm. Would love if you could have a look at my highlight video...</Text>
                        </View>
                    </View>
                    <View>
                        <Image style={STYLES.chatImage} source={{ uri: 'https://picsum.photos/200/200?' }} />
                    </View>
                </View>
            )
        }
    } else {
        if (props.currentMessage.user._id === 1) {
            return (
                <View style={{ marginBottom: hp(2), alignSelf: 'flex-end' }}>
                    {/* <View style={{ flexDirection: 'row' }}>
                {/* <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Day
                            wrapperStyle={{ marginTop: -hp(0.7) }}
                            {...props} dateFormat={'dddd'} />
                        <Time {...props} />
                    </View>
                </View> */}
                    <View style={{ flexDirection: 'row', width: wp(95), justifyContent: 'space-between' }}>
                        <Pressable style={{}}>
                            {/* <Image source={require('../../images/EclipseIcon.png')} style={{}} /> */}
                        </Pressable>
                        <View
                            style={{
                                flexDirection: 'row',
                                backgroundColor: THEME.colors.primary,
                                borderRadius: 1,
                                maxWidth: wp(80),
                                // borderRadius: 20,
                                borderBottomRightRadius: 0,
                                marginRight: wp(5),
                                padding: wp(3),

                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,

                                elevation: 5,
                            }}
                        >
                            <Text
                                style={{
                                    maxWidth: wp(70),
                                    // color: Colors.headingGrey
                                }}
                            >
                                {props.currentMessage.text}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        } else {
            console.log('asdas')
            return (
                <View style={{ marginTop: hp(1), marginBottom: hp(2), alignSelf: 'flex-start' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: wp(2), marginBottom: hp(1) }}>
                            <Avatar
                                {...props}
                            />
                        </View>
                        <View>
                            <Text>{props.currentMessage.user.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Day
                                    wrapperStyle={{ marginTop: -hp(0.7) }}
                                    {...props} dateFormat={'dddd'} />
                                <Time {...props} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: wp(93), justifyContent: 'space-between' }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                backgroundColor: THEME.colors.primary,
                                borderRadius: 1,
                                maxWidth: wp(85),
                                // borderRadius: 20,
                                borderTopLeftRadius: 0,
                                marginLeft: wp(13),
                                padding: wp(3)
                            }}
                        >
                            <Text
                                style={{
                                    maxWidth: wp(70),
                                    // color: Colors.headingGrey
                                }}
                            >
                                {props.currentMessage.text}
                            </Text>
                        </View>
                        <Pressable>
                            {/* <Image source={require('../../images/EclipseIcon.png')} style={{ marginLeft: wp(3) }} /> */}
                        </Pressable>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({

})


export default RenderMessage;