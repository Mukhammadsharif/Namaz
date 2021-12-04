import React, {useState, useEffect, useContext} from "react"
import { View, Switch } from "react-native"
import AsyncStorage from '@react-native-community/async-storage'
import { LocalScheduleNotification } from "../services/LocalPushController";
import PushNotification from "react-native-push-notification";
import {MusicContext} from "../utils/context";
import Sound from 'react-native-sound'


export default function SwitchButton({ id, time }){

    Sound.setCategory('Playback');

    // let sound = new Sound('button_trigger.mp3', Sound.MAIN_BUNDLE, (error) => {
    //     if (error) {
    //         console.log('failed to load the sound', error);
    //         return;
    //     } else {
    //         sound.play()
    //     }
    // })


    const { music } = useContext(MusicContext)

    const [isEnabled, setIsEnabled] = useState(null);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)

        if(!isEnabled) {
            LocalScheduleNotification(id, 'time', time.substring(0,2), time.substring(3,5), music)


        } else if (isEnabled) {
            PushNotification.cancelLocalNotification(id)
        }
    }

    const getToggle = async () => {
        const work =  await AsyncStorage.getItem(`switch${id}`)
        if(work !== null) {
            setIsEnabled(true)
        }
    }

    useEffect(() => {
        getToggle()
    }, [])

    useEffect(() => {
        if(isEnabled !== null) {
            if(isEnabled) {
                AsyncStorage.setItem(`switch${id}`, 'has')
            } else if(!isEnabled) {
                AsyncStorage.removeItem(`switch${id}`)
            }
        }
    }, [isEnabled])

    return(
        <View>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
        </View>
    )
}