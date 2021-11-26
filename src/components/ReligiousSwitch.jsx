import React, { useState, useEffect } from "react"
import { View, Switch } from "react-native"
import AsyncStorage from '@react-native-community/async-storage'

export default function ReligiousSwitch({ religious, setReligious }){
    const [isEnabled, setIsEnabled] = useState(null);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        setReligious(!religious)
    }

    const getToggle = async () => {
        const work =  await AsyncStorage.getItem('religious')
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
                AsyncStorage.setItem(`religious`, 'has')
            } else if(!isEnabled) {
                AsyncStorage.removeItem('religious')
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