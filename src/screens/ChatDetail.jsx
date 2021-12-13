import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { normalize } from "../utils/normalize"
import Message from "../components/Message"
import chevronLeft from '../assets/icons/chevronLeft.png'
import userImage from '../assets/images/companion.png'
import filesIcon from '../assets/icons/files.png'
import voiceIcon from '../assets/icons/voice-message-microphone-button.png'
import sendMessageIcon from '../assets/icons/send_message.png'
import { SendMessage, ReceiveMessage} from "../components/Messages";
import firebase from '../../config'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
    AVEncoderAudioQualityIOSType, AVEncodingOption
} from "react-native-audio-recorder-player";
import uploadAudio from "../sounds/uploadAudio";
import { v4 as uuid } from 'uuid'
import {faPlay, faShare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";


const audioRecorderPlayer = new AudioRecorderPlayer();

export default function ChatDetail({ navigation, route }) {
    const [message, setMessage] = useState('')
    const { name, guestId, status, visibility } = route.params
    const currentUserId = firebase.auth().currentUser.uid
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState(false)
    const [audio, setAudio] = useState('audio')
    const [pauseRecord, setPauseRecord] = useState(false)
    const [audioState, setAudioState] = useState('Нажмите на микрофон')
    let allMessages = []

    const scrollViewRef = useRef()

    const sendMessage = () => {
        const id = uuid()
        if(message) {
            SendMessage(currentUserId, guestId, message, id)
                .then(() => {
                    setMessage('')
                }).catch(error => console.log(error))

             ReceiveMessage(currentUserId, guestId, message)
                .then(() => {
                    setMessage('')
                }).catch(error => console.log(error))
        }
    }

    const sendAudio = (id) => {
        console.log(id, audio)
        if(audio.message !== '') {
             console.log(audio)
            SendMessage(currentUserId, guestId, audio, id)
                .then(() => {
                    setNewMessage(!newMessage)
                }).catch(error => console.log(error))

            ReceiveMessage(currentUserId, guestId, audio)
                .then(() => {
                    setNewMessage(!newMessage)
                }).catch(error => console.log(error))
        }
    }

    useEffect(() => {
        try {
            firebase.database().ref('messages')
                .child(currentUserId)
                .child(guestId)
                .on('value', snapshot => {
                    snapshot.forEach(data => {
                        allMessages.push(data)
                    })
                    setMessages(allMessages)
                })
        } catch (error) {
            console.log(error)
        }

    }, [message, newMessage])

    const [state, setState] = useState({})


    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const meteringEnabled = false;



    const onStartRecord = async () => {
        setPauseRecord(false)
        setAudioState('Нажмите на поделиться')
        const result = await audioRecorderPlayer.startRecorder();
        audioRecorderPlayer.addRecordBackListener((e) => {
        setState({
          recordSecs: e.currentPosition,
          recordTime: audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
          ),
        });
        console.log(e)
        return;
      });
      console.log(result);
    };

    const onPauseRecord = async () => {
        const result = await audioRecorderPlayer.pauseRecorder()
        audioRecorderPlayer.addRecordBackListener((e) => {
            console.log(e)
        })
        setPauseRecord(true)
        console.log(result);
    }


    const onStopRecord = async () => {
          setAudioState('Нажмите на микрофон')
          const result = await audioRecorderPlayer.stopRecorder();
          audioRecorderPlayer.removeRecordBackListener();
          setState({
            recordSecs: 0,
          });
          const id = uuid()
          await sendAudio(id)
          await uploadAudio(id)
          console.log(result);
    };


    return (
        <View style={{flex: 1, marginBottom: 10}}>
             <View style={styles.chatHeaderContainer}>
                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.chatsContainer}>
                    <Image source={chevronLeft} style={styles.chevronLeft}/>
                    <Text style={styles.chats}>Чаты</Text>
                 </TouchableOpacity>

                 <TouchableOpacity
                     style={{justifyContent: 'center', alignItems: 'center'}}
                     onPress={() => navigation.navigate('UserFamilyScreen', {guestId: guestId, name: name})}>
                     <Text style={styles.chatHeaderText}> { name } </Text>
                     <Text style={styles.userStatus}>{visibility ? status ? 'онлайн' : "был(а) недавно" : null}</Text>
                 </TouchableOpacity>

                 <View>
                     <Image source={userImage} style={styles.userImage}/>
                 </View>
             </View>

            <ScrollView
                style={styles.scroll}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {messages ? messages.map(item => (
                    <Message item={item} key={item.val().id}/>
                )): null}

            </ScrollView>

            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    onPress={onStartRecord}>
                    <Image source={voiceIcon} style={styles.voiceIcon}/>
                </TouchableOpacity>

                <Text>{audioState}</Text>

                <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center',}}
                    onPress={onStopRecord}>
                    <FontAwesomeIcon icon={faShare}/>
                </TouchableOpacity>
            </View>

            <View style={styles.separator}/>

            <KeyboardAvoidingView
                style={styles.sendMessageContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableOpacity style={styles.filesIconContainer}>
                    <Image source={filesIcon} style={styles.filesIcon}/>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Сообщение...'
                        value={message}
                        onChangeText={setMessage}
                    />
                </View>

                <TouchableOpacity
                    style={styles.filesIconContainer}
                    onPress={() => sendMessage()}
                >
                    <Image source={sendMessageIcon} style={styles.filesIcon} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
        height: normalize(18)
    },
    chats: {
        fontWeight: 'bold',
        fontSize: normalize(16),
        lineHeight: normalize(18),
        color: '#FFFFFF',
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
    filesIcon: {
        width: normalize(19),
        height: normalize(21),
    },
    filesIconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#EAEAEA',
        width: normalize(286),
        maxWidth: normalize(286),
        height: normalize(40),
        borderRadius: normalize(25),
        paddingLeft: normalize(20)
    },
    sendMessageContainer: {
        flexDirection: 'row',
        paddingHorizontal: normalize(15),
        justifyContent: 'space-around',
    },
    separator: {
        backgroundColor: '#C5C5C5',
        height: normalize(3),
        width: normalize(380),
        marginBottom: normalize(10),
        marginTop: normalize(10)
    },
    scroll: {
        height: normalize(570)
    },
    inputContainer: {
        height: 40
    },
    voiceIcon: {
        width: 20,
        height: 20
    }
})