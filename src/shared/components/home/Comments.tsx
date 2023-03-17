import React, { useEffect, useRef, useState } from 'react'
import { View, ScrollView, Image, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import Fontisto from 'react-native-vector-icons/Fontisto';
import { HP, WP } from '../../theme/responsive';
import Touch from '../touch/touch';

import { addComment, getPostComments } from '../../../shared/services/HomeService';
import Loader from '../loader';
import helpers from '../../utils/helpers';


const Comments = ({ style, user, post, noComments, setNoComments }: any) => {

    // const [noComments, setNoComments] = useState(parseInt(post.noOfComments))

    const [comments, setComments] = useState([
        {
            pic: 'https://picsum.photos/200/200?',
            txt: '',
            likes: ''
        },
        {
            pic: 'https://picsum.photos/200/200?',
            txt: '',
            likes: ''
        },
        {
            pic: 'https://picsum.photos/200/200?',
            txt: '',
            likes: ''
        },
        {
            pic: 'https://picsum.photos/200/200?',
            txt: '',
            likes: ''
        },
        {
            pic: 'https://picsum.photos/200/200?',
            txt: '',
            likes: ''
        }
    ])

    const [loading, setLoading] = useState(false);
    const [cmt, setCmt] = useState('');

    useEffect(() => {
        setLoading(true);
        getComments();
    }, []);

    const getComments = () => {
        let id = post.id
        let token = user.accessToken

        getPostComments(id, token)
            .then(res => {
                setComments(res.data.data.reverse())
                setNoComments(res.data.data.length)
            })
            .catch(err => {
                console.log(err.response.data)
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const comment = () => {
        setLoading(true);

        let token = user.accessToken
        const params = {
            "comment": cmt
        }
        const id = post.id
        console.log(token)
        addComment(id, params, token)
            .then(res => {
                helpers.showToastSuccess('Comment added')
                getComments();
            })
            .catch(err => {
                console.log(err.response.data.meta.message)
                helpers.showToastSuccess(err.response.data.meta.message)
                getComments();
            })
            .finally(() => {
                setLoading(false);
                setCmt('')
            });
    };
    const ScrollViewRef = useRef<ScrollView>(null);

    ScrollViewRef.current?.scrollToEnd()

    return (
        <>


            <View style={{ flex: 1, paddingTop: HP(3) }}>

                <ScrollView
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                >
                    {loading &&
                        <View style={{ marginTop: HP(18), position: 'absolute', alignSelf: 'center', zIndex: 9999 }}>
                            <ActivityIndicator />
                        </View>
                    }
                    <View style={styles.cmtsContainer}>
                        <Text style={styles.noCmt}>{noComments} Comments</Text>
                        <Text style={styles.coaches}>{post.noOfLikes} people like this post</Text>
                    </View>

                    {comments.length > 0 ?

                        // <View style={{ flex: 1, marginBottom: HP(10) }}>
                        <ScrollView
                            ref={ScrollViewRef}
                            style={{ flex: 1, marginBottom: HP(10) }}
                            onContentSizeChange={() => ScrollViewRef.current?.scrollToEnd({ animated: true })}
                        >
                            {comments.map((item, index) => {
                                return (
                                    <View style={styles.cmts}>
                                        {index % 2 === 0 ?
                                            <View style={{
                                                ...styles.leftcmt,
                                                backgroundColor: item?.type === 'private' ? '#EAC67A' : '#E9E9E9'
                                            }}>
                                                <Image
                                                    source={{ uri: item.pictureUrl }}
                                                    style={[styles.profileImage, { borderColor: 'black' }]}
                                                />
                                                <Text style={styles.cmttxt}>{item.comment}</Text>
                                                <View style={{ alignItems: 'center' }}>
                                                    <Fontisto name={'heart-alt'} size={HP(2.2)} />
                                                    <Text style={{ fontWeight: 'bold', marginTop: HP(0.3) }}>{item?.likes ? item?.likes : 0}</Text>
                                                </View>
                                            </View>
                                            :
                                            <View style={{
                                                ...styles.rightcmt,
                                                backgroundColor: item?.type === 'private' ? '#EAC67A' : '#E9E9E9'
                                            }}>
                                                <View style={{ alignItems: 'center' }}>
                                                    <Fontisto name={'heart-alt'} size={HP(2.2)} />
                                                    <Text style={{ fontWeight: 'bold', marginTop: HP(0.3) }}>{item?.likes ? item?.likes : 0}</Text>
                                                </View>
                                                <Text style={{ ...styles.cmttxt, textAlign: 'right' }}>{item.comment}</Text>
                                                <Image
                                                    source={{ uri: item.pictureUrl }}
                                                    style={[styles.profileImage, { borderColor: 'black' }]}
                                                />
                                            </View>
                                        }
                                    </View>
                                )
                            })}
                        </ScrollView>
                        // </View> 
                        :
                        <View style={{ alignItems: 'center', marginTop: HP(15) }}>
                            <Text style={{ fontWeight: 'bold', }}>No Comments</Text>
                        </View>
                    }


                </ScrollView>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'absolute',
                        height: HP(8),
                        width: WP(100),
                        paddingBottom: 15,
                        bottom: 0,
                        paddingTop: HP(1),
                        backgroundColor: 'white',
                        paddingLeft: WP(8),
                    }}>
                    <TextInput
                        style={{
                            width: WP(70),
                            paddingTop: HP(1),
                            fontSize: HP(2),
                            borderBottomWidth: 1,
                            marginRight: WP(7),
                            borderBottomColor: '#C0BEBE'
                        }}
                        value={cmt}
                        onChangeText={(val) => setCmt(val)}
                        placeholderTextColor={'grey'}
                        placeholder={'Type Here...'}
                    />
                    <Touch onPress={() => comment()}>
                        <Text style={{ fontWeight: 'bold', }}>Post</Text>
                    </Touch>
                </View>
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    cmtsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: WP(2.5),
        marginBottom: HP(1)
    },
    profileImage: {
        backgroundColor: 'white',
        height: HP(4),
        width: HP(4),
        borderRadius: HP(4) / 2,
        borderWidth: 3,
    },
    cmttxt: {
        width: WP(55),
    },
    noCmt: {

    },
    coaches: {

    },
    cmts: {

    },
    leftcmt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: WP(2),
        paddingVertical: HP(1),
        marginRight: WP(7),
        marginVertical: HP(1),
        borderTopRightRadius: HP(1),
        borderBottomRightRadius: HP(1),
    },
    rightcmt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: WP(2),
        paddingVertical: HP(1),
        marginLeft: WP(7),
        marginVertical: HP(1),
        borderTopLeftRadius: HP(1),
        borderBottomLeftRadius: HP(1)
    }
})


export default Comments;