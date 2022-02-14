import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import AddCompanionModal from "../components/AddCompanionModal";
import PlusIcon from '../assets/icons/+.png'
import {normalize} from "../utils/normalize"
import Companion from "../components/Companion"
import {app} from '../../config'

export default function Chat({ navigation }){
    const [modalVisible, setModalVisible] = useState(false)
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [company, setCompany] = useState([])
    const [companion, setCompanion] = useState(null)
    const [companionsList, setCompanionsList] = useState([])
    const [chats, setChats] = useState([])
    const [chatsList, setChatsList] = useState([])
    const [userLoading, setUserLoading] = useState(false)
    let companions = []
    let list = []
    let chatList = []

    const getCompanion = () => {
              app.database().ref('users/')
                .orderByChild('phone')
                .equalTo(phone)
                .on('value', snapshot => {
                       if(snapshot.val() === null) {
                           Alert.alert('Пользователь не найден')
                       } else {
                           setUser(snapshot)
                           setUserLoading(!userLoading)
                           if(companionsList.length < 1) {
                               setUser(snapshot)
                               Alert.alert('Пользователь добавьляется...')
                           } else if(companionsList.length > 0) {
                               companionsList.map(item => {
                                   console.log(item)
                               })
                           }
                       }
                })
    }


    useEffect(() => {
        if (user) {
           user.forEach(item => {
               companions.push(item)
               setCompany(companions)
           })
            setCompanionList()
        }
        setPhone('')
    }, [userLoading])


    const setCompanionList = () => {
        const uid = app.auth().currentUser.uid
             if (company) {
                    company.map(item => {
                        app.database().ref('users/' + uid).child('companion').push({
                        companion: item.key
                    })
                })
             }
    }

    const getCompanionListItems = () => {
        const uid = app.auth().currentUser.uid
                 app.database().ref('users/' + uid)
                .child('companion')
                .on('value', snapshot => {
                    setCompanion(snapshot)
                })
    }

    useEffect(() => {
        if (companion) {
                companion.forEach(item => {
                    list.push(item)
                })
                setCompanionsList(list)
            }
    }, [companion])


    useEffect(() => {
        setChatList()
    }, [companionsList])

    let array = []
    const setChatList = () => {
            companionsList.map(item => {
                app.database().ref('users/')
                    .orderByChild('id')
                    .equalTo(item.val().companion)
                    .on('value', snapshot => {
                        snapshot.forEach(item => {
                            array.push(item)
                            chatSet()
                        })
                    })
            })
    }

    const chatSet = () => {
        let set = []
        array.map(item => {
            set.push(item)
        })
        setChats(set)
    }


    const setList = () => {
        if(chats) {
            chats.forEach(item => {
                chatList.push(item)
            })
            setChatsList(chatList)
        }
    }

    useEffect(() => {
        setList()
    }, [chats])



    useEffect(() => {
        getCompanionListItems()
    }, [])

    useEffect(() => {
       getCompanion()
    }, [loading])


    return(
        <View>
            <View style={styles.chatHeaderContainer}>
                <Text style={styles.chatHeaderText}>Чат</Text>

                <TouchableOpacity
                    style={styles.add}
                    onPress={() => setModalVisible(true)}
                >
                     <Image source={PlusIcon} style={styles.plusIcon}/>
                </TouchableOpacity>
            </View>

            {!chatsList.length ? <ActivityIndicator size="large" color="#0000ff"/> : null}

            <ScrollView>
                {chatsList ? chatsList.map(item => (
                    <Companion navigation={navigation} item={item} key={item.key}/>
                )) : null}
            </ScrollView>

            <AddCompanionModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                phone={phone}
                setPhone={setPhone}
                getCompanion={getCompanion}
                setCompanionList={setCompanionList}
                setLoading={setLoading}
                loading={loading}
            />
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
        flexDirection: 'row'
    },
    chatHeaderText: {
        fontWeight: 'bold',
        fontSize: normalize(20),
        lineHeight: normalize(21),
        color: '#FFFFFF',
    },
     plusIcon: {
        width: normalize(15),
        height: normalize(15)
    },
    add: {
        width: normalize(30),
        height: normalize(30),
        backgroundColor: '#344181',
        borderRadius: normalize(25),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 25
    },
})
