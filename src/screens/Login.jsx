import React, {useEffect, useState} from 'react'
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Image, Platform } from 'react-native'
import TextInput from "../components/TextInput";
import { normalize } from "../utils/normalize"
import BackgroundImage  from '../assets/images/backgroud.png'
import Apple from '../assets/icons/apple.png'
import Google from '../assets/icons/google.png'
import emailValidator from "../helpers/emailValidator";
import passwordValidator from "../helpers/passwordValidator";
import { loginUser, googleSignIn } from "../../api/auth-api";
import firebase from "firebase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {theme} from "../components/theme";

export default function Login({ navigation }){
    const [email, setEmail] = useState({value: '', error: ''})
    const [password, setPassword] = useState({value: '', error: ''})
    const [loading, setLoading] = useState(false)
    const [passwordEye, setPasswordEye] = useState(false)
    const [data, setData] = useState(null)

    const onLoginPressed = async () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({...email, error: emailError})
            setPassword({...password, error:passwordError})
        }
        setLoading(true)
        const response = await loginUser({
            email: email.value,
            password: password.value
        })
        if (response.error){
            alert(response.error)
        } else {
            navigation.navigate('TabScreen')
        }
        setLoading(false)
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '528049907815-m2n3r6q10ht8loopv0opurqc6cirt40v.apps.googleusercontent.com',
            offlineAccess: true
        })
    }, [])


    useEffect(() => {
        if(data !== null) {
            if(data.additionalUserInfo.isNewUser) {
                firebase.database().ref('users/').child(data.user.uid).set({
                    id: data.user.uid,
                    name: data.additionalUserInfo.profile.given_name,
                    email: data.additionalUserInfo.profile.email,
                    phone: data.user.phoneNumber,
                    family_id: data.user.uid,
                    image: data.user.photoURL,
                    status: false,
                    treeVisibility: false,
                    visibility: false,
                })
            }
            navigation.navigate('TabScreen')
        }
    }, [data])
    return(
        <View>
             <ImageBackground source={BackgroundImage} style={styles.image}>
                 <View style={styles.container}>
                     <Text style={styles.welcome}>Добро пожаловать</Text>
                     <Text style={styles.appName}>в Намаз</Text>
                 </View>

                 <View style={styles.inputs}>
                     <Text style={styles.loginText}>Войти</Text>
                      <TextInput
                          placeholder='Email'
                          placeholderTextColor='#FFFFFF'
                          onChangeText={(text) => setEmail({value:text, error: ''})}
                          value={email.value}
                          error={email.error}
                          errorText={email.error}
                      />
                       <TextInput
                          placeholder='Пароль'
                          placeholderTextColor='#FFFFFF'
                          onChangeText={(text) => setPassword({value:text, error: ''})}
                          value={password.value}
                          error={password.error}
                          errorText={password.error}
                          secureTextEntry={!passwordEye}
                          button={() => <FontAwesomeIcon icon={faEye} color={theme.colors.tint} size={24}/>}
                          buttonFunc={() => setPasswordEye(!passwordEye)}
                      />
                      <TouchableOpacity
                          style={styles.button}
                          onPress={onLoginPressed}>
                        <Text style={styles.buttonText}>Войти</Text>
                      </TouchableOpacity>
                 </View>

                 <View style={styles.registerWithContainer}>
                     <TouchableOpacity
                          style={styles.registerWithGoogle}
                          onPress={() => {
                              googleSignIn()
                                  .then(response => setData(response))
                          }}>
                         <Text style={styles.buttonText}>Войти при помощи</Text>
                         <Image source={Google} style={styles.logo}/>
                     </TouchableOpacity>

                     {Platform.OS === 'Android' ? (
                         <TouchableOpacity
                              style={styles.registerWithApple}
                              onPress={() => console.log('Pressed')}>
                              <Text style={styles.buttonTextApple}>Войти при помощи</Text>
                              <Image source={Apple} style={styles.logo}/>
                         </TouchableOpacity>
                     ) : null}
                 </View>

                 <View style={styles.accountContainer}>
                     <Text style={styles.haveNotAccount}>У меня нет аккаунта</Text>
                     <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                         <Text style={styles.register}>Зарегистрироваться</Text>
                     </TouchableOpacity>
                 </View>
             </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: normalize(20),
        marginTop: normalize(80),
    },
    image: {
       width: normalize(380),
       height: normalize(730),
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
    buttonTextApple: {
        fontSize: normalize(15),
        lineHeight: normalize(18),
        color: '#FFFFFF',
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
    loginText: {
        color: '#FFFFFF',
        fontSize: normalize(20),
        lineHeight: normalize(24),
        fontWeight: '500',
        marginVertical: normalize(10),
        marginHorizontal: normalize(16),
    },
    haveNotAccount: {
        color: '#FFFFFF',
        fontSize: normalize(15),
        lineHeight: normalize(18),
        fontWeight: '500',
    },
    register: {
        color: '#FFFFFF',
        fontSize: normalize(15),
        lineHeight: normalize(18),
        fontWeight: '500',
        textDecorationLine: 'underline'
    },
    accountContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(40),
    },
    inputs: {
        marginTop: normalize(50),
    },
    logo: {
        width: normalize(26),
        height: normalize(26),
        marginLeft: normalize(15),

    },
    registerWithGoogle: {
        backgroundColor: '#FFFFFF',
        marginVertical: normalize(10),
        marginHorizontal: normalize(16),
        height: normalize(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(5),
        borderColor: '#FFFFFF',
        borderWidth: 1,
        flexDirection: 'row',
    },
    registerWithApple: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        marginVertical: normalize(10),
        marginHorizontal: normalize(16),
        height: normalize(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(5),
        borderColor: '#FFFFFF',
        borderWidth: 1,
        flexDirection: 'row',
    },
    registerWithContainer: {
        marginTop: normalize(80),
    }
})