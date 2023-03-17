import messaging from '@react-native-firebase/messaging';
import { setFcmToken } from '../store/reducers/userReducer';
import { store } from '../store/store';
import helpers from '../utils/helpers';
import { navigate } from './nav.service';

export let SOCKET: any = null;

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled)
    getFcmToken();
}

const getFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      store.dispatch(setFcmToken(fcmToken));
    }
  } catch (error: any) {
    console.log('error', error)
    helpers.showToastFail(error.message)
  }
}

const notificationResponse = async (remoteMessage: any) => {
  if (remoteMessage) {
    if (remoteMessage.data.type === 'following') {
      navigate('UserDetails', { item: remoteMessage.data.userId });
    } else if (remoteMessage.data.type === 'commentPosting') {
      navigate('PostViewScreen', { postId: remoteMessage.data.postingId, comment: true });
    } else if (remoteMessage.data.type === 'likePosting') {
      navigate('PostViewScreen', { postId: remoteMessage.data.postingId, comment: false });
    } else if (remoteMessage.data.type === 'followRequest') {
      navigate('Notifications', {});
    }
  }
}

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(notificationResponse);

  messaging().onMessage(notificationResponse)
  messaging()
    .getInitialNotification()
    .then(notificationResponse);
}