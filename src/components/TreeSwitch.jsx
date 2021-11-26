import React, { useState, useEffect } from "react"
import { View, Switch } from "react-native"
import AsyncStorage from '@react-native-community/async-storage'
import firebase from "../../config";

export default function TreeSwitch({}){
    const [isEnabled, setIsEnabled] = useState(null);
    const uid = firebase.auth().currentUser.uid

    const toggleSwitch = async () => {
        setIsEnabled(previousState => !previousState)

         await firebase.database().ref('users/' + uid)
            .update({treeVisibility: isEnabled})
    }

    const getToggle = async () => {
        const work =  await AsyncStorage.getItem('tree')
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
                AsyncStorage.setItem('tree', 'has')
            } else if(!isEnabled) {
                AsyncStorage.removeItem('tree')
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