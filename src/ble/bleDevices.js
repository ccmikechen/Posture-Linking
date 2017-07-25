import {
  NativeModules,
  NativeEventEmitter
} from 'react-native';

import EventEmitter from 'events';
import BleManager from 'react-native-ble-manager';

class DeviceDataEmitter extends EventEmitter {}
const deviceDataEmitter = new DeviceDataEmitter();

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const DEVICES = [
  {
    id: 'D7:B6:30:D8:36:4D',
    type: 'posture'
  },
  {
    id: 'EC:84:B4:F9:07:64',
    type: 'posture'
  }
];

const connectedDevices = [];

const getDeviceType = (deviceId, callback) => {
  DEVICES.forEach(({ id, type }) => {
    if (id == deviceId) {
      callback(type);
    }
  });
};

const handleNotification = ({ peripheral, characteristic, value }) => {
  getDeviceType(peripheral, (type) => {
    deviceDataEmitter.emit(`${type}:notification`, value);
  });
};

const initPosture = (deviceId) => {
  const serviceId = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
  const characteristic = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

  setTimeout(() => {
    BleManager.startNotification(deviceId, serviceId, characteristic)
    .then(() => {
      console.log('Start Band Notification');
    })
    .catch((error) => {
      console.log(error);
    });
  }, 1000);
};

const initDevice = (deviceId) => {
  DEVICES.forEach(({ id, type }) => {
    if (id == deviceId) {
      switch (type) {
        case 'posture':
          initPosture(deviceId);
          break;
      }
    }
  });
};

export const connectDevice = (device) => {
  BleManager.connect(device.id)
  .then(() => {
    console.log('Connected', device.id);

    connectedDevices.push(device.id);

    BleManager.retrieveServices(device.id)
    .then((info) => {
      console.log(info);

      initDevice(device.id);
    });
  })
  .catch((error) => {
    console.log(error);
  });
};

export const on = (eventName, callback) => {
  deviceDataEmitter.on(eventName, callback);
};

export const removeListener = (eventName, callback) => {
  deviceDataEmitter.removeListener(eventName, callback);
};

export const remoteAllListeners = (eventName) => {
  deviceDataEmitter.remoteAllListeners(eventName);
};

bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleNotification);
