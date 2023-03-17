import Toast from 'react-native-root-toast';
import React from 'react';
import { Alert, LogBox, Platform } from 'react-native';
import { THEME } from '../theme/colors';
import ActionSheet from 'react-native-actionsheet';
import { format as prettyFormat } from 'pretty-format';
import Spinner from 'react-native-loading-spinner-overlay';

export const Options = ({
  init,
  press,
  heading,
  options,
  closeIndex,
}: Partial<{
  init: any;
  heading: string;
  options: any;
  press: any;
  closeIndex: number;
}>) => {
  LogBox.ignoreAllLogs();
  return (
    <ActionSheet
      ref={init}
      title={heading}
      options={options}
      cancelButtonIndex={closeIndex}
      destructiveButtonIndex={closeIndex}
      onPress={press}
    />
  );
};

export const CustomSpinner = ({ visible }: { visible: boolean }) => {
  return (
    <Spinner
      animation={'fade'}
      cancelable={false}
      size={'large'}
      color={THEME.colors.primary}
      visible={visible}
      overlayColor="rgba(15,91,75,0.3)"
    />
  );
};

const showToast2 = (toast: any) => {
  // When Calling this function
  // call it this way: Helpers.showToast({message: "hello", hide: ()=>{alert("hello")}})
  // If you only want to show message call Helpers.showToastMessage("my message")

  const message = toast.message;
  const position = toast.position || 45;
  const duration = toast.duration || 3000;
  const show = toast.show || undefined;
  const shown = toast.shown || undefined;
  const hide = toast.hide || undefined;
  const hidden = toast.hidden || undefined;

  if (message !== undefined)
    Toast.show(message, {
      duration: duration,
      position: position,
      shadow: true,
      animation: true,
      hideOnPress: false,
      backgroundColor: THEME.colors.primary,
      delay: 0,
      onShow: () => {
        if (typeof show === 'function') show();
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
        if (typeof shown === 'function') shown();
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
        if (typeof hide === 'function') hide();
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
        if (typeof hidden === 'function') hidden();
      },
    });
};

const showToast = (toast: any) => {
  // When Calling this function
  // call it this way: Helpers.showToast({message: "hello", hide: ()=>{alert("hello")}})
  // If you only want to show message call Helpers.showToastMessage("my message")

  const message = toast.message;
  const position = toast.position || 45;
  const duration = toast.duration || 3000;
  const show = toast.show || undefined;
  const shown = toast.shown || undefined;
  const hide = toast.hide || undefined;
  const hidden = toast.hidden || undefined;

  if (message !== undefined)
    Toast.show(message, {
      duration: duration,
      position: position,
      shadow: true,
      animation: true,
      hideOnPress: false,
      backgroundColor: THEME.colors.error,
      delay: 0,
      onShow: () => {
        if (typeof show === 'function') show();
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
        if (typeof shown === 'function') shown();
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
        if (typeof hide === 'function') hide();
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
        if (typeof hidden === 'function') hidden();
      },
    });
};

const showToastFail = (message: string) => {
  if (Platform.OS === 'ios') {
    showToast({ message });
  } else {
    showToast({ message });
  }
};

const showToastSuccess = (message: string) => {
  if (Platform.OS === 'ios') {
    showToast2({ message });
  } else {
    showToast2({ message });
  }
};

export const displayAlert = (
  title: string,
  message: string,
  isCancellable: Boolean,
  okAction: any,
) => {
  Alert.alert(
    title,
    message,

    isCancellable
      ? [
        {
          text: 'Cancel',
          onPress: () => {
            okAction(false);
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            okAction(true);
          },
        },
      ]
      : [
        {
          text: 'OK',
          onPress: () => {
            okAction(true);
          },
        },
      ],
  );
};

const formateDateForSchedule = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
export const LOG = (tag: string, output: any) => {
  console.log(tag, prettyFormat(output));
};

export default {
  showToast,
  showToastFail,
  showToastSuccess,
  formateDateForSchedule
};
