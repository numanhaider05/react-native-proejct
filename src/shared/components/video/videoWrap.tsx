//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, DeviceEventEmitter } from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import LottieView from 'lottie-react-native';
import { HP, THEME, WP } from '../../exporter';
import Feather from 'react-native-vector-icons/Feather';

// create a component
const VideoPlayer = ({ wrapperStyle, videoUrl, type = 'post', children, currentItemNumber, currentVideoIndex, videoLoaded, onBuffered, onVideoEnded, pauseIt = true }: Partial<{
    wrapperStyle: any, videoUrl: any, type: string, children: any, onVideoEnded: any, pauseIt: any,
    currentItemNumber: number, currentVideoIndex: number, videoLoaded: any, onBuffered: any
}>) => {
    const [paused, setPaused] = useState(pauseIt);
    const [volume, setVolume] = useState(0);
    const [videoIsLoading, setVideoIsLoading] = useState(true);

    useEffect(() => {
        DeviceEventEmitter.addListener('pause-video', () => {
            setPaused(true);
            setVolume(0);
        })
    }, [])

    useEffect(() => {
        if (currentVideoIndex != currentItemNumber) {
            setPaused(true);
            setVolume(0);
        } else {
            setPaused(false);
            setVolume(1);
        }
    }, [currentVideoIndex])

    return (
        <View style={[{ flex: 1, position: 'relative' }, wrapperStyle]}>
            <Pressable style={[wrapperStyle]} onPress={() => {
                if (type != 'story')
                    if (paused) {
                        setPaused(false);
                        setVolume(1);
                    } else {
                        setPaused(true);
                        setVolume(0);
                    }
            }}>
                <Video
                    source={{ uri: convertToProxyURL(videoUrl) }}
                    style={[styles.video, !paused ? { zIndex: -1 } : null]}
                    onError={(err) => {
                        console.log(err);
                    }}
                    onBuffer={() => {
                        if (onBuffered) {
                            onBuffered();
                        }
                    }}
                    onLoad={(res) => {
                        setVideoIsLoading(false);
                        if (videoLoaded)
                            videoLoaded(res);
                    }}
                    onEnd={() => {
                        if (onVideoEnded)
                            onVideoEnded();
                    }}
                    resizeMode={'cover'}
                    repeat={type === 'story' ? false : true}
                    paused={paused}
                    volume={volume}
                />
                {
                    videoIsLoading ?
                        <View style={styles.loadingWrap}>
                            <LottieView
                                style={styles.animationIcon}
                                source={require('../../../assets/lotties/videoLoading.json')}
                                autoPlay={true}
                                loop={true}
                                imageAssetsFolder={'images'}
                            />
                        </View>
                        : null
                }
                {
                    paused && type != 'story' ?
                        <Feather name={'play'} style={styles.playPause} />
                        : null
                }
            </Pressable>

            {children}
        </View>

    );
};

const heightOfPost = Dimensions.get('window').height - HP(30);

const styles = StyleSheet.create({
    video: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },
    loadingWrap: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: heightOfPost,
        backgroundColor: THEME.colors.overlay,
        margin: 'auto',
        zIndex: 999
    },
    animationIcon: {
        height: 150,
        width: 150
    },
    playPause: {
        fontSize: WP(35),
        position: 'absolute',
        top: '35%',
        left: '35%',
        margin: 'auto',
        zIndex: 999,
        color: THEME.colors.light
    }
});

//make this component available to the app
export default VideoPlayer;
