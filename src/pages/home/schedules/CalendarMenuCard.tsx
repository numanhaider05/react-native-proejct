import React from 'react';
import { Text, View, Modal, StyleSheet, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
// import Colors from "../../assets/common/Colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
// import MyStyles from "../../assets/common/MyStyles";
import { THEME, WP } from '../../../shared/exporter';
import Touch from '../../../shared/components/touch/touch';


function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

const CalendarMenuCard = ({ item }) => {
    console.log(item)
    const isUrl = validURL(item.image)
    console.log(isUrl)

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.95, }}>
                    {/* <Text style={styles.activityText}>{item.image}</Text> */}
                </View>
                <Touch onPress={() => {

                }} style={{ flex: 0.05, justifyContent: 'center' }}>
                    <Icon name={'ellipsis-v'} size={15} color={THEME.colors.white} />
                </Touch>
                {/* <Modal
                    animationType="fade"
                    transparent={true}
                    visible={true}
                    // onRequestClose={() => {
                    //     // Alert.alert("Modal has been closed.");
                    //     setModalVisible(!modalVisible);
                    // }}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View style={{
                        backgroundColor: 'red', flex: 1,
                        height: WP(10),
                        width: WP(20),
                    }}>
                        <Text>dsafsdf</Text>
                    </View>
                </Modal> */}
            </View>

            <Image
                source={{ uri: item.image }}
                // source={require('../../../assets/images/Athlete.png')}
                style={{ height: WP(40), width: WP(65), marginTop: WP(1), borderRadius: 18, resizeMode: 'stretch' }}
            />


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: wp('80%'),
        backgroundColor: THEME.colors.primary,
        borderRadius: hp('3%'),
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('2%')
    },
    activityText: {
        color: THEME.colors.white,
    },
    locationText: {
        color: THEME.colors.white,
        fontWeight: 'bold',
        marginTop: hp('0.5%')
    },
    text: {
        color: THEME.colors.white
    },
    avatarStyle: {
        height: hp('5%'),
        width: wp('5%'),
        resizeMode: 'contain'
    }
})

export default CalendarMenuCard
