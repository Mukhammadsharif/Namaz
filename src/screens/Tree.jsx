import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Button, SafeAreaView } from 'react-native'
import {Card, Paragraph} from 'react-native-paper'
import { normalize } from "../utils/normalize";
import PlusIcon from '../assets/icons/+.png'
import EditIcon from '../assets/icons/icons8-edit-480.png'
import DeleteIcon from '../assets/icons/icons8-delete-512.png'
import ChatIcon from '../assets/icons/chat-Icon.png'
import { useNavigation } from "@react-navigation/native";
import firebase from 'firebase/compat'
import AddFamilyMemberModal from "../components/AddFamilyMemberModal";
import { app } from "../../config";

export default function Tree() {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
    const [tree, setTree] = useState(null)
    const [family, setFamily] = useState([])
    const [edited, setEdited] = useState(null)

    const [editedDate, setEditedDate] = useState(null);
    const [editedDate_, setEditedDate_] = useState(null);
    const [editedName, setEditedName] = useState('')
    const [editedSurname, setEditedSurname] = useState('')
    const [editedDescription, setEditedDescription] = useState('')
    const [editedAge, setEditedAge] = useState('')
    const [editedUri, setEditedUri] = useState(null)
    const [editedKey, setEditedKey] = useState(null)
    const [editedPhone, setEditedPhone] = useState(null)

    const [user, setUser] = useState([])
    const [companion, setCompanion] = useState([])

    let members = []
    let editedArray = []
    const id = app.auth().currentUser.uid

    const fetchData = () => {
               app.database().ref('family/')
                .orderByChild('age')
                .on('value', snapshot => {
                    setTree(snapshot)
                })
    }


    const deleteItem = (id) => {
        app.database().ref('family/'+ id).remove()
    }

    const editItem = (id) => {
        app.database().ref('family/')
                .orderByKey()
                .equalTo(id)
                .on('value', snapshot => {
                    setEdited(snapshot)
                })
        setModalVisible(true)
    }

     const updateMember = async () => {
        await app.database().ref('family/').child(editedKey).update({
                 name: editedName,
                 surname: editedSurname,
                 description: editedDescription,
                 image: editedUri ? editedUri : null,
                 age: editedAge,
                 born: editedDate,
                 died: editedDate_,
                 phone: editedPhone
             }).then(r => {
                 setEditedKey(null)
                 setEditedName('')
                 setEditedSurname('')
                 setEditedAge('')
                 setEditedDescription('')
                 setEditedUri(null)
                 setEditedPhone(null)
                 setModalVisible(false)
             })
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if(edited){
            edited.forEach(item => {
                editedArray.push(item)
            })
        }

        editedArray.map(item => {
            setEditedName(item.val().name)
            setEditedSurname(item.val().surname)
            setEditedDescription(item.val().description)
            setEditedAge(item.val().age)
            setEditedUri(item.val().image)
            setEditedPhone(item.val().phone)
            setEditedKey(item.key)
        })
    }, [edited])


    useEffect(() => {
        if(tree) {
            tree.forEach(item => {
                if(item.val().family_id === id) {
                    members.push(item)
                }
            })
        }
        setFamily(members.reverse())

        return () => {
            setCompanion([])
        }
    }, [tree])


    const getCompanion = async (phone) => {
        app.database().ref('users/')
            .orderByChild('phone')
            .equalTo(phone)
            .on('value', snapshot => {
                snapshot.forEach(item => {
                    setUser(item)
                })
            })
        if(user !== []) {
            await setCompanionList(user.key)
        }
    }

    const setCompanionList = (key) => {
        const uid = app.auth().currentUser.uid
        app.database().ref('users/' + uid)
                .child('companion')
                .on('value', snapshot => {
                   snapshot.forEach(item => {
                       item.forEach(data => {
                           setCompanion([...companion, data.val()])
                       })
                   })
                })
             if (companion && companion.includes(key) === false) {
                 app.database().ref('users/' + uid).child('companion').push({
                     companion: key
                 })
             }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>???????????????? ??????????</Text>
            </View>

            <TouchableOpacity
                style={styles.add} onPress={() => setModalVisible(true)}
            >
                <Image source={PlusIcon} style={styles.plusIcon}/>
            </TouchableOpacity>

                <ScrollView scrollEnabled showsVerticalScrollIndicator={true} vertical>
                    {family.map(item => (
                        <Card  key={item.val().id} style={{marginTop: 10}}>
                            <Card.Content style={{flexDirection: 'row'}}>
                              <Image source={{ uri: item.val().image}} style={styles.image}/>
                              <Paragraph style={{marginLeft: 20, marginRight: 40
                              }}>??????: {item.val().name}</Paragraph>
                            </Card.Content>
                            <Paragraph style={{marginLeft: 90, marginRight: 40}}>????????????????: {item.val().description}</Paragraph>

                            <View style={styles.iconsContainer}>
                                <TouchableOpacity onPress={() => editItem(item.key)}>
                                    <Image source={EditIcon} style={styles.icon}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => deleteItem(item.key)}>
                                    <Image source={DeleteIcon} style={styles.icon}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    getCompanion(item.val().phone)
                                    navigation.navigate('Chat')
                                }}>
                                    <Image source={ChatIcon} style={styles.icon}/>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    ))}
                </ScrollView>

                <View style={{flexDirection: 'row', marginTop: normalize(15)}}>

                </View>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Profile')
                    }}
                    style={styles.settingsContainer}
                >
                    <Text style={styles.settingsText}>??????????????????</Text>
                </TouchableOpacity>





                <AddFamilyMemberModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    editedName={editedName}
                    editedSurname={editedSurname}
                    editedAge={editedAge}
                    editedDescription={editedDescription}
                    editedUri={editedUri}
                    editedPhone={editedPhone}
                    setEditedPhone={setEditedPhone}
                    setEditedName={setEditedName}
                    setEditedSurname={setEditedSurname}
                    setEditedAge={setEditedAge}
                    setEditedDescription={setEditedDescription}
                    setEditedUri={setEditedUri}
                    editedKey={editedKey}
                    setEditedKey={setEditedKey}
                    updateMember={updateMember}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(25),
        fontWeight: 'bold',
        lineHeight: normalize(30),
        color: '#494949',
    },
    titleContainer: {
        marginTop: normalize(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    add: {
        width: normalize(30),
        height: normalize(30),
        backgroundColor: '#344181',
        borderRadius: normalize(25),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(10),
        marginHorizontal: normalize(170)
    },
    plusIcon: {
        width: normalize(9),
        height: normalize(10)
    },
    grandfatherContainer: {
        borderRadius: normalize(25),
        marginHorizontal: normalize(25),
        marginTop: normalize(10),
    },
    image: {
        width: normalize(50),
        height: normalize(50),
        borderRadius: normalize(50),
    },
    grandmotherContainer: {
        borderRadius: normalize(25),
        marginLeft: normalize(80),
        marginTop: normalize(10)
    },
    container:{
        width: normalize(400),
        flex: 1,
    },
    members: {
        minHeight: normalize(450),
        maxWidth: normalize(400),
    },
    icon: {
        width: normalize(20),
        height: normalize(20)
    },
    iconsContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: normalize(50),
        marginVertical: normalize(10)
    },
    settingsContainer: {
        backgroundColor: '#d7d0d0',
        height: normalize(35),
        marginLeft: normalize(20),
        marginRight: normalize(40),
        marginBottom: normalize(10),
        borderRadius: normalize(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    settingsText: {
        fontSize: normalize(17),
        fontWeight: 'bold',
    },
})
