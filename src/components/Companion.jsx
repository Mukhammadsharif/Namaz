import React, {useEffect, useState} from "react"
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { normalize } from "../utils/normalize";
import CompanionImage from '../assets/images/companion.png'
import firebase from "../../config";

export default function Companion({ navigation, item }) {
    const currentUserId = firebase.auth().currentUser.uid
    const [messages, setMessages] = useState([])
    const [lastMessages, setLastMessages] = useState(null)
    const [newMessages_, setNewMessages_] = useState(null)
    let allMessages = []
    let newMessages = []

     useEffect(() => {
            firebase.database().ref('messages')
                .child(currentUserId)
                .child(item.val().id)
                .on('value', snapshot => {
                    snapshot.forEach(data => {
                        allMessages.push(data)
                    })
                    setMessages(allMessages)
                })
    }, [])

    useEffect(() => {
        newMessages = messages.filter(message => message.val().guestUid === item.key)
        setNewMessages_(newMessages)
    }, [messages])

    useEffect(() => {
        if(newMessages_ && newMessages_.length < 1) {
            setLastMessages(null)
        } else {
            setLastMessages(newMessages_)
        }
    }, [newMessages_])

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => {
                    navigation.navigate('ChatDetail', {
                        name: item.val().name,
                        guestId: item.val().id,
                        status: item.val().status,
                        visibility: item.val().visibility,
                    })
                }}>
                <View>
                    <Image source={CompanionImage} style={styles.image}/>
                </View>

                <View style={styles.messageContainer}>
                    <Text style={styles.name}>{item.val().name}</Text>
                    <Text style={styles.message}>
                        {lastMessages ?
                            lastMessages[lastMessages.length - 1].val().message.substring(0, 25) + '...'
                                    : 'Нет сообщений...'}
                    </Text>
                </View>

                <View style={styles.details}>
                    <Text style={styles.hour}>
                        { lastMessages ?
                            lastMessages[lastMessages.length - 1].val().created_at
                        : null}
                    </Text>
                </View>

            </TouchableOpacity>

            <View style={styles.separator}/>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: normalize(15),
        marginTop: normalize(20),
    },
    image: {
        width: normalize(70),
        height: normalize(70)
    },
    name: {
        color: '#494949',
        fontSize: normalize(17),
        lineHeight: normalize(18),
        fontWeight: 'bold'
    },
    message: {
        color: '#494949',
        fontSize: normalize(13),
        lineHeight: normalize(16),
        fontWeight: 'normal',
        marginTop: normalize(10)
    },
    hour: {
        color: '#494949',
        fontSize: normalize(13),
        lineHeight: normalize(16),
        fontWeight: 'normal',
    },
    countContainer: {
        width: normalize(25),
        height: normalize(25),
        backgroundColor: '#FFFFFF',
        borderRadius: normalize(50),
        marginTop: normalize(25),
        justifyContent: 'center',
        alignItems: 'center'
    },
    count: {
        color: '#494949',
        fontSize: normalize(12),
        lineHeight: normalize(15),
        fontWeight: 'normal',
    },
    messageContainer: {
        marginLeft: normalize(15)
    },
    details: {
        position: 'absolute',
        right: 10
    },
    separator: {
        backgroundColor: '#C5C5C5',
        height: normalize(3),
        width: normalize(345),
        marginHorizontal: normalize(15),
        marginTop: normalize(15)
    },
})