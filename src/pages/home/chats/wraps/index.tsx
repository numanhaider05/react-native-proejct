import React from 'react';
import {
    Bubble
} from 'react-native-gifted-chat';
import { THEME } from '../../../../shared/exporter';

export const customBubble = (props: any) => (
    <Bubble
        {...props}
        wrapperStyle={{
            right: {
                backgroundColor: THEME.colors.primary,
            }
        }}
    />
)