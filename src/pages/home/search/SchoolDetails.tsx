import React, { useEffect, useState } from 'react';
import { Image, Text, ScrollView, TextInput, View } from 'react-native';
import { HP, THEME } from '../../../shared/exporter';
import { STYLES } from './search.style';

import I from 'react-native-vector-icons/MaterialIcons';
import Touch from '../../../shared/components/touch/touch';
import HeaderBg from '../../../shared/components/header/headerBg';
import Card from '../../../shared/components/sportCard';

import { getSports } from '../../../shared/services/sport.service';

const SchoolDetails = ({ navigation, route }: any) => {

    const [item, setItem] = useState(route.params.item)
    const [selectedTab, setSelectedTab] = useState(1)

    const [sports, setSports] = useState([]);
    const [values, setValues] = useState({
        menActive: false,
        womenActive: false,
    });

    useEffect(() => {
        getSports((res: any) => {
            setSports(res.data)
        });
    }, []);

    return (
        <View style={STYLES.container}>
            <HeaderBg item={item} navigation={navigation} backgroundColor={THEME.colors.white}>
            </HeaderBg>


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

            <View style={STYLES.tabsSports}>
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
                                                        <Card item={sport} schoolitem={item} index={index} navigation={navigation} />
                                                    </Touch>
                                                }
                                            </>
                                            :
                                            <>
                                                {sport.gender === 'F' &&
                                                    <Touch
                                                        key={index}>
                                                        <Card item={sport} schoolitem={item} index={index} navigation={navigation} />
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
export default SchoolDetails;