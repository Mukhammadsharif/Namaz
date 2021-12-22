import React, { useState, useEffect } from 'react'
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Alert} from 'react-native'
import AddCompanionModal from "../components/AddCompanionModal";
import PlusIcon from '../assets/icons/+.png'
import {normalize} from "../utils/normalize"
import Companion from "../components/Companion"
import firebase from '../../config'

export default function Chat({ navigation }){
    const [modalVisible, setModalVisible] = useState(false)
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [company, setCompany] = useState([])
    const [companion, setCompanion] = useState([])
    const [companionsList, setCompanionsList] = useState([])
    const [chats, setChats] = useState([])
    const [chatsList, setChatsList] = useState([])
    let list = []
    let chatList = []

    const getCompanion = () => {
              firebase.database().ref('users/')
                .orderByChild('phone')
                .equalTo(phone)
                .on('value', snapshot => {
                       if(snapshot.val() === null) {
                           Alert.alert('Пользователь не существует')
                       } else {
                           setUser(snapshot)
                       }
                })
    }

    useEffect(() => {
        if (user) {
           user.forEach(item => {
               setCompany([...company, item])
               console.log(item, company)
           })
        }
        setPhone('')
    }, [user])

    useEffect(() => {
        company.length > 0 ? setCompanionList() : null
    }, [company])

    let newUser
    let oldUser = []

    const setCompanionList = () => {
        const uid = firebase.auth().currentUser.uid

        companionsList.map(item => oldUser.push(item.val().companion))
        company.map(item => newUser = item.key)

        if (!oldUser.includes(newUser)) {
            console.log(oldUser, newUser)
            company.map(item => {
                firebase.database().ref('users/' + uid).child('companion').push({
                    companion: newUser
                })
            })
            setCompany([])
            setUser(null)
        } else {
            Alert.alert('Пользователь уже добавлен')
        }
    }

    const getCompanionListItems = () => {
        const uid = firebase.auth().currentUser.uid
                 firebase.database().ref('users/' + uid)
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
                firebase.database().ref('users/')
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
       loading ? getCompanion() : null

        return () => setLoading(false)
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