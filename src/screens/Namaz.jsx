import React, { useState, useEffect } from 'react'
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import axios from "axios"
import {normalize} from "../utils/normalize"
import PrayerTimeModal from "../components/PrayerTimeModal"
import Day from '../assets/images/day.png'
import Down from '../assets/images/down.png'
import Dusk from '../assets/images/dusk.png'
import Night from '../assets/images/night.png'
import Gps from '../assets/icons/gps.png'
import firebase from "../../config";


export default function Namaz(){
    const [currentHour, setCurrentHour] = useState(null)
    const [currentMinute, setCurrentMinute] = useState(null)
    const [currentAm, setCurrentAm] = useState(null)
    const [currentDay, setCurrentDay] = useState(null)
    const [currentCity, setCurrentCity] = useState(null)
    const [currentCountry, setCurrentCountry] = useState(null)
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    const [modalVisible, setModalVisible] = useState(false)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [prayTime, setPrayTime] = useState(null)


    useEffect(() => {
        console.log(firebase.auth())
    }, [])

    const getCurrentTime = () => {
        let hour = new Date().getHours()
        let minutes = new Date().getMinutes()
        let seconds = new Date().getSeconds()
        let am_pm = 'pm';

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        if (hour > 12) {
            hour = hour - 12;
        }

        if (hour === 0) {
            hour = 12;
        }

        if (new Date().getHours() < 12) {
            am_pm = 'am';
        }
        setCurrentHour(hour)
        setCurrentMinute(minutes)
        setCurrentAm(am_pm)
        days.map((item, key) => {
            if(key===new Date().getDay()){
                setCurrentDay(item.toUpperCase())
            }
        })
    }

    const handleChangeBackground = () => {
        let hour = new Date().getHours()
        if (hour >= 4 && hour < 6) {
            return Dusk
        } else if (hour >= 6 && hour < 18){
            return Day
        } else if (hour >= 18 && hour < 20) {
            return Down
        } else {
            return Night
        }
    }


    const getCityName = () => {
        const API_KEY = 'AIzaSyBIbvODfdRDkwP6U_w6nABU5Z6BIxJllqE'
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`)
            .then(res => {
                const response = res.data.plus_code.compound_code.split(' ')
                const city = response[1]
                const country = response[2]
                setCurrentCity(city.replace(',', ' '))
                setCurrentCountry(country.replace(',', ' '))

            }).catch(err => {
                console.log(err)
        })
    }

    const getPrayTime = () => {
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        axios.get(`http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=2&month=${month}&year=${year}`)
            .then(res => {
                setPrayTime(res.data.data[0].timings)
            }).catch(error => console.log(error))
    }

    // const getDhuhrTime = () => {
    //     if(prayTime) {
    //         const hour = new Date().getHours()
    //         const minutes = new Date().getMinutes()
    //         const sum = hour * 60 + minutes
    //         const dhuhrHour = prayTime.Dhuhr.substring(0,2)
    //         const dhuhrMinutes = prayTime.Dhuhr.substring(3,5)
    //         const sumDhuhr = parseInt(dhuhrHour) * 60 + parseInt(dhuhrMinutes)
    //         const day = 24 * 60
    //         const differenceTime = day - sum
    //         const differenceDhuhr = day - sumDhuhr
    //
    //         if(differenceTime < differenceDhuhr) {
    //             const difference = differenceDhuhr - differenceTime
    //             const a = difference / 60
    //             const b = difference % 60
    //             return console.log(a)
    //         } else if (differenceTime > differenceDhuhr) {
    //             console.log(differenceTime - differenceDhuhr )
    //         } else {
    //             console.log('Ok')
    //         }
    //     }
    // }

    useEffect(() => {
        let timer = setInterval(() => {
            getCurrentTime();
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        Geolocation.getCurrentPosition(info =>{
        setLatitude(info.coords.latitude)
        setLongitude(info.coords.longitude)
    })
    }, [])

    useEffect(() => {
        getCityName()
        getPrayTime()
        // return getDhuhrTime()
    }, [longitude])

    return(
        <View>
            <ImageBackground
                source={handleChangeBackground()}
                style={styles.backgroundImage}>
                <View style={styles.cityContainer}>
                    <Image source={Gps} style={styles.gpsIcon}/>
                    <Text style={styles.cityName}>{currentCity} {' ('+currentCountry+')'}</Text>
                </View>

                <View style={styles.hourContainer}>
                    <Text style={styles.hour}>
                        {currentHour < 10 ? '0' + currentHour : currentHour }
                    </Text>
                </View>

                <View style={styles.minuteContainer}>
                    <Text style={styles.minute}>{currentMinute}</Text>
                    <Text style={styles.am}>{currentAm === 'am' ? 'ДП' : 'ПП'}</Text>
                </View>

                <View style={styles.container}>
                    <View style={styles.sunrise}>
                        <Text style={styles.zukhr}>Зухр</Text>
                        <Text style={styles.comesAfter}>
                            {prayTime ? prayTime.Dhuhr.substring(0,2) <= 12 ? prayTime.Dhuhr.substring(0,5) + ' ДП'
                                    : '0' + prayTime.Dhuhr.substring(0,2) - 12 + prayTime.Dhuhr.substring(2,5) + ' ПП' : null}
                        </Text>
                        <View style={styles.comingContainer}>
                            <Text style={styles.comingText}>наступает</Text>
                        </View>
                    </View>

                    <View style={styles.asrContainer}>
                        <Text style={styles.zukhr}>Аср</Text>
                        <Text style={styles.time}>
                            {prayTime ? prayTime.Asr.substring(0,2) <= 12 ? prayTime.Asr.substring(0,5) + ' ДП'
                                    : '0' + prayTime.Asr.substring(0,2) - 12 + prayTime.Asr.substring(2,5) + ' ПП' : null}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.showAll} onPress={() => setModalVisible(true)}>
                        <Text style={styles.showAllText}>Показать все</Text>
                        <PrayerTimeModal
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            prayTime={prayTime}
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
       width: normalize(380),
       height: normalize(730),
    },
    container: {
        justifyContent: 'center',
        marginHorizontal: normalize(15),
        position: 'absolute',
        bottom: normalize(95),

    },
    sunrise:{
       width: normalize(350),
       height: normalize(40),
       borderRadius: normalize(5),
       backgroundColor: '#FFFFFF',
       flexDirection: 'row',
       alignItems: 'center'
    },
    comingContainer:{
        width: normalize(80),
        height: normalize(20),
        borderRadius: normalize(3),
        backgroundColor: '#93A1E6',
        alignItems: 'center',
        marginHorizontal: normalize(20)
    },
    zukhr:{
        fontSize: normalize(15),
        color: '#494949',
        lineHeight: normalize(18),
        fontWeight: 'bold',
        marginLeft: normalize(10)
    },
    comesAfter:{
        fontSize: normalize(15),
        color: '#494949',
        lineHeight: normalize(18),
        fontWeight: '600',
        marginLeft: normalize(150)
    },
    comingText:{
        fontSize: normalize(12),
        color: '#FFFFFF',
        lineHeight: normalize(15),
        fontWeight: '600',
        marginTop: normalize(4)
    },
    asrContainer:{
        width: normalize(350),
        height: normalize(40),
        borderRadius: normalize(5),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: normalize(10),
    },
    time:{
         fontSize: normalize(15),
        color: '#494949',
        lineHeight: normalize(18),
        fontWeight: '600',
        marginLeft: normalize(260)
    },
    showAll:{
        width: normalize(350),
        height: normalize(40),
        borderRadius: normalize(5),
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: normalize(10),
    },
    showAllText: {
        fontSize: normalize(15),
        lineHeight: normalize(18),
        color: '#344181',
        fontWeight: 'bold',
    },
    hour: {
        fontWeight: 'bold',
        fontSize: normalize(80),
        lineHeight: normalize(98),
        letterSpacing: 0.07,
        color: '#FFFFFF',
        textShadowColor: 'rgba(16, 40, 120, 0.21)',
    },
    minute: {
        fontWeight: 'bold',
        fontSize: normalize(80),
        lineHeight: normalize(98),
        letterSpacing: 0.07,
        color: '#FFFFFF',
        textShadowColor: 'rgba(16, 40, 120, 0.21)',
    },
    am: {
        fontWeight: 'bold',
        fontSize: normalize(20),
        lineHeight: normalize(24),
        letterSpacing: 0.07,
        color: '#FFFFFF',
        textShadowColor: 'rgba(16, 40, 120, 0.21)',
        marginTop: normalize(50),
        marginLeft: normalize(10)
    },
    hourContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(150)
    },
    minuteContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: normalize(35)
    },
    gpsIcon: {
        width: normalize(13),
        height: normalize(17),
    },
    cityName: {
        fontSize: normalize(17),
        lineHeight: normalize(21),
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: normalize(10)
    },
    cityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: normalize(20)
    }

})