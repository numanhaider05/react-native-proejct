import React, { useEffect, useState } from 'react';
import { Image, Text, FlatList, TextInput, View } from 'react-native';
import { HP, THEME } from '../../../shared/exporter';
import { STYLES } from './search.style';

import I from 'react-native-vector-icons/MaterialIcons';
import Touch from '../../../shared/components/touch/touch';
import HeaderBg from '../../../shared/components/header/headerBg';
import Card from '../../../shared/components/sportCard';

import { RootStateOrAny, useSelector } from 'react-redux';
import { getCoaches } from '../../../shared/services/HomeService';
import CoachCard from '../../../shared/components/cards/CoachCard';
import Loader from '../../../shared/components/loader';
import { Alert } from 'react-native';
import helpers from '../../../shared/utils/helpers';

const SchoolDetails = ({ navigation, route }: any) => {
    const [schoolDetails, setItem] = useState(route.params.item);
    const [sport, setSport] = useState(route.params.sport)
    const [selectedTab, setSelectedTab] = useState(1)
    // const title = route.params.title;
    // const bg = route.params.bg;

    const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);

    const [loading, setLoading] = useState(false);
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        getCoachesWithId()
    }, []);

    const getCoachesWithId = () => {
        setLoading(true);
        console.log(user.accessToken)
        const schoolId = schoolDetails.id
        const sportsId = sport.id
        getCoaches(schoolId, sportsId)
            .then(res => {
                setCoaches(res.data.data)
                console.log('res.data.data', res.data)
                if (res.data.data.length == 0) {
                    // Alert.alert('No Coaches found for this School Sport');
                    helpers.showToastSuccess('No Coaches found for this School Sport')
                }
            })
            .catch(err => {
                Alert.alert(err.response.data.meta.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <View style={STYLES.container}>
            {loading && <Loader />}

            <HeaderBg
                item={schoolDetails}
                navigation={navigation}
                backgroundColor={THEME.colors.white}>
            </HeaderBg>

            <View style={STYLES.tabs}>
                <Touch onPress={() => setSelectedTab(1)} style={selectedTab === 1 ? STYLES.selectedTab : STYLES.tab}>
                    <Text style={STYLES.tabText}>Coaches</Text>
                </Touch>
                {/* <Touch onPress={() => setSelectedTab(2)} style={selectedTab === 2 ? STYLES.selectedTab : STYLES.tab}>
                    <Text style={STYLES.tabText}>Sports</Text>
                </Touch>
                <Touch onPress={() => setSelectedTab(3)} style={selectedTab === 3 ? STYLES.selectedTab : STYLES.tab}>
                    <Text style={STYLES.tabText}>Coaches</Text>
                </Touch> */}
            </View>

            <FlatList
                style={{ alignSelf: 'center', marginTop: HP(1.5) }}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                data={coaches}
                numColumns={2}
                renderItem={({ item, index }) => <CoachCard schoolDetails={schoolDetails} sport={sport} item={item} navigation={navigation} />}
            />
        </View>
    );
};
export default SchoolDetails;