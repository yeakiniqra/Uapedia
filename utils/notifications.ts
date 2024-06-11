import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const requestPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
};

export const scheduleDateNotification = async (date: string, title: string, body: string) => {
  const trigger = new Date(date);
  trigger.setHours(9, 0, 0); // Schedule for 9 AM on the specified date

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
    },
    trigger: {
      date: trigger,
    },
  });
};
