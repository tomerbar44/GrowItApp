import { Notifications } from 'expo';

export function setNotification(title, body, imgUrl, time) {
  const localNotification = {
    title,
    body, // (string) — body text of the notification.
    ios: {
      // (optional) (object) — notification configuration specific to iOS.
      sound: true // (optional) (boolean) — if true, play a sound. Default: false.
    },
    // (optional) (object) — notification configuration specific to Android.
    android: {
      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      //icon (optional) (string) — URL of icon to display in notification drawer.
      icon: imgUrl,
      //color (optional) (string) — color of the notification icon in notification drawer.
      priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
      vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
      // link (optional) (string) — external link to open when notification is selected.
    }
  };

  const t = new Date().getTime() + time;
  // t.setSeconds(t.getSeconds() + time);
  const schedulingOptions = {
    time: t // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
    // repeat: 'minute'
  };

  return Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
}

export function cancelScheduledNotification(notificationId) {
  Notifications.cancelScheduledNotificationAsync(notificationId)
    .then((data) => console.log('success to cancel !!' + data))
    .catch((e) => 'failed to cancel ' + e);
}
