import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'

export async function registerForPushNotificationsAsync() {
    let token = ''
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        if (existingStatus !== 'granted') {
            await Permissions.askAsync(Permissions.NOTIFICATIONS)
        }
        token = (await Notifications.getExpoPushTokenAsync()).data
    }
    // eslint-disable-next-line consistent-return
    return token
}
