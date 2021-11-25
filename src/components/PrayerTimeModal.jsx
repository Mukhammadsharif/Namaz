import React from 'react'
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {normalize} from "../utils/normalize"
import SwitchButton from "./SwitchButton"

export default function PrayerTimeModal({ modalVisible, setModalVisible, prayTime}) {
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
                   <View style={{marginVertical: normalize(9)}}>
                       <View style={styles.timeContainer}>
                            <Text style={styles.name}>Фаджр</Text>
                            <SwitchButton id='1' time={prayTime ? prayTime.Fajr: ''}/>
                            <Text style={styles.time}>
                                {prayTime ? prayTime.Fajr.substring(0,2) <= 12 ? prayTime.Fajr.substring(0,5) + ' ДП'
                                    : '0' + prayTime.Fajr.substring(0,2) - 12 + prayTime.Fajr.substring(2,5) + ' ПП' : null}
                            </Text>
                        </View>

                        <View style={styles.timeContainer}>
                            <Text style={styles.name}>Восход</Text>
                            <SwitchButton id='2' time={prayTime ? prayTime.Sunrise : ''}/>
                            <Text style={styles.time}>
                                {prayTime ? prayTime.Sunrise.substring(0,2) <= 12 ? prayTime.Sunrise.substring(0,5) + ' ДП'
                                    : '0' + prayTime.Sunrise.substring(0,2) - 12 + prayTime.Sunrise.substring(2,5) + ' ПП' : null}
                            </Text>
                        </View>

                        <View style={styles.timeContainer}>
                            <Text style={styles.name}>Зухр     </Text>
                                <SwitchButton id='3' time={prayTime ? prayTime.Dhuhr : ''}/>
                            <Text style={styles.time}>
                                {prayTime ? prayTime.Dhuhr.substring(0,2) <= 12 ? prayTime.Dhuhr.substring(0,5) + ' ДП'
                                    : '0' + prayTime.Dhuhr.substring(0,2) - 12 + prayTime.Dhuhr.substring(2,5) + ' ПП' : null}
                            </Text>
                        </View>

                        <View style={styles.timeContainer}>
                            <Text style={styles.name}>Аср       </Text>
                                <SwitchButton id='4' time={ prayTime ? prayTime.Asr : ''}/>
                            <Text style={styles.time}>
                                {prayTime ? prayTime.Asr.substring(0,2) <= 12 ? prayTime.Asr.substring(0,5) + ' ДП'
                                    : '0' + prayTime.Asr.substring(0,2) - 12 + prayTime.Asr.substring(2,5) + ' ПП' : null}
                            </Text>
                        </View>

                        <View style={styles.timeContainer}>
                            <Text style={styles.name}>Магриб</Text>
                            <SwitchButton id='5' time={prayTime ? prayTime.Maghrib : ''}/>
                            <Text style={styles.time}>
                                {prayTime ? prayTime.Maghrib.substring(0,2) <= 12 ? prayTime.Maghrib.substring(0,5) + ' ДП'
                                    : '0' + prayTime.Maghrib.substring(0,2) - 12 + prayTime.Maghrib.substring(2,5) + ' ПП' : null}
                            </Text>
                        </View>

                        <View style={styles.timeContainer}>
                            <Text style={styles.name}>Иша     </Text>
                            <SwitchButton id='6' time={prayTime ? prayTime.Isha : ''}/>
                            <Text style={styles.time}>
                                {prayTime ? prayTime.Isha.substring(0,2) <= 12 ? prayTime.Isha.substring(0,5) + ' ДП'
                                    : '0' + prayTime.Isha.substring(0,2) - 12 + prayTime.Isha.substring(2,5) + ' ПП' : null}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.close} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Закрыть</Text>
                        </TouchableOpacity>
                   </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#F7F7F7',
        minHeight: normalize(350),
        width: normalize(380),
        position: 'absolute',
        bottom: normalize(65),
    },
    timeContainer: {
        width: normalize(350),
        height: normalize(40),
        borderRadius: normalize(5),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: normalize(10),
        marginHorizontal: normalize(15),
        justifyContent: 'space-between',
        paddingHorizontal: normalize(10),
    },
    time:{
        fontSize: normalize(15),
        color: '#494949',
        lineHeight: normalize(18),
        fontWeight: '600',
        // marginLeft: normalize(260)
    },
    name: {
        fontSize: normalize(15),
        color: '#494949',
        lineHeight: normalize(18),
        fontWeight: 'bold',
        marginLeft: normalize(10)
    },
    close: {
        width: normalize(350),
        height: normalize(40),
        borderRadius: normalize(5),
        backgroundColor: '#344181',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: normalize(10),
        marginHorizontal: normalize(15),
    },
    closeText: {
        fontSize: normalize(15),
        lineHeight: normalize(18),
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
})