import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView} from "react-native"
import chevronLeft from "../assets/icons/chevronLeft.png";
import userImage from "../assets/images/companion.png";
import { useNavigation } from '@react-navigation/native'
import {normalize} from "../utils/normalize";
import firebase from "firebase/compat";
import {Card, Paragraph} from "react-native-paper";

export default function UserFamilyScreen({ route }) {
    const navigation = useNavigation()
    const { guestId, name } = route.params

    const [tree, setTree] = useState(null)
    const [family, setFamily] = useState([])
    const [treeVisibility, setTreeVisibility] = useState(null)

    const fetchData = () => {
               firebase.database().ref('family/')
                .orderByChild('age')
                .on('value', snapshot => {
                    setTree(snapshot)
                })
              firebase.database().ref('users/' + guestId).child('treeVisibility')
                  .on('value', snapshot => console.log(snapshot))

    }

    useEffect(() => {
        fetchData()
    }, [])

    let members = []

    useEffect(() => {
        if(tree) {
            tree.forEach(item => {
                if(item.val().family_id === guestId) {
                    members.push(item)
                }
            })
        }
        setFamily(members.reverse())

        // return () => {
        //     setCompanion([])
        // }
    }, [tree])

    console.log(guestId, family, 'aaa' + treeVisibility)
    return (
        <View>
            <View style={styles.chatHeaderContainer}>
                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.chatsContainer}>
                    <Image source={chevronLeft} style={styles.chevronLeft}/>
                    <Text style={styles.chats}>Сообщения</Text>
                 </TouchableOpacity>

                 <TouchableOpacity
                     style={{ alignItems: 'center', marginLeft: -30}}>
                     <Text style={styles.chatHeaderText}> { name } </Text>
                     <Text style={styles.userStatus}>История предков</Text>
                 </TouchableOpacity>

                 <View>
                     <Image source={userImage} style={styles.userImage}/>
                 </View>
             </View>


            <ScrollView scrollEnabled showsVerticalScrollIndicator={true} vertical>
                    {family.map(item => (
                        <Card  key={item.val().id} style={{marginTop: 10}}>
                            <Card.Content style={{flexDirection: 'row'}}>
                              <Image source={{ uri: item.val().image}} style={styles.image}/>
                              <Paragraph style={{marginLeft: 20, marginRight: 40}}>ФИО: {item.val().name}</Paragraph>
                            </Card.Content>
                            <Paragraph style={{marginLeft: 90, marginRight: 40, marginBottom: 20}}>Описание: {item.val().description}</Paragraph>
                        </Card>
                    ))}
                </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    chatHeaderContainer: {
        width: normalize(380),
        height: normalize(60),
        backgroundColor: '#344181',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: normalize(20)
    },
    chatHeaderText: {
        fontWeight: 'bold',
        fontSize: normalize(20),
        lineHeight: normalize(21),
        color: '#FFFFFF',
        textAlign: 'center',
    },
    userStatus: {
        fontSize: normalize(13),
        lineHeight: normalize(16),
        color: '#FFFFFF',
        marginLeft: normalize(0)
    },
    chevronLeft: {
        width: normalize(11),
        height: normalize(18),
        marginLeft: -10
    },
    chats: {
        fontWeight: 'bold',
        fontSize: normalize(16),
        lineHeight: normalize(18),
        color: '#FFFFFF',
        marginLeft: 10
    },
    userImage: {
        width: normalize(45),
        height: normalize(45)
    },
    chatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        minWidth: normalize(50)
    },
    image: {
        width: normalize(50),
        height: normalize(50),
        borderRadius: normalize(50),
    },
})