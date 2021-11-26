import React, { useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native"
import {normalize} from "../utils/normalize";
import { useNavigation } from '@react-navigation/native'
import {logOut} from "../../api/auth-api";
import StatusSwitch from "../components/StatusSwitch";
import TreeSwitch from "../components/TreeSwitch";
import ReligiousSwitch from "../components/ReligiousSwitch";
import { Picker } from '@react-native-picker/picker'

export default function Profile({ religious, setReligious }) {
    const navigation = useNavigation()
    const [selectedValue, setSelectedValue] = useState('Пол')
    return (
        <View style={{ flex: 1}}>
            <View style={styles.chatHeaderContainer}>
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
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>

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
    }
})