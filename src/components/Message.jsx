import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {normalize} from "../utils/normalize";
import firebase from '../../config'

export default function Message({ item }) {

    return (
            <>
            { item.val().currentUid !== firebase.auth().currentUser.uid ? (
                <View style={styles.messageContainer}>
                    <View style={styles.message}>
                        <Text style={styles.messageText}>{item.val().message}</Text>
                        <Text style={styles.messageTime}>{item.val().created_at ? item.val().created_at : "10:35"}</Text>
                    </View>
                </View>
                ) : (
                    <View style={styles.ownMessageContainer}>
                        <View style={styles.message}>
                            <Text style={styles.messageText}>{item.val().message}</Text>
                            <Text style={styles.messageTime}>{item.val().created_at ? item.val().created_at : "10:35"}</Text>
                        </View>
                    </View>
                )}
            </>

    )
}

const styles = StyleSheet.create({
    messageContainer: {
        marginVertical: normalize(10),
        marginRight: normalize(100),
    },
    message: {
        marginHorizontal: normalize(10),
        borderRadius: normalize(25),
        backgroundColor: '#E7E7E7',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(20),
        flexDirection: 'row',
    },
    messageText: {
        fontSize: normalize(15),
        lineHeight: normalize(18),
        color: '#494949',
        paddingLeft: normalize(5),
        paddingRight: normalize(75),
        paddingVertical: normalize(10)
    },
     messageTime: {
        fontSize: normalize(15),
        lineHeight: normalize(18),
        color: '#494949',
        marginLeft: normalize(-40),
        paddingVertical: normalize(10)
    },
    ownMessageContainer: {
        marginVertical: normalize(10),
        marginLeft: normalize(100)
    },
})