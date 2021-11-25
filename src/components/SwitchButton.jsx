import React, { useState, useEffect } from "react"
import { View, Switch } from "react-native"
import AsyncStorage from '@react-native-community/async-storage'
import { LocalScheduleNotification } from "../services/LocalPushController";
import PushNotification from "react-native-push-notification";

export default function SwitchButton({ id, time }){
    const [isEnabled, setIsEnabled] = useState(null);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)

        if(!isEnabled) {
            LocalScheduleNotification(id, 'time', time.substring(0,2), time.substring(3,5))
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