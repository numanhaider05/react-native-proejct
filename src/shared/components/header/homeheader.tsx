import React from 'react';
import { View, Image, Platform } from 'react-native';
import I from 'react-native-vector-icons/Feather';
import Touch from '../touch/touch';
import styles from './styles';

const HomeHeader = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Touch onPress={() => navigation.navigate('Menu')}>
                <I name={'menu'} size={30} />
            </Touch>
            <Image source={require('../../../assets/images/logo.png')} style={styles.img} />
            <Touch onPress={() => navigation.navigate('Notifications')}>
                <I name={'bell'} size={30} />
            </Touch>
        </View>
    );
};
export default HomeHeader;
