import n from 'react-native-normalize'
import { Dimensions } from 'react-native'

export function normalize(value, scale = false) {
    const { fontScale } = Dimensions.get('screen')
    return n(value / (scale ? fontScale : 1))
}