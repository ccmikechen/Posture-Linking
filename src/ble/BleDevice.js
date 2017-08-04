import {
  NativeModules,
  NativeEventEmitter
} from 'react-native';

import EventEmitter from 'events';
import BleManager from 'react-native-ble-manager';

import PostureDevice from './PostureDevice';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const DEVICES = [
  {
    id: 'D7:B6:30:D8:36:4D',
    type: 'posture'
  }, {
    id: 'EC:84:B4:F9:07:64',
    type: 'posture'
  }
];

class BleDevice extends EventEmitter {

  constructor() {
    super();

    this.initSubscriptions();
  }

  initSubscriptions() {
    this.handleNotification = this.handleNotification.bind(this);
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);

    this.bleSubscriptions = [
      bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleNotification),
      bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral),
      bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan)
    ];
  }

  async connect(device) {
    let deviceInfo = await this.getDeviceInfo(device.id);
    if (!deviceInfo) {
      return 'failed';
    }

    switch (deviceInfo.type) {
      case 'posture':
        await PostureDevice.connect(deviceInfo.id);
        return 'successed';
        break;
      default:
        return 'failed';
    }
  }

  handleNotification({ peripheral, characteristic, value }) {
    this.getDeviceInfo(peripheral).then((deviceInfo) => {
      if (deviceInfo) {
        this.emit(`${deviceInfo.type}:notification`, value);
      }
    });
  }

  handleDiscoverPeripheral(peripheral) {
    this.emit('discoverDevice', peripheral);
  }

  handleStopScan() {
    this.emit('stopScan');
  }

  getDeviceInfo(deviceId) {
    return new Promise((resolve, reject) => {
      let result = DEVICES.reduce((acc, deviceInfo) => (
        deviceId == deviceInfo.id? deviceInfo : acc
      ), null);

      resolve(result);
    });
  };

  async startScan(timeout) {
    await BleManager.scan([], timeout, false);
  }

  stopScan() {

  }

  destroy() {
    this.removeAllListeners();
    this.bleSubscriptions.forEach(subscription => {
      subscription.remove();
    });
  }
}

export default new BleDevice();
