import PushNotification, { Importance } from 'react-native-push-notification'

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification)
  },
    popInitialNotification: true,
    requestPermissions: true
})

PushNotification.createChannel(
    {
      channelId: "1", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

export const LocalNotification = () => {
      PushNotification.localNotification({
        autoCancel: true,
        bigText: 'This is local notification demo in React Native app. Only shown, when expanded.',
        subText: 'Local Notification Demo',
        title: 'Local Notification Title',
        message: 'Expand me to see more',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        actions: '["Yes", "No"]',
        channelId: '1'
      })
}

export const LocalScheduleNotification = (timeId, message, hour, minute) => {
    let now = new Date();
    now.setDate(now.getHours() < hour ? now.getDate() : now.getDate() + 1)
    now.setHours(hour);
    now.setMinutes(minute);
    now.setMilliseconds(0);

     PushNotification.localNotificationSchedule({

      id: parseInt(timeId),
      channelId: "1",
      message: message, // (required)
      date: new Date(now), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      repeatTime: 1,
      repeatType: "day",// (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
  });
     PushNotification.getScheduledLocalNotifications(
         (success) => {console.log(success)}
     )
}