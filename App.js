import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, PermissionsAndroid, AppState } from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from "@react-navigation/stack"
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
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen"
import Profile from "./src/screens/Profile";
import UserFamilyScreen from './src/screens/UserFamilyScreen'
import { normalize } from "./src/utils/normalize"
import Papyrus from './src/assets/icons/papyrus.png'
import PapyrusActive from './src/assets/icons/papyrusActive.png'
import Compass from './src/assets/icons/icons8-compass-40.png'
import CompassActive from './src/assets/icons/icons8-compass.gif'
import ChatIconActive from './src/assets/icons/chat-bubble.png'
import ChatIcon from './src/assets/icons/chat-bubbleActive.png'
import CalendarIcon from './src/assets/icons/icons8-calendar-150.png'
import CalendarIconActive from './src/assets/icons/icons8-calendar.gif'
import FamilyIcon from './src/assets/icons/icons8-family-150.png'
import FamilyIconActive from './src/assets/icons/icons8-family.gif'
import {StatusBar} from "expo-status-bar";
import {MusicContext, music, value, GlobalProvider} from "./src/utils/context";
import firebase from 'firebase/compat'
import { LogBox } from 'react-native'
import recorderPermission from './recorderPermission'

LogBox.ignoreLogs(['Setting a timer for a long period of time, i.e. multiple minutes, is a ' +
  'performance and correctness issue on Android as it keeps the timer ' +
  'module awake, and timers can only be called when the app is in the foreground. ' +
  'See https://github.com/facebook/react-native/issues/12981 for more info.'])
LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be ins\n' +
'talled and imported from \'@react-native-community/async-storage\' instead of \'react-native\'. See https://github.com/react-native-community/async-storage'])


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export default function Navigation(){

    const [religious, setReligious] = useState(true)

    async function requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
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
        recorderPermission().then(r => console.log(r))
    }, [])

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
        <GlobalProvider>
            {/*<StatusBar style='auto'/>*/}
            <NavigationContainer style={styles.navigation} >
                <Stack.Navigator initialRouteName={AuthLoadingScreen} screenOptions={{
                    headerTitle: () => null, header: null
                }} >
                    <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="TabScreen" options={{ headerShown: false }} >
                        {props => (<TabScreen {...props} religios={religious}/>)}
                    </Stack.Screen>
                    <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                    <Stack.Screen name="ChatDetail" component={ChatDetail} options={{ headerShown: false }} />
                    <Stack.Screen name="Profile" options={{ headerShown: false }}>
                         {props => (<Profile {...props} religious={religious} setReligious={setReligious}/>)}
                    </Stack.Screen>
                    <Stack.Screen name="UserFamilyScreen" component={UserFamilyScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </GlobalProvider>
    )
}

function TabScreen({ religios }) {
    const [namazState, setNamazState] = useState(false)
    const [qiblaState, setQiblaState] = useState(false)
    const [chatState, setChatState] = useState(false)
    const [calendarState, setCalendarState] = useState(false)
    const [treeState, setTreeState] = useState(false)
    const [user, setUser] = useState(null)
    firebase.auth().onAuthStateChanged((user) => {
        setUser(user)
        console.log(user, 'user')
    })

    return(
        <Tab.Navigator screenOptions={{ tabBarShowLabel: true, tabBarStyle: {...styles.tabBar},
            tabBarLabelStyle: {fontSize: normalize(13), marginBottom: normalize(8)},
            header: () => null
        }}>
            {religios ? (
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
                                     <Image source={ namazState ? Papyrus: PapyrusActive}
                                     style={{ width: 35, height: 35}}/>
                                 </View>
                            )
                        }}
            />

            ) : null }
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

            {user ? (
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

            ) : null}

            {religios ? (
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
            ) : null }

            {user ? (
                <Tab.Screen name='Древо'
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

            ) : null}
        </Tab.Navigator>
    )
}

function MyDrawer() {
      return (
        <Drawer.Navigator>
          <Drawer.Screen name="Feed" component={Chat} />
          <Drawer.Screen name="Article" component={Tree} />
        </Drawer.Navigator>
      );
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
