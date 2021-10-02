import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { theme } from "./theme";
import {normalize} from "../utils/normalize";

export default function Input({ errorText, description, ...props}) {
    return (
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            selectionColor={theme.colors.white}
            mode="outlined"
            placeholderTextColor='white'
            {...props}
            />
            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ): null}
            {errorText? <Text style={styles.error}>{errorText}</Text>: null}
        </View>
    )
}

const styles = StyleSheet.create({
    description: {
        fontSize: 13,
        color: theme.colors.secondary,
        paddingTop: -10,
        paddingHorizontal: 15
    },
    error: {
        fontSize: 13,
        color: theme.colors.error,
        marginTop: -5,
        paddingHorizontal: 15
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderRadius: normalize(5),
        borderColor: '#FFFFFF',
        marginVertical: normalize(10),
        marginHorizontal: normalize(16),
        height: normalize(45),
        fontSize: normalize(15),
        lineHeight: normalize(18),
        color: '#FFFFFF',
        paddingHorizontal: normalize(20),
        borderWidth: 1
    },
})