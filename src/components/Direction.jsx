import React, { useState, useEffect } from 'react'
import axios from "axios";
import Geolocation from "@react-native-community/geolocation";
import {View, Text, StyleSheet} from "react-native";
import {normalize} from "../utils/normalize";

export default function Direction(){
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [direction, setDirection] = useState(null)

    const getDirection = () => {
        axios.get(` http://api.aladhan.com/v1/qibla/${latitude}/${longitude}`)
            .then(res => setDirection(res.data.data.direction))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(info =>{
        setLatitude(info.coords.latitude)
        setLongitude(info.coords.longitude)
        console.log('A')
    })
    }, [])

    useEffect(() => {
        getDirection()
    }, [longitude])

    return(
        <View>
            <Text style={styles.direction}>{Math.round(direction * 1) / 1}°</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    direction: {
        fontSize: normalize(17),
        lineHeight: normalize(21),
        fontWeight: 'bold',
        color: '#FFFFFF',
    }
})