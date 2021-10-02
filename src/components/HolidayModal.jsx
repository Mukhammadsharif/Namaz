import React from 'react'
import { View, Modal, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import {normalize} from "../utils/normalize"
import modalIcon from '../assets/icons/modalButton.png'

export default function HolidayModal({ modalVisible, setModalVisible}) {
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
                <View style={styles.modal}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => setModalVisible(false)}>
                        <Image source={modalIcon} style={styles.icon}/>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Курбан-байрам 2021</Text>
                        <Text style={styles.date}>четверг, 30 июля - понедельник, 3 августа</Text>
                        <Text style={styles.description}>
                            Курбан-байрам в этом году празднуется с 31 июля по 2 августа.
                            У одного из важнейших мусульманских праздников есть несколько названий: тюркское (и наиболее известное)
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
     modal: {
        backgroundColor: '#F8F8F8',
        minHeight: normalize(350),
        width: normalize(380),
        position: 'absolute',
        bottom: normalize(65),
        borderRadius: normalize(25),
    },
    icon: {
        width: normalize(40),
        height: normalize(7),
        borderRadius: normalize(15)
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: normalize(10),
        height: normalize(20)
    },
    textContainer: {
        marginVertical: normalize(10),
        marginHorizontal: normalize(15)
    },
    title: {
        color: '#494949',
        fontSize: normalize(17),
        fontWeight: 'bold',
        lineHeight: normalize(21)
    },
    date: {
        color: '#494949',
        fontSize: normalize(15),
        fontWeight: 'bold',
        lineHeight: normalize(18),
        marginTop: normalize(5)
    },
    description: {
        color: '#494949',
        fontSize: normalize(15),
        fontWeight: 'normal',
        lineHeight: normalize(18),
        marginTop: normalize(10)
    }
})