import React, { useState, useEffect } from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import Gps from "../assets/icons/gps.png";
import {normalize} from "../utils/normalize";

export default function Location(){
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)


    useEffect(() => {
        Geolocation.getCurrentPosition(info =>{
        setLatitude(info.coords.latitude)
        setLongitude(info.coords.longitude)
    })
    },[])
    return(
        <View>
            <View style={{flexDirection: 'row', marginLeft: normalize(15)}}>
                <Image source={Gps} style={styles.gpsIcon}/>
                <Text style={styles.currentLocation}>Текущее местоположение</Text>
            </View>
            <Text style={styles.location}>{longitude + ' с.ш., '} {latitude + ' в.д'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    gpsIcon: {
        width: normalize(14),
        height: normalize(17),
    },
    currentLocation: {
        fontSize: normalize(17),
        lineHeight: normalize(21),
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: normalize(10)
    },
    location: {
        fontSize: normalize(17),
        lineHeight: normalize(21),
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: normalize(5)
    }

})