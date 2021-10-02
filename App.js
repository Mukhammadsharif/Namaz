import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ImageBackground, Image, PermissionsAndroid } from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import  firebase from 'firebase'
import { firebaseConfig } from "./config";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext"
import Register from './src/screens/Register'
import Login from "./src/screens/Login"
import Namaz from './src/screens/Namaz'
import Qibla from "./src/screens/Qibla"
import Chat from "./src/screens/Chat"
import Holiday from "./src/screens/Holiday"
import Tree from "./src/screens/Tree"
import ChatDetail from "./src/screens/ChatDetail"
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import { normalize } from "./src/utils/normalize"
import NamazIcon from './src/assets/icons/icons8-person-kneeling-48.png'
import NamazIconActive from './src/assets/icons/icons8-man-kneeling-48.png'
import Compass from './src/assets/icons/icons8-compass-40.png'
import CompassActive from './src/assets/icons/icons8-compass.gif'
import ChatIcon from './src/assets/icons/icons8-chat-48.png'
import ChatIconActive from './src/assets/icons/icons8-chat.gif'
import CalendarIcon from './src/assets/icons/icons8-calendar-150.png'
import CalendarIconActive from './src/assets/icons/icons8-calendar.gif'
import FamilyIcon from './src/assets/icons/icons8-family-150.png'
import FamilyIconActive from './src/assets/icons/icons8-family.gif'
import {StatusBar} from "expo-status-bar";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export default function Navigation(){
    async function requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
                // alert("Can I use location?");
            } else {
                console.log("location permission denied");
                alert("Location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    useEffect(() => {
        requestLocationPermission().then(r => console.log(r))
    })

    if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
    }

    let initial = null

    firebase.auth().onAuthStateChanged((user) => {
            if(user){
                initial = 'TabScreen'
            } else {
                initial = 'Register'
            }
        })
    return (
        <SafeAreaProvider>
            {/*<StatusBar style='auto'/>*/}
            <NavigationContainer style={styles.navigation} >
                <Stack.Navigator initialRouteName={AuthLoadingScreen} screenOptions={{
                headerTitle: () => null, header: null
            }} >
                    <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="TabScreen" component={TabScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                    <Stack.Screen name="ChatDetail" component={ChatDetail} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

function TabScreen() {
    const [namazState, setNamazState] = useState(false)
    const [qiblaState, setQiblaState] = useState(false)
    const [chatState, setChatState] = useState(false)
    const [calendarState, setCalendarState] = useState(false)
    const [treeState, setTreeState] = useState(false)
    return(
        <Tab.Navigator screenOptions={{ tabBarShowLabel: true, tabBarStyle: {...styles.tabBar},
        tabBarLabelStyle: {fontSize: normalize(13), marginBottom: normalize(8)},
        header: () => null
        }}>
            <Tab.Screen name='Намаз'
                        component={Namaz}
                        listeners={{
                            tabPress: () => {
                                setNamazState(true)
                                setQiblaState(false)
                                setChatState(false)
                                setCalendarState(false)
                                setTreeState(false)
                            }
                        }}
                        options={{
                            tabBarIcon: () => (
                                 <View>
                                     <Image source={ namazState ? NamazIcon: NamazIconActive}
                                     style={{ width: 35, height: 35}}/>
                                 </View>
                            )
                        }}
            />

            <Tab.Screen name='Кибла'
                        component={Qibla}
                        listeners={{
                            tabPress: () => {
                                setNamazState(false)
                                setQiblaState(true)
                                setChatState(false)
                                setCalendarState(false)
                                setTreeState(false)
                            }
                        }}
                        options={{
                            tabBarIcon: () => (
                                 <View>
                                     <Image source={ !qiblaState ? Compass : CompassActive}
                                     style={{ width: 35, height: 35}}/>
                                 </View>
                            )
                        }}
            />

            <Tab.Screen name='Чат'
                        component={Chat}
                        listeners={{
                            tabPress: () => {
                                setNamazState(false)
                                setQiblaState(false)
                                setChatState(true)
                                setCalendarState(false)
                                setTreeState(false)
                            }
                        }}
                        options={{
                            tabBarIcon: () => (
                                 <View>
                                     <Image source={ !chatState ? ChatIcon : ChatIconActive}
                                     style={{ width: 35, height: 35}}/>
                                 </View>
                            )
                        }}
            />

            <Tab.Screen name='Праздник'
                        component={Holiday}
                        listeners={{
                            tabPress: () => {
                                setNamazState(false)
                                setQiblaState(false)
                                setChatState(false)
                                setCalendarState(true)
                                setTreeState(false)
                            }
                        }}
                        options={{
                            tabBarIcon: () => (
                                 <View>
                                     <Image source={ !calendarState ? CalendarIcon : CalendarIconActive}
                                     style={{ width: 35, height: 35}}/>
                                 </View>
                            )
                        }}
            />

            <Tab.Screen name='Дерево'
                        component={Tree}
                        listeners={{
                            tabPress: () => {
                                setNamazState(false)
                                setQiblaState(false)
                                setChatState(false)
                                setCalendarState(false)
                                setTreeState(true)
                            }
                        }}
                        options={{
                            tabBarIcon: () => (
                                 <View>
                                     <Image source={ !treeState ? FamilyIcon : FamilyIconActive}
                                     style={{ width: 35, height: 35}}/>
                                 </View>
                            )
                        }}
            />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    navigation: {
        position: 'absolute',
        bottom: 0,
        width: normalize(286),
        height: normalize(60),
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderRadius: 30,
    },
    tabBar: {
        height: normalize(65),
        borderTopEndRadius: normalize(25),
        borderTopStartRadius: normalize(25),
        fontSize: normalize(20),
    },
    imageBackground: {
        width: normalize(26),
        height: normalize(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageDetail:{
        width: normalize(12),
        height: normalize(2),
        position: 'absolute',
        backgroundColor: 'red'
    }
})