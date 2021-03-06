import React, { useState} from 'react'
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { normalize } from "../utils/normalize"
import BackgroundImage  from '../assets/images/backgroud.png'
import nameValidator from "../helpers/nameValidator";
import emailValidator from "../helpers/emailValidator";
import passwordValidator from "../helpers/passwordValidator";
import phoneNumberValidator from "../helpers/phoneNumberValidator";
import { signUpUser } from "../../api/auth-api";
import TextInput from "../components/TextInput";
// import firebase from 'firebase/compat'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {theme} from "../components/theme";
import { app } from "../../config";
import ReligiousSwitch from "../components/ReligiousSwitch";


export default function Register({ religious, setReligious }){
    const [name, setName] = useState({value: '', error: ''})
    const [email, setEmail] = useState({value: '', error: ''})
    const [password, setPassword] = useState({value: '', error: ''})
    const [password2, setPassword2] = useState({value: '', error: ''})
    const [phoneNumber, setPhoneNumber] = useState({value: '', error: ''})
    const [passwordEye, setPasswordEye] = useState(false)
    const [retryPasswordEye, setRetryPasswordEye] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const onSignupPressed = async () => {
        if (password.value === password2.value) {
            const nameError = nameValidator(name.value)
            const emailError = emailValidator(email.value)
            const passwordError = passwordValidator(password.value)
            const phoneNumberError = phoneNumberValidator(phoneNumber.value)
        if (emailError || passwordError || nameError || phoneNumberError) {
            setName({...name, error: nameError})
            setEmail({...email, error: emailError})
            setPassword({...password, error:passwordError})
            setPhoneNumber({...phoneNumber, error: phoneNumberError})
        }
        setLoading(true)
        const response = await signUpUser({
            name: name.value,
            email: email.value,
            password: password.value,
            phoneNumber: phoneNumber.value
        })

            let uid = app.auth().currentUser.uid
            await app.database().ref('users/').child(uid).set({
                 id: uid,
                 name: name.value,
                 email: email.value,
                 phone: phoneNumber.value,
                 family_id: app.auth().currentUser.uid,
                 image: null,
                 status: false,
                 treeVisibility: false,
                 visibility: false,
             }).then(r => console.log(r))

        if (response.error){
            console.log('err' + response.error)
            Alert.alert(response.error)
        } else {
            navigation.navigate('TabScreen')
        }
        setLoading(false)
        }
        else {
            Alert.alert('???????????? ???? ??????????????????')
        }
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView scrollEnabled
                        showsVerticalScrollIndicator={false}
            >
                 <ImageBackground source={BackgroundImage} style={styles.image}>
                         <View style={styles.container}>
                             <Text style={styles.welcome}>?????????? ????????????????????</Text>
                             <Text style={styles.appName}>?? ??????????</Text>
                         </View>

                        <View style={styles.inputs}>
                         <Text style={styles.register}>??????????????????????</Text>
                          <TextInput
                              placeholder='??????????????'
                              placeholderTextColor='#FFFFFF'
                              onChangeText={(text) => setPhoneNumber({value:text, error: ''})}
                              value={phoneNumber.value}
                              error={phoneNumber.error}
                              errorText={phoneNumber.error}
                          />
                           <TextInput
                              placeholder='??????'
                              placeholderTextColor='#FFFFFF'
                              onChangeText={(text) => setName({value:text, error: ''})}
                              value={name.value}
                              error={name.error}
                              errorText={name.error}
                          />
                           <TextInput
                              placeholder='E-mail'
                              placeholderTextColor='#FFFFFF'
                              onChangeText={(text) => setEmail({value:text, error: ''})}
                              value={email.value}
                              error={email.error}
                              errorText={email.error}
                          />
                           <TextInput
                              placeholder='????????????'
                              placeholderTextColor='#FFFFFF'
                              onChangeText={(text) => setPassword({value:text, error: ''})}
                              value={password.value}
                              error={password.error}
                              secureTextEntry={!passwordEye}
                              errorText={password.error}
                              button={() => <FontAwesomeIcon icon={faEye} color={theme.colors.tint} size={24}/>}
                              buttonFunc={() => setPasswordEye(!passwordEye)}
                          />
                           <TextInput
                              placeholder='?????????????????? ????????????'
                              placeholderTextColor='#FFFFFF'
                              onChangeText={(text) => setPassword2({value:text, error: ''})}
                              secureTextEntry={!retryPasswordEye}
                              button={() => <FontAwesomeIcon icon={faEye} color={theme.colors.tint} size={24}/>}
                              buttonFunc={() => setRetryPasswordEye(!retryPasswordEye)}
                          />

                          <View style={styles.switchContainer}>
                              <Text style={styles.switchText}>???? ???? ???????????????????????</Text>
                              <ReligiousSwitch religious={religious} setReligious={setReligious}/>
                          </View>
                          <TouchableOpacity
                              style={styles.button}
                              onPress={onSignupPressed}>
                            <Text style={styles.buttonText}>????????????????????????????????????</Text>
                          </TouchableOpacity>
                     </View>

                     <View style={styles.accountContainer}>
                         <Text style={styles.haveAccount}>?? ???????? ?????? ???????? ????????????</Text>

                         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                             <Text style={styles.login}>??????????</Text>
                         </TouchableOpacity>

                     </View>
                 </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: normalize(20),
        marginTop: normalize(80),
    },
    image: {
       width: normalize(380),
       height: '100%',
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderRadius: normalize(5),
        borderColor: '#FFFFFF',
        borderWidth: 1,
        marginVertical: normalize(10),
        marginHorizontal: normalize(16),
        height: normalize(45),
        paddingHorizontal: normalize(20),
        fontSize: normalize(15),
        lineHeight: normalize(18),
        color: '#FFFFFF'
    },
    button: {
        backgroundColor: '#FFFFFF',
        marginVertical: normalize(10),
        marginHorizontal: normalize(16),
        height: normalize(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(5),
        borderColor: '#FFFFFF',
        borderWidth: 1,
    },
    buttonText: {
        fontSize: normalize(15),
        lineHeight: normalize(18),
        color: '#494949',
    },
    welcome: {
        color: '#FFFFFF',
        fontSize: normalize(25),
        lineHeight: normalize(30),
        fontWeight: '500',
    },
    appName: {
        color: '#FFFFFF',
        fontSize: normalize(45),
        lineHeight: normalize(55),
        fontWeight: 'bold',
    },
    register: {
        color: '#FFFFFF',
        fontSize: normalize(20),
        lineHeight: normalize(24),
        fontWeight: '500',
        marginVertical: normalize(10),
        marginHorizontal: normalize(16),
    },
    haveAccount: {
        color: '#FFFFFF',
        fontSize: normalize(15),
        lineHeight: normalize(18),
        fontWeight: '500',
    },
    login: {
        color: '#FFFFFF',
        fontSize: normalize(15),
        lineHeight: normalize(18),
        fontWeight: '500',
        textDecorationLine: 'underline',
        paddingBottom: 60
    },
    accountContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(50),
    },
    inputs: {
        marginTop: normalize(50),
    },
    error: {
        width: '100%',
        height: 40,
        backgroundColor: 'rgba(244, 13, 13, 0.05)',
        marginTop: '5%',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#F40D0D',
        paddingTop: 7,
    },
    switchContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    switchText: {
        fontSize: normalize(15),
        lineHeight: normalize(18),
        color: '#FFFFFF',
    }
})
