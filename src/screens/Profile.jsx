import React, { useState, useEffect, useContext } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native"
import {normalize} from "../utils/normalize";
import { useNavigation } from '@react-navigation/native'
import {logOut} from "../../api/auth-api";
import StatusSwitch from "../components/StatusSwitch";
import TreeSwitch from "../components/TreeSwitch";
import ReligiousSwitch from "../components/ReligiousSwitch";
import { Picker } from '@react-native-picker/picker'
import { MusicContext } from "../utils/context";
import AsyncStorage from '@react-native-async-storage/async-storage'
import LogOutModal from "../components/LogOutModal";
import chevronLeft from "../assets/icons/chevronLeft.png";

export default function Profile({ religious, setReligious }) {
    const navigation = useNavigation()
    const { setMusic, music } = useContext(MusicContext)
    const [selectedValue, setSelectedValue] = useState('first')
    const [modal, setModal] = useState(false)

    const getSong = async () => {
        let sound = await AsyncStorage.getItem('music')
        setSelectedValue(sound)
    }

    useEffect(() => {
        getSong()
    }, [])

    useEffect(() => {
        setMusic(selectedValue)
        AsyncStorage.setItem('music', selectedValue)
        selectedValue === music ? getSong() : null
    }, [selectedValue])


    return (
        <View style={{ flex: 1}}>
            <View style={styles.chatHeaderContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={chevronLeft} style={styles.chevronLeft}/>
                    <Text style={styles.chats}>Чаты</Text>
                 </TouchableOpacity>

                <Text style={styles.chatHeaderText}>Профиль</Text>
            </View>

            <View style={styles.content}>

                <View style={styles.itemContainer}>
                    <Text style={styles.titleText}>Вскрыть статус</Text>
                    <StatusSwitch/>
                </View>

                <View style={styles.itemContainer}>
                    <Text style={styles.titleText}>Вскрыть историю предков</Text>
                    <TreeSwitch />
                </View>

                 <View style={styles.itemContainer}>
                    <Text style={styles.titleText}>Вскрыть намаз и календарь</Text>
                    <ReligiousSwitch religious={religious} setReligious={setReligious}/>
                </View>


                <View style={styles.songContainer}>
                    <Text style={styles.titleText}>Выберете молитву</Text>

                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="1" value="first" />
                        <Picker.Item label="2" value="second" />
                        <Picker.Item label="3" value="third" />
                        <Picker.Item label="4" value="fourth" />
                        <Picker.Item label="5" value="fifth" />
                    </Picker>
                </View>

            </View>

            <TouchableOpacity
                onPress={() => {
                    setModal(true)
                }}
                style={styles.exitContainer}>
                <Text style={styles.exitText}>Выход из системы</Text>
            </TouchableOpacity>

            <LogOutModal
                modalVisible={modal}
                setModalVisible={setModal}/>
        </View>
    )
}

const styles = StyleSheet.create({
    chatHeaderContainer: {
        width: normalize(380),
        height: normalize(60),
        backgroundColor: '#344181',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 2
    },
    chatHeaderText: {
        fontWeight: 'bold',
        fontSize: normalize(20),
        lineHeight: normalize(21),
        color: '#FFFFFF',
        flex: 2,
        marginLeft: 20
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
    titleText: {
        fontSize: normalize(16),
        alignItems: 'center',
    },
    itemContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: normalize(15)
    },
    songContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: normalize(15)
    },
    chevronLeft: {
        width: normalize(11),
        height: normalize(18)
    },
    chats: {
        fontWeight: 'bold',
        fontSize: normalize(16),
        lineHeight: normalize(18),
        color: '#FFFFFF',
        marginLeft: 8,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        flex: 1
    }
})