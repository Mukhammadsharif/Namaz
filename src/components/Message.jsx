import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {normalize} from "../utils/normalize";
import {app} from '../../config'
import downloadAudio from "../sounds/downloadAudio";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlay, faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function Message({ item }) {

    return (
            <>
            { item.val().currentUid !== app.auth().currentUser.uid ? (
                <TouchableOpacity
                    style={styles.messageContainer}
                    onPress={() => item.val().message === 'audio' ? downloadAudio(item.val().id) : null}>
                    <View style={styles.message}>
                        {item.val().message !== 'audio' ? (
                            <Text style={styles.messageText}>{item.val().message}</Text>
                        ) : (
                            <FontAwesomeIcon icon={faPlay}/>
                        )}
                        <Text style={styles.messageTime}>{item.val().created_at ? item.val().created_at : "10:35"}</Text>
                    </View>
                </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.ownMessageContainer}
                        onPress={() => item.val().message === 'audio' ? downloadAudio(item.val().id) : null}>
                        <View style={styles.message}>
                            {item.val().message !== 'audio' ? (
                                <Text style={styles.messageText}>{item.val().message}</Text>
                            ) : (
                                <FontAwesomeIcon icon={faPlay}/>
                            )}
                            <Text style={styles.messageTime}>{item.val().created_at ? item.val().created_at : "10:35"}</Text>
                        </View>
                    </TouchableOpacity>
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
