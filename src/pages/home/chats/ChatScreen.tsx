import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Image, Platform, Text, TextInput, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Touch from '../../../shared/components/touch/touch';
import { STYLES } from './chats.style';
import { HP, THEME, WP } from '../../../shared/exporter';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GiftedChat, Send, InputToolbar, Avatar, Time, Day, Composer } from 'react-native-gifted-chat'
import RBSheet from "react-native-raw-bottom-sheet";
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useCustomSelector } from '../../../shared/store/store';
import io from "socket.io-client";

import RenderMessage from './RenderMessage';
import { CONSTANTS } from '../../../shared/utils/constants';
import { GenericNavigation } from '../../../shared/models/interface';
import { getChatMessages } from '../../../shared/services/HomeService';
import { User } from '../../../shared/models/user';
import { customBubble } from './wraps';
import { displayAlert } from '../../../shared/utils/helpers';
let SOCKET: { disconnect: () => void; on: (arg0: string, arg1: { (data: any): void; (data: any): void; (data: any): void; }) => void; emit: (arg0: string, arg1: { toUserId: any; message: string; }) => void; };
const ChatScreen = ({ navigation, route }: Partial<GenericNavigation>) => {

    const refRBSheet: any = useRef();
    const { user }: any = useCustomSelector((state) => state.root.user);
    const [userDetails, setuserDetails] = useState(route?.params?.userDetails);
    const [messages, setMessages] = useState<any>([]);
    const [selected, setSelected] = useState(1);
    const [msg, composeMsg] = useState('');

    useEffect(() => {
        initSocket();
        loadMessages();
        return () => {
            if (SOCKET)
                SOCKET.disconnect();
        }
    }, []);

    useEffect(() => {
        console.log('messages updated');
    }, [messages]);

    const initSocket = () => {
        try {
            // @ts-ignore
            SOCKET = io.connect(CONSTANTS.SOCKETBASEURL, {
                query: {
                    userId: user.id
                }
            });
            SOCKET.on('connect', function (data: any) {
                console.log('---------SOCKET-------->', 'CONNECTED')
            });
            // socket.emit('previousMessages');
            // socket.on('previousMessages', function (data: any) {
            //     console.log('---------Previous Messages-------->', data);
            // });
            SOCKET.on('message', function (data: any) {
                let m = {
                    _id: `${new Date().getTime()}`,
                    text: data.message,
                    createdAt: new Date().getTime(),
                    user: {
                        _id: data.fromUserId,
                        name: userDetails.fromUserName || '',
                    },
                }
                console.log(messages);
                setMessages([m, ...messages]);
                console.log(messages);
            });

            SOCKET.on('disconnect', function (data: any) {
                console.log('disconnected');
            });

        } catch (err) {
            console.log(err);
        }
    }

    const loadMessages = () => {
        getChatMessages(userDetails.id || userDetails.userId)
            .then((sucs) => {
                let msgs = [];
                for (let msg of sucs.data.data) {
                    let m = {
                        _id: msg.id,
                        text: msg.message,
                        createdAt: new Date(msg.createdAt),
                        user: {
                            _id: msg.fromUserId,
                            name: msg.fromUserName,
                        },
                    }
                    msgs.push(m);
                }
                setMessages(msgs);
            }).catch((err) => {
                console.log(err);
            });
    }

    const sendIt = (mess: any) => {
        let params = {
            toUserId: userDetails.id || userDetails.userId,
            message: mess
        }
        let m = {
            _id: `${new Date().getTime()}`,
            text: mess,
            createdAt: new Date().getTime(),
            user: {
                _id: user.id,
            },
        }
        setMessages([
            m,
            ...messages,
        ])
        SOCKET.emit('message', params);
    }

    const renderMessage = (props: any) => {
        return <View style={{ marginBottom: HP(4), }} >
            <RenderMessage messages={messages} props={props} />
        </View>
    }

    return (
        <View style={STYLES.container}>
            {/* <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}> */}

            <View style={{ height: '100%' }}>
                <View style={{
                    width: WP(100),
                    paddingHorizontal: WP(3),
                    height: Platform.OS === 'ios' ? HP(12) : WP(25),
                    backgroundColor: '#F2F2F2',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingTop: Platform.OS === 'ios' ? HP(7) : HP(5),
                    paddingBottom: HP(1)
                }}>
                    <MaterialIcons onPress={() => navigation?.goBack()} name={'arrow-back-ios'} size={HP(3)} />
                    <View style={{ width: WP(75), flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://picsum.photos/200/200?' }}
                            style={[STYLES.profileImage, { borderColor: 'rgb(28,93,153)' }]}
                        />
                        <View>
                            <Text style={STYLES.titlename}>{userDetails.firstName} {userDetails.lastName}</Text>
                            <Text style={STYLES.active}>Active today</Text>
                        </View>
                    </View>
                    <Entypo name={'dots-three-horizontal'} size={HP(3)} />
                </View>
                <GiftedChat
                    messages={messages}
                    onInputTextChanged={(text) => {
                        composeMsg(text);
                    }}
                    onSend={() => sendIt(msg)}
                    // inverted={true}
                    user={{
                        _id: user.id
                    }}
                    scrollToBottom
                    renderAvatarOnTop={true}
                    alwaysShowSend={true}
                    renderBubble={customBubble}
                    renderInputToolbar={(props) => {
                        return (
                            <>
                                <InputToolbar
                                    {...props}
                                    containerStyle={{
                                        paddingHorizontal: wp(2),
                                        backgroundColor: '#F2F2F2',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                    renderComposer={(props) => {
                                        return (
                                            <Composer {...props}
                                                placeholder={'Type a message here'}
                                                textInputStyle={{
                                                    backgroundColor: THEME.colors.white,
                                                    alignSelf: 'center',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    paddingHorizontal: HP(1.5),
                                                    paddingTop: HP(1),
                                                    borderRadius: HP(1.5),
                                                    // margin: WP(2)
                                                }}
                                            />
                                        )
                                    }}
                                    renderSend={(props) => {
                                        return (
                                            <>
                                                <Send
                                                    {...props}
                                                    containerStyle={STYLES.sendWrap}>
                                                    <Image source={require('../../../assets/images/send.png')} style={{ resizeMode: 'contain', height: WP(6), width: WP(5), alignSelf: 'center' }} />
                                                </Send>
                                            </>
                                        )
                                    }}
                                    renderActions={(props) => {
                                        return (
                                            <Touch onPress={() => refRBSheet?.current?.open()} style={STYLES.iconPlus}>
                                                <Feather name="plus" size={WP(4)} />
                                            </Touch>
                                        )
                                    }}
                                />
                            </>
                        )
                    }}
                />
            </View>
            <RBSheet
                ref={refRBSheet}
                height={HP(40)}
                customStyles={{
                    container: {
                        borderTopRightRadius: HP(3),
                        borderTopLeftRadius: HP(3)
                    },
                    wrapper: {
                        height: HP(50),
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <View>
                    <Text style={STYLES.rbTopText}>What would you like to share?</Text>
                    <View style={STYLES.rbbtnsView}>
                        <Touch onPress={() => { setSelected(1) }} style={{ alignItems: 'center' }}>
                            <View style={{ ...STYLES.rbbtn, backgroundColor: selected === 1 ? 'black' : 'white' }}>
                                <Image source={require('../../../assets/images/reel.png')} style={{ ...STYLES.rbImg, tintColor: selected === 1 ? 'white' : 'black' }} />
                            </View>
                            <Text style={{ marginTop: HP(1) }}>Reel</Text>
                        </Touch>
                        <Touch onPress={() => {
                            let tempMsg = `${CONSTANTS.DEEPLINK_URL}/profile/${user.id}`;
                            sendIt(tempMsg);
                            refRBSheet?.current?.close();
                        }} style={{ alignItems: 'center' }}>
                            <View style={{ ...STYLES.rbbtn, backgroundColor: selected === 2 ? 'black' : 'white' }}>
                                <Image source={require('../../../assets/images/user.png')} style={{
                                    ...STYLES.rbImg, height: HP(4), width: HP(4), resizeMode: 'contain',
                                    // tintColor: selected === 2 ? 'white' : 'black'
                                }} />
                            </View>
                            <Text style={{ marginTop: HP(1) }}>Profile</Text>
                        </Touch>
                        <Touch onPress={() => {
                            let tempMsg = `${CONSTANTS.DEEPLINK_URL}/moreInfo/${user.id}`;
                            sendIt(tempMsg);
                            refRBSheet?.current?.close();
                        }} style={{ alignItems: 'center' }}>
                            <View style={{ ...STYLES.rbbtn, backgroundColor: selected === 3 ? 'black' : 'white' }}>
                                <Image source={require('../../../assets/images/info.png')} style={{
                                    ...STYLES.rbImg, height: HP(4), width: HP(4), resizeMode: 'contain',
                                    tintColor: selected === 3 ? 'white' : 'black'
                                }} />
                            </View>
                            <Text style={{ marginTop: HP(1) }}>More Info</Text>
                        </Touch>
                        {/* <Touch onPress={() => { setSelected(4) }} style={{ alignItems: 'center' }}>
                            <View style={{ ...STYLES.rbbtn, backgroundColor: selected === 4 ? 'black' : 'white' }}>
                                <Image source={require('../../../assets/images/referal.png')} style={{ ...STYLES.rbImg, tintColor: selected === 4 ? 'white' : 'black' }} />
                            </View>
                            <Text style={{ marginTop: HP(1) }}>Referral</Text>
                        </Touch> */}
                    </View>
                    <Touch onPress={() => {
                        // refRBSheet.close()
                    }} style={{ alignSelf: 'center', marginTop: HP(4) }}>
                        <LinearGradient
                            colors={['#5a93e4', '#92d3f7']}
                            style={{ ...STYLES.gradient }}>
                            <Text style={STYLES.moreInfo}>Done</Text>
                        </LinearGradient>
                    </Touch>
                </View>
            </RBSheet>
            {/* </KeyboardAwareScrollView> */}
        </View >
    );
};
export default ChatScreen;
