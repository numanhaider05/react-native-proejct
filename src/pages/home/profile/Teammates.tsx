import React, { useEffect, useState } from 'react';
import { Image, Text, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { HP, THEME, WP } from '../../../shared/exporter';
import { RFValue } from 'react-native-responsive-fontsize';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import I from 'react-native-vector-icons/MaterialIcons';
import Touch from '../../../shared/components/touch/touch';
import HeaderBg from '../../../shared/components/header/headerBg';
import Card from '../../../shared/components/sportCard';

import { getSports } from '../../../shared/services/sport.service';

const Teammates = ({ navigation, route }: any) => {

    // const [item, setItem] = useState(route.params.item)
    const [selectedTab, setSelectedTab] = useState(1)

    const [sports, setSports] = useState([]);
    const [selectedAdditionalSports, setSelectedSports] = useState(false);
    const [values, setValues] = useState({
        menActive: false,
        womenActive: false,
    });
    useEffect(() => {
        getSports((res: any) => setSports(res.data));
    }, []);

    return (
        <View style={STYLES.container}>
            {/* <HeaderBg item={item} navigation={navigation} backgroundColor={THEME.colors.white}> */}
            {/* </HeaderBg> */}
            <Touch onPress={() => navigation.goBack()} style={{ ...STYLES.backContainer, }}>
                <SimpleLineIcons name='arrow-left' />
            </Touch>

            <View style={STYLES.tabs}>
                <Touch onPress={() => setSelectedTab(1)} style={selectedTab === 1 ? STYLES.selectedTab : STYLES.tab}>
                    <Text style={STYLES.tabText}>Sports</Text>
                </Touch>
                {/* <Touch onPress={() => setSelectedTab(2)} style={selectedTab === 2 ? STYLES.selectedTab : STYLES.tab}>
                    <Text style={STYLES.tabText}>Sports</Text>
                </Touch>
                <Touch onPress={() => setSelectedTab(3)} style={selectedTab === 3 ? STYLES.selectedTab : STYLES.tab}>
                    <Text style={STYLES.tabText}>Coaches</Text>
                </Touch> */}

            </View>
            <View style={STYLES.choiceContainer}>
                <View
                    style={
                        values.menActive ? STYLES.mSportActive : STYLES.mSportContainer
                    }>
                    <Touch
                        onPress={() => {
                            setValues(prev => ({
                                ...prev,
                                menActive: true,
                                womenActive: false,
                            }));
                        }}>
                        <Text
                            style={
                                values.menActive ? STYLES.activeText : STYLES.textColor
                            }>
                            MEN'S SPORTS
                        </Text>
                    </Touch>
                </View>
                <View style={STYLES.verticalDivider}></View>
                <Touch
                    onPress={() => {
                        setValues(prev => ({
                            ...prev,
                            menActive: false,
                            womenActive: true,
                        }));
                    }}>
                    <View
                        style={
                            values.womenActive
                                ? STYLES.wSportActive
                                : STYLES.wSportContainer
                        }>
                        <Text
                            style={
                                values.womenActive ? STYLES.activeText : STYLES.textColor
                            }>
                            WOMEN'S SPORTS
                        </Text>
                    </View>
                </Touch>
            </View>
            <ScrollView>
                <View style={{ marginTop: HP(2) }}>
                    <View style={STYLES.cardContainer}>
                        {sports.length > 0 &&
                            sports.map((sport, index) => {
                                return (
                                    <>
                                        {values.menActive ?
                                            <>
                                                {sport.gender === 'M' &&
                                                    <Touch
                                                        key={index}>
                                                        <Card
                                                            item={sport}
                                                            // schoolitem={item}
                                                            location={'teammates'}
                                                            index={index} navigation={navigation} />
                                                    </Touch>
                                                }
                                            </>
                                            :
                                            <>
                                                {sport.gender === 'F' &&
                                                    <Touch
                                                        key={index}>
                                                        <Card
                                                            item={sport}
                                                            // schoolitem={item}
                                                            location={'teammates'}
                                                            index={index} navigation={navigation} />
                                                    </Touch>
                                                }
                                            </>
                                        }
                                    </>


                                );
                            })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default Teammates;


const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.white
    },
    cardContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tabs: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: WP(1),
        borderColor: THEME.colors.gray,
        borderBottomWidth: 1,
    },
    selectedTab: {
        alignItems: 'center',
        width: WP(20),
        borderBottomWidth: HP(0.8),
        marginHorizontal: WP(2),
        borderColor: '#ebc77a'
    },
    backContainer: {
        marginTop: HP(7),
        width: WP(8),
        height: WP(8),
        marginLeft: WP(5),
        padding: HP(1),
        borderRadius: HP(2),
        borderWidth: 1,
        backgroundColor: THEME.colors.white,
    },
    tab: {
        alignItems: 'center',
        width: WP(22),
        marginHorizontal: WP(1)
    },
    tabText: {
        fontFamily: THEME.fonts.montRegular,
        fontSize: HP(1.8)
    },
    subtabs: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: HP(3),
        paddingBottom: HP(0.3),
        borderColor: THEME.colors.gray,
        borderBottomWidth: 1,
        marginHorizontal: WP(8)
    },
    subtab: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: WP(27),
        marginHorizontal: WP(1)
    },

    choiceContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: HP(3),
    },
    mSportContainer: {
        paddingRight: RFValue(10),
        paddingTop: RFValue(10),
    },
    mSportActive: {
        color: 'white',
        paddingHorizontal: RFValue(10),
        paddingTop: RFValue(10),
        backgroundColor: 'black',
        borderTopLeftRadius: RFValue(10),
        borderBottomLeftRadius: RFValue(10),
        padding: RFValue(5),
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    wSportActive: {
        color: 'white',
        paddingHorizontal: RFValue(10),
        paddingTop: RFValue(10),
        backgroundColor: 'black',
        borderTopRightRadius: RFValue(10),
        borderBottomRightRadius: RFValue(10),
        padding: RFValue(5),
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    mSportActiveText: {
        color: 'white',
    },
    textColor: {
        fontSize: RFValue(14),
        color: '#808080',
        fontFamily: THEME.fonts.montRegular,
    },
    verticalDivider: {
        height: 38,
        width: 3,
        backgroundColor: 'black',
    },
    wSportContainer: {
        paddingLeft: RFValue(10),
        paddingTop: RFValue(10),
    },
    activeText: {
        color: 'white',
        fontSize: RFValue(14),
        fontFamily: THEME.fonts.montRegular,
    },

});
