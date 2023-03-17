import React, { useEffect, useState } from 'react';
import { Image, FlatList, StyleSheet, Text, View } from 'react-native';
import I from 'react-native-vector-icons/SimpleLineIcons';
import Touch from '../../../shared/components/touch/touch';
import HeaderBg from '../../../shared/components/header/headerBg';
import CoachProfileDetails from '../../../shared/components/profile/CoachProfileDetails';
import { HP, THEME, WP } from '../../../shared/exporter';
import LinearGradient from 'react-native-linear-gradient';

import Loader from '../../../shared/components/loader';
import { getUserDetailsById } from '../../../shared/services/HomeService';
import { RootStateOrAny, useSelector } from 'react-redux';
import { addConnection } from '../../../shared/services/HomeService';
import helpers from '../../../shared/utils/helpers';
import ProfileDetails from '../../../shared/components/profile/ProfileDetails';

const CoachDetails = ({ navigation, route }: any) => {
    const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);

    const [coach, setCoach] = useState(route.params.coach)
    const [schoolDetails, setSchoolDetails] = useState(route.params.schoolDetails)
    // const [sport, setSport] = useState(route.params.sport)

    const [aboutText, setAboutText] = useState('Not available')
    const [selectedTab, setSelectedTab] = useState(1)


    const [userDetails, setUserDetails] = useState<any>([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        userDetail()
    }, []);

    const userDetail = () => {
        setLoading(true);
        getUserDetailsById(coach.id)
            .then(res => {
                setUserDetails(res.data.data)
                setAboutText(res.data.data.bio)
            })
            .catch(err => {
                helpers.showToastSuccess(err.response.data.meta.message)
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onAdd = () => {
        setLoading(true);

        let token = user.accessToken
        const params = coach.id

        addConnection(params, token)
            .then(res => {
                helpers.showToastSuccess('successfully Added to Connections')
            })
            .catch(err => {
                helpers.showToastSuccess(err.response.data.meta.message)
            })
            .finally(() => {
                setLoading(false);
            });
    };
    console.log(userDetails)
    return (
        <View style={STYLES.container}>
            <HeaderBg
                item={schoolDetails}
                navigation={navigation}
                location={'coach'}
            >
                <View style={STYLES.profileDet} >
                    <CoachProfileDetails profilePicture={userDetails.pictureUrl} followers={userDetails.noOfFollowers} followings={userDetails.noOfFollowings} name={userDetails.firstName} />
                </View>
            </HeaderBg>

            {loading ?
                <Loader />
                :
                <>
                    <View style={STYLES.schoolContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={STYLES.title}>Coach <Text style={STYLES.sportname}>Tennis</Text></Text>
                            <Image source={require('../../../assets/images/schoolLogo.png')} style={STYLES.schoolLogo} />
                            <Touch onPress={() => navigation.navigate('ChatScreen', { userDetails: userDetails })}>
                                <LinearGradient
                                    colors={['#5a93e4', '#92d3f7']}
                                    style={STYLES.bottom}
                                >
                                    <Image style={STYLES.msgIcon} source={require('../../../assets/images/messagesIcon.png')} />
                                    <Text style={STYLES.categoryTxt}>Message</Text>
                                </LinearGradient>
                            </Touch>
                        </View>
                        <Text style={STYLES.schoolname}>{userDetails?.college?.name}</Text>
                    </View>

                    <View style={STYLES.about}>
                        <Text style={STYLES.aboutHead}>About</Text>
                        <Text style={STYLES.aboutDesp}>{aboutText}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: WP(3.5), justifyContent: 'space-between' }}>
                        <Touch onPress={() => navigation.navigate('UserMoreInfo')}>
                            <LinearGradient
                                colors={['#5a93e4', '#92d3f7']}
                                style={{ ...STYLES.gradient }}>
                                <Text style={STYLES.moreInfo}>MORE INFO</Text>
                            </LinearGradient>
                        </Touch>
                        <Touch onPress={() => onAdd()}>
                            {/* <LinearGradient
                                colors={['#5a93e4', '#92d3f7']}
                                style={{ ...STYLES.gradient2 }}> */}
                            <Text style={STYLES.connections}>{userDetails.roleId === 1 ? 'Add to my Prospects' : 'Add to my Connections'}</Text>
                            {/* </LinearGradient> */}
                        </Touch>
                    </View>

                    <View style={{ ...STYLES.row, justifyContent: 'center' }}>
                        <View style={{ ...STYLES.options }}>
                            <Image source={require('../../../assets/images/play.png')} style={STYLES.play} />
                            <Text style={STYLES.optionsHead}>Clips</Text>
                        </View>
                        <View style={STYLES.line} />
                        <View style={{ ...STYLES.options }}>
                            <Image source={require('../../../assets/images/schedule.png')} style={STYLES.play} />
                            <Text style={STYLES.optionsHead}>Schedule</Text>
                        </View>
                        <View style={STYLES.line} />
                        <View style={{ ...STYLES.options }}>
                            <Image source={require('../../../assets/images/teammates.png')} style={STYLES.play} />
                            <Text style={STYLES.optionsHead}>Team Openings</Text>
                        </View>
                    </View>

                    <View style={STYLES.tabs}>
                        <Touch onPress={() => setSelectedTab(1)} style={selectedTab === 1 ? STYLES.selectedTab : STYLES.tab}>
                            <Text style={STYLES.tabText}>Posts</Text>
                        </Touch>
                        <Touch onPress={() => setSelectedTab(2)} style={selectedTab === 2 ? STYLES.selectedTab : STYLES.tab}>
                            <Text style={STYLES.tabText}>Tagged</Text>
                        </Touch>
                    </View>

                    <FlatList
                        data={Array(2)}
                        numColumns={3}
                        keyExtractor={({ index }) => index.toString()}
                        renderItem={() => {
                            return (
                                <View>
                                    <Image source={{ uri: 'https://picsum.photos/200/200?' + new Date() }}
                                        style={STYLES.images}
                                    />
                                    <Text>sdadasdasd</Text>
                                </View>
                            )
                        }}
                    />
                </>
            }

        </View >
    );
};


const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.white
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    profileDet: {
        position: 'absolute',
        bottom: -HP(7),
        left: 0,
        zIndex: 999
    },
    schoolContainer: {
        marginTop: HP(8),
        paddingLeft: WP(4)
    },
    schoolCont: {
        paddingRight: WP(8),
        alignItems: 'center'
    },
    title: {
        fontFamily: THEME.fonts.montRegular,
        fontSize: HP(2.3),
        textAlign: 'center'
    },
    sportname: {
        fontFamily: THEME.fonts.montRegular,
        fontSize: HP(2),
        fontWeight: '300',
    },
    schoolLogo: {
        marginHorizontal: WP(2),
        marginRight: WP(4)
    },
    play: {
        marginHorizontal: WP(2),
    },
    schoolname: {
        fontFamily: THEME.fonts.montRegular,
        fontSize: HP(1.5),
        fontWeight: '500',
    },
    penView: {
        backgroundColor: 'white',
        position: 'absolute',
        top: -HP(1.8), right: -HP(0.2),
        padding: HP(0.5),
        borderWidth: 1,
        borderRadius: HP(4.5) / 2,
        borderColor: THEME.colors.lightcyan,
    },
    about: {
        margin: WP(4)
    },
    aboutHeadCont: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    aboutHead: {
        fontFamily: THEME.fonts.montRegular,
        fontSize: HP(2.2),
    },
    aboutSave: {
        fontFamily: THEME.fonts.montRegular,
        color: THEME.colors.headings,
        fontSize: HP(2.2),
        textDecorationLine: 'underline'
    },
    aboutDesp: {
        marginTop: HP(0.4),
        fontFamily: THEME.fonts.montRegular,
        fontSize: HP(1.6),
    },

    aboutPen: {
        marginLeft: WP(2),
        marginBottom: HP(1)
    },
    gradient: {
        marginBottom: HP(2),
        marginRight: 0,
        height: HP(5),
        width: WP(35),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: HP(0.7)
    },
    moreInfo: {
        color: THEME.colors.white,
        fontSize: HP(1.8),
        fontWeight: '800',
        textAlign: 'center'
    },
    infoPen: {
        marginLeft: WP(2),
        marginBottom: HP(2)
    },
    options: {
        alignItems: 'center',
        width: WP(30),
    },
    line: {
        backgroundColor: THEME.colors.blck,
        height: HP(5),
        width: 1,
        marginHorizontal: WP(1)
    },
    optionsHead: {
        textAlign: 'center',
        marginTop: HP(1.4),
        fontFamily: THEME.fonts.montRegular,
        color: THEME.colors.headings,
        fontSize: HP(1.8),
        fontWeight: '900',
    },
    tabs: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: HP(1.5)
    },
    selectedTab: {
        alignItems: 'center',
        width: WP(15),
        borderBottomWidth: 5,
        marginHorizontal: WP(1)
    },
    tab: {
        alignItems: 'center',
        width: WP(15),
        marginHorizontal: WP(1)
    },
    tabText: {
        fontFamily: THEME.fonts.montRegular,
    },
    bottomtxt: {
        fontFamily: THEME.fonts.montRegular,
        color: THEME.colors.blck,
        fontSize: HP(1.6),
        fontWeight: 'bold',
    },
    iconPlus: {
        marginTop: HP(2),
        borderWidth: 2,
        borderRadius: HP(3),
        padding: HP(1)
    },

    bottom: {
        flexDirection: 'row',
        height: HP(4),
        alignSelf: 'center',
        width: WP(28),
        borderRadius: HP(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryTxt: {
        fontFamily: THEME.fonts.montRegular,
        color: THEME.colors.white,
        fontSize: HP(1.5),
        textAlign: 'center',
    },
    msgIcon: {
        height: HP(3),
        width: HP(4),
        resizeMode: 'contain',
        tintColor: THEME.colors.white
    },
    images: {
        height: WP(20),
        width: WP(20),
        resizeMode: 'contain'
    },
    connections: {
        color: THEME.colors.blck,
        fontSize: HP(2.2),
        width: WP(30),
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: WP(3)
        // textDecorationLine: 'underline'
    }
});


export default CoachDetails;
