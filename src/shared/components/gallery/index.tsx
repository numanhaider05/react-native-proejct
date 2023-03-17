//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import { HP, RF, THEME, WP } from '../../exporter';
import Touch from '../touch/touch';

// create a component
const GalleryView = ({ posts, canAdd, noPostsMsg, navigation }: Partial<{ posts: any, canAdd: boolean, noPostsMsg: string, navigation: any }>) => {
    return (
        posts.length > 0 ?
            <View style={styles.wrapper}>
                {
                    posts.map((item: any, index: any) => {
                        return (
                            <View key={index.toString()} style={styles.imgWrap}>
                                {
                                    item.contents[0].type.includes('video') ?
                                        <>
                                            <Touch
                                                onPress={() => {
                                                    navigation.navigate('PostViewScreen', { postId: item.id });
                                                }}
                                                style={[styles.images, styles.videoWrp]}>
                                                <Feather name={'play'} size={RF(35)} />
                                            </Touch>
                                        </> :
                                        <Touch
                                            onPress={() => {
                                                navigation.navigate('PostViewScreen', { postId: item.id });
                                            }}>
                                            <FastImage
                                                source={{ uri: item.contents[0].contentUrl }}
                                                style={styles.images}
                                            />
                                        </Touch>
                                }

                            </View>
                        )
                    })
                }
            </View> :
            <View style={styles.noWrapper}>
                <Text style={styles.bottomtxt}>{noPostsMsg}</Text>
                {
                    canAdd ?
                        <View style={styles.iconPlus}>
                            <Feather name="plus" size={HP(2.5)} />
                        </View> : null
                }

            </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    wrapper: { margin: WP(4), flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' },
    imgWrap: { alignItems: 'center', justifyContent: 'center', marginBottom: WP(2) },
    images: {
        height: WP(29),
        width: WP(29),
        resizeMode: 'contain'
    },
    videoWrp: {
        backgroundColor: THEME.colors.overlay,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noWrapper: { alignItems: 'center', justifyContent: 'center', height: HP(20) },
    bottomtxt: {
        fontFamily: THEME.fonts.montRegular,
        color: THEME.colors.blck,
        fontSize: HP(1.6),
        fontWeight: 'bold',
    },
    iconPlus: {
        marginTop: HP(2),
        borderWidth: 2,
        borderRadius: HP(3),
        padding: HP(1)
    },
});

//make this component available to the app
export default GalleryView;
