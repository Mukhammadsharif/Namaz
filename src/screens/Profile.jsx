import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native"
import {normalize} from "../utils/normalize";
import { useNavigation } from '@react-navigation/native'
import {logOut} from "../../api/auth-api";

export default function Profile() {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1}}>
            <View style={styles.chatHeaderContainer}>
                <Text style={styles.chatHeaderText}>Профиль</Text>
            </View>

            <View style={styles.content}>

            </View>

            <TouchableOpacity
                onPress={() => {
                    logOut()
                    navigation.navigate('Login')
                }}
                style={styles.exitContainer}>
                <Text style={styles.exitText}>Выход</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    chatHeaderContainer: {
        width: normalize(380),
        height: normalize(60),
        backgroundColor: '#344181',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 2
    },
    chatHeaderText: {
        fontWeight: 'bold',
        fontSize: normalize(20),
        lineHeight: normalize(21),
        color: '#FFFFFF',
    },
    content: {
        flex: 21,
        paddingHorizontal: normalize(15)
    },

    exitContainer: {
        backgroundColor: '#d7d0d0',
        height: normalize(35),
        marginLeft: normalize(30),
        marginRight: normalize(30),
        marginBottom: normalize(10),
        borderRadius: normalize(15),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    exitText: {
        fontSize: normalize(17),
        fontWeight: 'bold',
    },
})