import React from 'react';
import {Platform} from 'react-native';
import AlertBoxIOS from './AlertBox.ios';
import AlertBoxAndroid from './AlertBox.android';

export default function AlertBox() {
  return (
    <>
      <AlertBoxAndroid />
    </>
  );
}
