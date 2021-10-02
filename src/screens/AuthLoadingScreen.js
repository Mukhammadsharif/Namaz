import React from "react";
import Background from "../components/Background";
import firebase from "firebase/app";
import { ActivityIndicator } from "react-native";

export default function AuthLoadingScreen({ navigation }){

    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            navigation.reset({
                routes: [{name: 'Map' }]
            })
        } else {
            navigation.reset({
                routes: [{name: 'StartScreen' }]
            })
        }
    })
    return (
        <Background>
            <ActivityIndicator size="large"/>
        </Background>
    )
}