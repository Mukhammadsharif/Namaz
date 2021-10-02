import React, {useState} from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars'
import HolidayModal from "../components/HolidayModal";
import {normalize} from "../utils/normalize";

export default function Holiday(){
    const [modalVisible, setModalVisible] = useState(false)

    LocaleConfig.locales['ru'] = {
      monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
      monthNamesShort: ['Янв.','Фев.','Мар.','Апр.','Май','Июн.','Июл.','Авг.','Сен.','Окт.','Ноя.','Дек.'],
      dayNames: ['Воскресенье', 'Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
      dayNamesShort: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
      today: 'Aujourd\'hui'
    };
    LocaleConfig.defaultLocale = 'ru'

    return(
        <View>
            <Calendar
              markingType={'period'}
              markedDates={{
                '2021-08-19': {marked: true, dotColor: '#50cebb'},
                '2021-08-20': {marked: true, dotColor: '#50cebb'},
                '2021-08-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
                '2021-08-22': {color: '#70d7c7', textColor: 'white'},
                '2021-08-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
                '2021-08-24': {color: '#70d7c7', textColor: 'white'},
                '2021-08-25': {endingDay: true, color: '#50cebb', textColor: 'white'}
              }}
              // style={{backgroundColor: '#344181'}}
            />

            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{justifyContent: 'center', alignItems: 'center', marginTop: normalize(20)}}
            >
                <Text style={styles.holiday}>
                    Праздники
                </Text>
                <HolidayModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    holiday: {
        color: '#494949',
        fontSize: normalize(17),
        fontWeight: 'bold',
        lineHeight: normalize(21)
    }
})