import React, {useState} from 'react'
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {normalize} from "../utils/normalize";

export default function BirthDate({ date, setDate}) {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };

      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };

      const showDatepicker = () => {
        showMode('date');
      };
    return (
        <View>

            <View>
                <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.dateButton}
                >
                    <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker1"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
                )}
        </View>
    )
}
const styles = StyleSheet.create({
    dateButton: {
         backgroundColor: '#E5E5E5',
         height: normalize(35),
         width: normalize(100),
         justifyContent: 'center',
         alignItems: 'center'
    },
    dateText: {
         fontSize: normalize(13),
         lineHeight: 16,
         color: "#494949",
    },
})