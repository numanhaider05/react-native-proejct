//import liraries
import React, { Component } from 'react';
import {
    TouchableOpacity, TouchableNativeFeedback, Platform,
    View
} from 'react-native';

const Touch = ({ onPress, children, style, disableIt }: Partial<{ disableIt: boolean, children: any, style: any, onPress: () => void }>) => {
    return Platform.OS == 'android' ? (
        <TouchableNativeFeedback
            disabled={disableIt ? disableIt : false} onPress={onPress}
        >
            <View
                style={[style ? style : null, disableIt ? { opacity: 0.5 } : null]}
            >
                {children}
            </View>
        </TouchableNativeFeedback>
    ) : (
        <TouchableOpacity style={[style ? style : null, disableIt ? { opacity: 0.5 } : null]} disabled={disableIt ? disableIt : false} onPress={onPress} >
            {/* <View style={[style ? style : null, disableIt ? { opacity: 0.5 } : null]} > */}
            {children}
            {/* </View> */}
        </TouchableOpacity>
    );
};

export default Touch;
