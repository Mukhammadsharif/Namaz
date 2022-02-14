import React from "react";
import { app } from '../../config'
import { ActivityIndicator } from "react-native";
import { View } from 'react-native'

export default function AuthLoadingScreen({ navigation }){

    app.auth().onAuthStateChanged((user) => {
        if(user){
            navigation.reset({
                routes: [{name: 'TabScreen' }]
            })
        } else {
            navigation.reset({
                routes: [{name: 'Login' }]
            })
        }
    })
    return (
        <View>
            <ActivityIndicator size="large"/>
        </View>

    )
}
