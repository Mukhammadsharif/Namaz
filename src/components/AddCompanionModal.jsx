import React from 'react'
import { View, TextInput, Text, StyleSheet, Modal, Button } from 'react-native'
import { normalize } from "../utils/normalize";

export default function AddCompanionModal({ modalVisible, setModalVisible,
                                              phone, setPhone, setLoading, loading}) {

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
                    <Text style={styles.title}>Добавьте контакты</Text>

                    <TextInput
                        placeholder='Номер телефон'
                        placeholderText='#494949'
                        style={styles.input}
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                    />

                    <View style={styles.button}>
                        <Button
                        title='Добавить'
                        onPress={() => {
                            setPhone(phone)
                            setModalVisible(false)
                            setLoading(true)
                        }}
                        color='#344181'
                        />
                    </View>

                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
         width: normalize(345),
         height: normalize(40),
         borderWidth: normalize(3),
         borderRadius: normalize(12),
         paddingLeft: normalize(15),
         borderColor: 'black',
         marginHorizontal: normalize(20),
         marginTop: normalize(30)
    },
    modal: {
        backgroundColor: '#F8F8F8',
        minHeight: normalize(300),
        width: normalize(380),
        position: 'absolute',
        bottom: normalize(65),
        borderRadius: normalize(25),
    },
    title: {
        fontSize: 24,
        marginHorizontal: normalize(20),
        marginTop: normalize(20)
    },
    button: {
        marginHorizontal: normalize(20),
        marginTop: normalize(25),
    }
})
