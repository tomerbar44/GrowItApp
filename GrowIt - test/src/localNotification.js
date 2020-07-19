import { Notifications } from 'expo';

export function setNotification(title, body, imgUrl, time) {
  const localNotification = {
    title,
    body,
    ios: {
      sound: true
    },
    android: {
      sound: true,
      icon: imgUrl,
      priority: 'high',
      sticky: false, 
      vibrate: true 
    }
  };

  const t = new Date().getTime() + time;
  const schedulingOptions = {
    time: t 
  };
  return Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
}

export function cancelScheduledNotification(notificationId) {
  Notifications.cancelScheduledNotificationAsync(notificationId)
    .then(() => console.log('success to cancel !'))
    .catch((e) => console.log('failed to cancel ' + e));
}
