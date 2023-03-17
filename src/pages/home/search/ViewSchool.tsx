import React, { useEffect, useState } from 'react';
import { Image, Text, ScrollView, TextInput, View } from 'react-native';
import I from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Touch from '../../../shared/components/touch/touch';
import { STYLES } from './search.style';
import { HP, THEME } from '../../../shared/exporter';
import HeaderBg from '../../../shared/components/header/headerBg';
import LinearGradient from 'react-native-linear-gradient';

import { getSports } from '../../../shared/services/sport.service';
import Card from '../../../shared/components/sportCard';

const ViewSchool = ({ navigation }: any) => {

    const [sports, setSports] = useState([]);
    const [selectedAdditionalSports, setSelectedSports] = useState(false);
    const [values, setValues] = useState({
        menActive: false,
        womenActive: false,
    });
    useEffect(() => {
        getSports((res: any) => setSports(res.data));
    }, []);

    const [selectedTab, setSelectedTab] = useState(1)

    return (
        <View style={STYLES.container}>
            <HeaderBg backgroundColor={'#bf5702'}>
                <View style={STYLES.back}>
                    <I name={'arrow-back-ios'} />
                </View>
                <View>
                    <Image style={{ alignSelf: 'center', marginTop: -HP(3.5), marginBottom: HP(1) }} source={require('../../../assets/images/sampleschoollogo.png')} />
                    <Text style={STYLES.logoText}>SPORTS</Text>
                </View>
                <LinearGradient
                    colors={['#f5fdff', '#eaf5fe', '#fef3fe']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    style={{ ...STYLES.gradient }}>
                    <AntDesign size={HP(3)} name={'hearto'} />
                    <Text style={STYLES.viewsite}>View site</Text>
                </LinearGradient>
            </HeaderBg>


            <View style={STYLES.tabs}>
                <Touch onPress={() => setSelectedTab(1)} style={selectedTab === 1 ? STYLES.selectedTab : STYLES.tab}>
                    <Text style={STYLES.tabText}>Sports</Text>
                </Touch>
                {/* <Touch onPress={() => setSelectedTab(2)} style={selectedTab === 2 ? STYLES.selectedTab : STYLES.tab}>
                    <Text style={STYLES.tabText}>Sports</Text>
                </Touch>

                <Touch onPress={() => setSelectedTab(4)} style={selectedTab === 4 ? STYLES.selectedTab : STYLES.tab}>
                    <Text style={STYLES.tabText}>Athletes</Text>
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
                                                        onPress={
                                                            () => {
                                                                setSelectedSports(true);
                                                            }
                                                        }
                                                        key={index}>
                                                        <Card item={sport} index={index} />
                                                    </Touch>
                                                }
                                            </>
                                            :
                                            <>
                                                {sport.gender === 'F' &&
                                                    <Touch
                                                        onPress={
                                                            () => {
                                                                setSelectedSports(true);
                                                            }
                                                        }
                                                        key={index}>
                                                        <Card item={sport} index={index} />
                                                    </Touch>
                                                }
                                            </>
                                        }
                                    </>
                                );
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default ViewSchool;
