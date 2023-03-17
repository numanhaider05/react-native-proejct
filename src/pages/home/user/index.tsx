import React, { useEffect, useState } from 'react';
import { Image, FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import I from 'react-native-vector-icons/SimpleLineIcons';
import Touch from '../../../shared/components/touch/touch';
import HeaderBg from '../../../shared/components/header/headerBg';
import CoachProfileDetails from '../../../shared/components/profile/CoachProfileDetails';
import { HP, THEME, WP } from '../../../shared/exporter';
import LinearGradient from 'react-native-linear-gradient';

import Loader from '../../../shared/components/loader';
import { getUserDetailsById, userPosts } from '../../../shared/services/HomeService';
import { RootStateOrAny, useSelector } from 'react-redux';
import { addConnection } from '../../../shared/services/HomeService';
import { follow } from '../../../shared/services/HomeService';
import { unFollow } from '../../../shared/services/HomeService';
import helpers from '../../../shared/utils/helpers';
import ProfileDetails from '../../../shared/components/profile/ProfileDetails';
import { ROLES } from '../../../shared/models/enums';
import GalleryView from '../../../shared/components/gallery';

const UserDetails = ({ navigation, route }: any) => {
    const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);

    const [itemId, setUser] = useState(route.params.item);
    const [schoolDetails, setSchoolDetails] = useState(route.params.schoolDetails);
    // const [sport, setSport] = useState(route.params.sport)

    const [aboutText, setAboutText] = useState('Not available')
    const [selectedTab, setSelectedTab] = useState(1)
    const [posts, setPosts] = useState([]);
    const [userDetails, setUserDetails] = useState<any>([])
    const [loading, setLoading] = useState(false);
    const [postWait, setPostWait] = useState(false);

    useEffect(() => {
        setLoading(true);
        userDetail();
        getPosts();
    }, []);

    const getPosts = () => {
        setPostWait(true);
        userPosts(itemId)
            .then(res => {
                setPosts(res.data.data)
            })
            .catch(err => { })
            .finally(() => {
                setPostWait(false);
            });
    };

    const userDetail = () => {
        setLoading(true);
        getUserDetailsById(itemId)
            .then(res => {
                console.log(res.data.data)
                setUserDetails(res.data.data)
                setAboutText(res.data.data?.bio ? res.data.data.bio : 'No Info')
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
        const params = itemId

        addConnection(params, token)
            .then(res => {
                helpers.showToastSuccess('successfully Added to Connections')
            })
            .catch(err => {
                helpers.showToastSuccess(err.response.data.meta.message)
            })
            .finally(() => {
                setLoading(false);
                userDetail()
            });
    };

    const onFollow = () => {
        setLoading(true);

        let token = user.accessToken
        const params = itemId

        follow(params, token)
            .then(res => {
                helpers.showToastSuccess('Following')
            })
            .catch(err => {
                helpers.showToastSuccess(err.response.data.meta.message)
            })
            .finally(() => {
                setLoading(false);
                userDetail()
            });
    };

    const onUnfollow = () => {
        setLoading(true);

        let token = user.accessToken
        const params = itemId

        unFollow(params, token)
            .then(res => {
                helpers.showToastSuccess('Un-Followed')
            })
            .catch(err => {
                helpers.showToastSuccess(err.response.data.meta.message)
            })
            .finally(() => {
                setLoading(false);
                userDetail()
            });
    };

    console.log('userDetails', userDetails)

    return (
        <View style={STYLES.container}>
            <HeaderBg
                cover={userDetails.coverUrl}
                navigation={navigation}>
                <View style={STYLES.profileDet} >
                    <ProfileDetails
                        origin={'publicUser'}
                        editable={false}
                        navigation={navigation}
                        userDetails={userDetails} />
                </View>
            </HeaderBg>

            {loading ?
                <Loader />
                :
                <ScrollView>
                    <View style={STYLES.schoolContainer}>
                        <View style={STYLES.schoolCont}>
                            <Text style={STYLES.schoolHead}>School</Text>
                            <Text style={STYLES.sportname}>{userDetails.school || '--'}</Text>
                        </View>
                        {
                            userDetails.roleId != ROLES.OTHERS ?
                                <View style={STYLES.schoolCont}>
                                    <Text style={STYLES.schoolHead}>Sport</Text>
                                    <Text style={STYLES.sportname}>{userDetails.mainSport ? userDetails.mainSport.name : ''}</Text>
                                </View> : null
                        }
                        {
                            userDetails.roleId != ROLES.COACH ?
                                <View style={STYLES.schoolCont}>
                                    <Text style={STYLES.schoolHead}>Class</Text>
                                    <Text style={STYLES.sportname}>{userDetails.class || '--'}</Text>
                                </View> : null
                        }

                        {
                            userDetails.roleId != ROLES.OTHERS ?
                                userDetails.logoUrl ?
                                    <View style={STYLES.schoolCont}>
                                        <Image
                                            source={{ uri: userDetails.logoUrl }}
                                            style={{ ...STYLES.schoolLogo, marginLeft: WP(2) }}
                                        />
                                    </View> :
                                    <View style={STYLES.schoolCont}>
                                        <Text style={STYLES.sportname}>{'--'}</Text>
                                    </View>
                                : null
                        }
                    </View>
                    <View style={{ flexDirection: 'row', margin: WP(4) }}>
                        <View style={STYLES.about}>
                            <Text style={STYLES.aboutHead}>About Me</Text>
                            <Text style={STYLES.aboutDesp}>{aboutText}</Text>
                        </View>
                        <View style={{ width: WP(28), alignItems: 'flex-end' }}>
                            <Touch onPress={() => navigation.navigate('ChatScreen', { userDetails: userDetails })}>
                                <LinearGradient
                                    colors={['#5a93e4', '#92d3f7']}
                                    style={STYLES.bottom}>
                                    <Image style={STYLES.msgIcon} source={require('../../../assets/images/messagesIcon.png')} />
                                    <Text style={STYLES.categoryTxt}>Message</Text>
                                </LinearGradient>
                            </Touch>
                        </View>
                    </View>

                    <View style={STYLES.conP}>
                        {
                            userDetails && userDetails.roleId === ROLES.PLAYER ?
                                <Touch onPress={() => navigation.navigate('UserMoreInfo', { userDetails: userDetails })}>
                                    <LinearGradient
                                        colors={['#5a93e4', '#92d3f7']}
                                        style={{ ...STYLES.gradient }}>
                                        <Text style={STYLES.moreInfo}>MORE INFO</Text>
                                    </LinearGradient>
                                </Touch> : null
                        }

                        <Touch onPress={() => userDetails.isFollowing ? onUnfollow() : onFollow()}>
                            <View style={STYLES.conWrap}>
                                <Text style={{ ...STYLES.connections, marginBottom: WP(4) }}>{userDetails.isFollowing ? 'Following' : 'Follow'}</Text>
                            </View>
                        </Touch>
                        {
                            userDetails && userDetails.roleId != ROLES.OTHERS ?
                                <Touch onPress={() => onAdd()}>
                                    <View style={STYLES.conWrap}>
                                        <Text style={STYLES.connections}>{userDetails.roleId === ROLES.PLAYER ? 'Add to my Prospects' : 'Add to my Connections'}</Text>
                                    </View>
                                </Touch> : null
                        }

                    </View>

                    <View style={{ ...STYLES.row, justifyContent: 'center' }}>
                        <View style={{ ...STYLES.options }}>
                            <View style={{ ...STYLES.row, width: WP(7.5) }}>
                                {
                                    (userDetails.roleId === ROLES.COACH || userDetails.roleId === ROLES.OTHERS) ?
                                        <Image source={require('../../../assets/images/play.png')} style={STYLES.schoolLogo} /> :
                                        <Image source={require('../../../assets/images/reel.png')} style={STYLES.schoolLogo} />
                                }
                            </View>
                            <Text style={STYLES.optionsHead}>
                                {(userDetails.roleId === ROLES.COACH || userDetails.roleId === ROLES.OTHERS) ? 'Clips' : 'Reel'}
                            </Text>
                        </View>
                        <View style={STYLES.line} />
                        <View style={{ ...STYLES.options }}>
                            <Image source={require('../../../assets/images/schedule.png')} style={STYLES.play} />
                            <Text style={STYLES.optionsHead}>Schedule</Text>
                        </View>
                        <View style={STYLES.line} />
                        <View style={{ ...STYLES.options }}>
                            <Image source={require('../../../assets/images/teammates.png')} style={STYLES.play} />
                            <Text style={STYLES.optionsHead}>Teammates</Text>
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

                    <GalleryView
                        noPostsMsg={"No Posts yet"}
                        posts={posts} canAdd={false} />
                </ScrollView>
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
    schoolHead: {
        fontFamily: THEME.fonts.montRegular,
        color: THEME.colors.headings,
        fontSize: HP(2),
        fontWeight: '900',
        textAlign: 'center'
    },
    conP: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: HP(7),
        marginHorizontal: WP(3.5),
        // justifyContent: 'space-between'
    },
    conWrap: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileDet: {
        position: 'absolute',
        bottom: -HP(7),
        left: 0,
        zIndex: 999
    },
    schoolContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: HP(8),
        width: WP(95),
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopRightRadius: HP(2),
        borderBottomRightRadius: HP(2),
        paddingVertical: HP(0.7),
        paddingLeft: WP(4)
    },
    schoolCont: {
        paddingRight: WP(8),
        alignItems: 'center'
    },
    title: {
        fontFamily: THEME.fonts.montRegular,
        fontSize: HP(2.3),
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    sportname: {
        fontFamily: THEME.fonts.montRegular,
        fontSize: HP(2),
        fontWeight: 'normal'
    },
    schoolLogo: {
        marginTop: WP(1),
        height: WP(7),
        width: WP(7)
    },
    play: {
        marginHorizontal: WP(2),
    },
    schoolname: {
        fontFamily: THEME.fonts.montRegular,
        fontSize: HP(1.8),
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
        flex: 1,
    },
    aboutHeadCont: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    aboutHead: {
        fontFamily: THEME.fonts.montRegular,
        fontSize: HP(2.2),
        fontWeight: 'bold',
        color: THEME.colors.primary
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
        fontSize: HP(2),
        width: WP(30),
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: WP(4),
        flexWrap: 'wrap',
        fontFamily: THEME.fonts.boldJost
    }
});


export default UserDetails;
