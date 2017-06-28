import {
  NativeModules,
  NativeEventEmitter
} from 'react-native';

import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const connectedDevices = [];

const handleNotification = ({ peripheral, characteristic, value }) => {
  console.log('test');
  const zeros = (n) => {
    if (n <= 0) { return ''; }
    return '0' + zeros(n - 1);
  }

  const printArray = (arr) => (
    arr.map(item => zeros(3 - item.toString().length) + item).join(',')
  );

  if (value.length == 19)
    console.log(printArray(value));
};

const handleStopScan = () => {
  console.log('stop scan n');
};

export const connectDevice = (device) => {
  BleManager.connect(device.id)
  .then(() => {
    console.log('Connected', device.id);
    connectedDevices.push(device.id);

    BleManager.retrieveServices(device.id)
    .then((info) => {
      const serviceId = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
      const characteristic = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

      console.log(info);

      setTimeout(() => {
        BleManager.startNotification(device.id, serviceId, characteristic)
        .then(() => {
          console.log('Start Notification');
        })
        .catch((error) => {
          console.log(error);
        });
      }, 1000);
    });
  })
  .catch((error) => {
    console.log(error);
  });
}

bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleNotification);
bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
