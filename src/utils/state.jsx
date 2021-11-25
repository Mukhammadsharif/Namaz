import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export function usePersistState(key, defaultValue) {
    const [value, setValue] = useState('')
    const [state, setState] = useState(() => {
        AsyncStorage.getItem(key).then((item) => {
            setValue(item)
        })
        try {
            return JSON.parse(value) || defaultValue
        } catch (e) {
            return value || defaultValue
        }
    })
    useEffect(() => {
        const val = typeof state === 'object' ? JSON.stringify(state) : state
        AsyncStorage.setItem(key, val)
    }, [key, state])
    return [state, setState]
}
