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
      channelId: "sound_channel2", // (required)
      channelName: "Notification", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: "first.mp3",
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    // {
    //   channelId: "sound_channel2", // (required)
    //   channelName: "Notification", // (required)
    //   channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    //   playSound: true, // (optional) default: true
    //   soundName: "second.mp3",
    //   // (optional) See `soundName` parameter of `localNotification` function
    //   importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    //   vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    // },
    // {
    //   channelId: "sound_channel3", // (required)
    //   channelName: "Notification", // (required)
    //   channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    //   playSound: true, // (optional) default: true
    //   soundName: "third.mp3",
    //   // (optional) See `soundName` parameter of `localNotification` function
    //   importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    //   vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    // },
    // {
    //   channelId: "sound_channel4", // (required)
    //   channelName: "Notification", // (required)
    //   channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    //   playSound: true, // (optional) default: true
    //   soundName: "fourth.mp3",
    //   // (optional) See `soundName` parameter of `localNotification` function
    //   importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    //   vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    // },
    // {
    //   channelId: "sound_channel5", // (required)
    //   channelName: "Notification", // (required)
    //   channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    //   playSound: true, // (optional) default: true
    //   soundName: "fifth.mp3",
    //   // (optional) See `soundName` parameter of `localNotification` function
    //   importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    //   vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    // },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);


export const LocalScheduleNotification = (timeId, message, hour, minute, music) => {
    let now = new Date();
    now.setDate(now.getHours() < hour ? now.getDate() : now.getDate() + 1)
    now.setHours(hour);
    now.setMinutes(minute);
    now.setMilliseconds(0);

    let channelId
    if(music === "first") {
        channelId = ''
    } else if (music === 'second') {
        channelId = '2'
    } else if (music === 'third') {
        channelId = '3'
    } else if (music === 'fourth') {
        channelId = '4'
    } else if (music === 'fifth') {
        channelId = '5'
    }
    console.log(channelId, music)

     PushNotification.localNotificationSchedule({
      id: parseInt(timeId),
      channelId: `sound_channel${channelId}`,
      channelName: "Notification",
      message: message, // (required)
      playSound: true,
      soundName: `android.resource://com.namaz/raw/${music}`,
      // date: new Date(now), // in 60 secs
      date: new Date(Date.now() + 5 * 1000),
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      repeatTime: 1,
      repeatType: "day",// (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.

  });
     PushNotification.getScheduledLocalNotifications(
         (success) => {
             console.log(success)
         }
     )
}