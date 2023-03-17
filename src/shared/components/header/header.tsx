import React from 'react';
import { View } from 'react-native';
import I from 'react-native-vector-icons/Feather';
import Touch from '../touch/touch';
import styles from './styles';

const Header = ({ navigation, style }: any) => {
    return (
        <View style={{ ...styles.containerHeader, ...style }}>
            <Touch onPress={() => navigation.navigate('Menu')}>
                <I name={'menu'} size={30} />
            </Touch>
            <Touch onPress={() => navigation.navigate('Notifications')}>
                <I name={'bell'} size={30} />
            </Touch>
        </View>
    );
};
export default Header;
