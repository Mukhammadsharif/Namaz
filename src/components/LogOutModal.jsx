import React from "react";
import {Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image} from "react-native"
import Icon from '../assets/icons/cancel.png'
import { useNavigation } from '@react-navigation/native'
import {logOut} from "../../api/auth-api";

export default function LogOutModal({ modalVisible, setModalVisible }) {
    const navigation = useNavigation()

    return (
        <View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            >
                <View style={styles.container}>
                    <Pressable onPress={() => setModalVisible(false)} style={styles.iconContainer}>
                        <Image source={Icon} style={styles.icon}/>
                    </Pressable>

                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Выход из системы</Text>
                        <Text style={styles.description_}>Вы уверены что хотите выйти</Text>
                        <Text style={styles.description}>из системы?</Text>

                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setModalVisible(false)
                            }}
                        >
                            <Text style={styles.text}>Отмена</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonNew}
                            onPress={() => {
                                setModalVisible(false)
                                logOut()
                                navigation.navigate('Login')
                            }}
                        >
                            <Text style={styles.textNew}>Выйти</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 335,
        height: 285,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#FFFFFF',
        marginVertical: 240,
        marginHorizontal: 40,
    },
    icon: {
        width: 13,
        height: 13,
    },
    iconContainer: {
        alignSelf: 'flex-end',
        marginRight: 15,
        marginVertical: 20,
        width: 20,
        height: 20,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginHorizontal: 19,
        justifyContent: 'space-between',
        marginTop: 30
    },
    title: {
        color: '#252426',
        fontSize: 20,
        lineHeight: 23,
        fontWeight: 'bold'
    },
    description: {
        color: '#5A5A5C',
        fontSize: 16,
        lineHeight: 21,
    },
    description_: {
        color: '#5A5A5C',
        fontSize: 16,
        lineHeight: 21,
        marginTop: 14
    },
    button:{
        height: 44,
        width: 144,
        borderColor: '#344181',
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        lineHeight: 19,
        color: '#344181'
    },
    buttonNew: {
        height: 44,
        width: 144,
        backgroundColor: '#344181',
        borderColor: '#344181',
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    textNew: {
        fontSize: 16,
        lineHeight: 19,
        color: '#FFFFFF'
    }

})