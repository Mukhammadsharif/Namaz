import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Button, SafeAreaView } from 'react-native'
import {Card, Paragraph, Title} from 'react-native-paper'
import { normalize } from "../utils/normalize";
import PlusIcon from '../assets/icons/+.png'
import EditIcon from '../assets/icons/icons8-edit-480.png'
import DeleteIcon from '../assets/icons/icons8-delete-512.png'
import { logOut } from "../../api/auth-api";
import { useNavigation } from "@react-navigation/native";
import firebase from '../../config'
import AddFamilyMemberModal from "../components/AddFamilyMemberModal";
import {v4 as uuid} from "uuid";

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

    let members = []
    let editedArray = []
    const id = firebase.auth().currentUser.uid

    const fetchData = () => {
               firebase.database().ref('family/')
                .orderByChild('age')
                .on('value', snapshot => {
                    setTree(snapshot)
                })
    }


    const deleteItem = (id) => {
        firebase.database().ref('family/'+ id).remove()
    }

    const editItem = (id) => {
        firebase.database().ref('family/')
                .orderByKey()
                .equalTo(id)
                .on('value', snapshot => {
                    setEdited(snapshot)
                })
        setModalVisible(true)
    }

     const updateMember = async () => {
        await firebase.database().ref('family/').child(editedKey).update({
                 name: editedName,
                 surname: editedSurname,
                 description: editedDescription,
                 image: editedUri,
                 age: editedAge,
                 born: editedDate,
                 died: editedDate_
             }).then(r => {
                                    console.log(r)
                                    setEditedKey(null)
                                    setEditedName('')
                                    setEditedSurname('')
                                    setEditedAge('')
                                    setEditedDescription('')
                                    setEditedUri(null)
                                    setModalVisible(false)
             })
         console.log(editedAge)
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
    }, [tree])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Семейное древо</Text>
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
                              }}>ФИО: {item.val().name}</Paragraph>
                            </Card.Content>
                            <Paragraph style={{marginLeft: 90, marginRight: 40}}>Описание: {item.val().description}</Paragraph>
                            <View style={styles.iconsContainer}>
                                <TouchableOpacity onPress={() => editItem(item.key)}>
                                    <Image source={EditIcon} style={styles.icon}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => deleteItem(item.key)}>
                                    <Image source={DeleteIcon} style={styles.icon}/>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    ))}
                </ScrollView>

                <View style={{flexDirection: 'row', marginTop: normalize(15)}}>

                </View>
                <Button title="Logout" onPress={() => {
                    logOut()
                    navigation.navigate('Login')
                }}/>




                <AddFamilyMemberModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    editedName={editedName}
                    editedSurname={editedSurname}
                    editedAge={editedAge}
                    editedDescription={editedDescription}
                    editedUri={editedUri}
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
    }
})