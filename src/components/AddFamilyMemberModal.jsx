import React, {useEffect, useState} from 'react'
import { View,
    Modal,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import ImagePicker from 'react-native-image-crop-picker';
import {normalize} from "../utils/normalize"
import modalIcon from '../assets/icons/modalButton.png'
import imagePicker1 from '../assets/icons/imagePicker1.png'
import imagePicker2 from '../assets/icons/imagePicker2.png'
import DeathDate from "./DeathDate";
import BirthDate from "./BirthDate";
// import firebase from "../../config";
import storage from '@react-native-firebase/storage'
import {firebase} from '@react-native-firebase/auth'
import  { v4 as uuid } from 'uuid'

export default function AddFamilyMemberModal({
                                                    modalVisible,
                                                    setModalVisible,
                                                    editedName,
                                                    editedSurname,
                                                    editedAge,
                                                    editedDescription,
                                                    editedUri,
                                                    editedPhone,
                                                    setEditedName,
                                                    setEditedSurname,
                                                    setEditedAge,
                                                    setEditedDescription,
                                                    setEditedPhone,
                                                    setEditedUri,
                                                    updateMember,
                                                    editedKey,
                                                    setEditedKey
}) {
    const [selectedValue, setSelectedValue] = useState('Пол')
    const [date, setDate] = useState(new Date(1598051730000));
    const [date_, setDate_] = useState(new Date(1598051730000));
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [description, setDescription] = useState('')
    const [age, setAge] = useState('')
    const [uri, setUri] = useState(null)
    const [phone, setPhone] = useState('')


    const getImages = async()  => {
        ImagePicker.openPicker( {
          cropping: true,
          skipBackup: true,
          quality: 1,
        }).then(image => {
             if(editedKey) {
                 setEditedUri(image.path);
             } else {
                 setUri(image.path);
             }
        });
    }

    useEffect(() => {
        firebase.auth().signInAnonymously()
        uri ? uploadImage() : null
        editedUri ? editedUploadImage(): null
    }, [uri, editedUri])

    const metadata = {
      contentType: 'image/jpeg',
    };

    const uploadImage = async () => {
          const filename = uri.substring(uri.lastIndexOf('/') + 1);
          const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
          const task = firebase.storage()
            .ref(filename)
            .put(uploadUri);
          // set progress state
          task.on('state_changed', snapshot => {

          });
          try {
            await task;
          } catch (e) {
            console.error(e);
          }
          console.log(
            'Photo uploaded!',
            'Your photo has been uploaded to Firebase Cloud Storage!'
          );
        };

        const editedUploadImage = async () => {
          const filename = editedUri.substring(editedUri.lastIndexOf('/') + 1);
          const uploadUri = Platform.OS === 'ios' ? editedUri.replace('file://', '') : editedUri;
          console.log(uploadUri)
          const task = storage()
            .ref(filename)
            .putFile(uploadUri);
          // set progress state
          try {
            await task;
          } catch (e) {
            console.error(e);
          }
          console.log(
            'Photo uploaded!',
            'Your photo has been uploaded to Firebase Cloud Storage!'
          );
        };




    const addMember = async () => {
        await firebase.database().ref('family/').child(uuid()).set({
                 id: uuid(),
                 name: name,
                 surname: surname,
                 description: description,
                 image: uri,
                 family_id: firebase.auth().currentUser.uid,
                 age: age,
                 born: date,
                 died: date_,
                 phone: phone
             }).then(r => console.log(r))
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            >
                <View style={styles.modal}>

                    <TouchableOpacity style={styles.iconContainer} onPress={() => setModalVisible(false)}>
                        <Image source={modalIcon} style={styles.icon}/>
                    </TouchableOpacity>

                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                            style={styles.imageContainer}
                            onPress={() => getImages()}
                        >
                            { !uri && !editedKey ? (
                                <>
                                <Image source={imagePicker1} style={styles.imageMan}/>
                                <Image source={imagePicker2} style={styles.imageWoman}/>
                                </>
                                    ) : (
                                 <Image source={{ uri: editedKey ? editedUri : uri}} style={styles.image}/>
                            )}
                        </TouchableOpacity>

                        <View style={{marginTop: normalize(15)}}>
                            <TextInput
                                placeholder='ФИО'
                                placeholderText='#494949'
                                style={styles.input}
                                value={editedKey ? editedName : name}
                                onChangeText={editedKey ? setEditedName : setName}
                            />

                            <View style={styles.gender}>
                                <Text>Пол</Text>

                                <Picker
                                    selectedValue={selectedValue}
                                    style={{ height: 50, width: 150 }}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                >
                                    <Picker.Item label="Мужской" value="Мужской" />
                                    <Picker.Item label="Женский" value="Женский" />
                              </Picker>
                            </View>

                             <TextInput
                                placeholder='Девичья фамилия'
                                placeholderText='#494949'
                                style={styles.input}
                                value={editedKey ? editedSurname : surname}
                                onChangeText={editedKey ? setEditedSurname : setSurname}
                            />

                            <View style={styles.dateContainer}>
                                <Text>Годы жизны</Text>

                                <BirthDate date={date} setDate={setDate}/>

                                <DeathDate date={date_} setDate={setDate_}/>

                            </View>

                            <View>
                                <TextInput
                                    placeholder='Возрасть'
                                    placeholderText='#494949'
                                    style={styles.ageInput}
                                    value={editedKey ? editedAge : age}
                                    onChangeText={editedKey ? setEditedAge : setAge}
                                />
                            </View>

                            <View>
                                <TextInput
                                    placeholder='Описание '
                                    placeholderText='#494949'
                                    style={styles.input}
                                    value={editedKey ? editedDescription : description}
                                    onChangeText={editedKey ? setEditedDescription : setDescription}
                                />
                            </View>

                            <View style={{marginTop: 15}}>
                                <TextInput
                                    placeholder='Номер телефона'
                                    placeholderText='#494949'
                                    style={styles.input}
                                    value={editedKey ? editedPhone : phone}
                                    onChangeText={editedKey ? setEditedPhone : setPhone}
                                />
                            </View>

                            {!editedKey ? (
                                <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    addMember()
                                    setModalVisible(false)
                                }}
                                >
                                    <Text style={styles.buttonText}>Добавить</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                style={styles.button}
                                onPress={updateMember}
                                >
                                    <Text style={styles.buttonText}>Обновить</Text>
                                </TouchableOpacity>
                            )}

                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
     modal: {
        backgroundColor: '#F8F8F8',
        minHeight: normalize(520),
        width: normalize(380),
        position: 'absolute',
        bottom: normalize(65),
        borderRadius: normalize(25),
    },
    icon: {
        width: normalize(40),
        height: normalize(7),
        borderRadius: normalize(15)
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: normalize(10),
        height: normalize(20)
    },
    imageContainer: {
         width: normalize(110),
         height: normalize(110),
         backgroundColor: '#DDDDDD',
         borderRadius: normalize(90),
         flexDirection: 'row',
         alignItems: 'center'
    },
    imageMan: {
         width: normalize(38),
         height: normalize(45),
         marginLeft: normalize(35)
    },
    imageWoman: {
         width: normalize(23),
         height: normalize(41),
         marginLeft: normalize(-9.5),
         marginTop: normalize(7)
    },
    input: {
         width: normalize(345),
         height: normalize(40),
         borderWidth: normalize(3),
         borderRadius: normalize(12),
         paddingLeft: normalize(15),
         borderColor: 'black',
    },
    ageInput: {
         width: normalize(345),
         height: normalize(40),
         borderWidth: normalize(3),
         borderRadius: normalize(12),
         paddingLeft: normalize(15),
         borderColor: 'black',
         marginBottom: normalize(15)
    },
    gender: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         marginHorizontal: normalize(10),
    },
    dateButton: {
         backgroundColor: '#E5E5E5',
         height: normalize(35),
         width: normalize(100),
         justifyContent: 'center',
         alignItems: 'center'
    },
    dateText: {
         fontSize: normalize(13),
         lineHeight: 16,
         color: "#494949",
    },
    dateContainer: {
         flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: normalize(5),
        marginVertical: normalize(10),
    },
    image: {
         width: normalize(110),
         height: normalize(110),
         borderRadius: 90
    },
    button: {
         width: normalize(345),
         height: normalize(40),
         borderWidth: normalize(3),
         borderRadius: normalize(12),
         marginTop: normalize(10),
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: '#344181',
    },
    buttonText: {
         color: '#FFFFFF'
    }
})