import { ToastAndroid } from 'react-native';
import EventEmitter from 'events';
import BleDevice from './BleDevice';

import Buffer from 'bops';
import BleManager from 'react-native-ble-manager';

const serviceId = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const characteristic = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

class PostureDevice extends EventEmitter {

  constructor() {
    super();

    this.handleNotification = this.handleNotification.bind(this);
    this.init();
  }

  init() {
    this.bandData = null;
    this.insoleData = null;
    this.isConnected = false;
  }

  async connect(deviceId) {
    await BleManager.connect(deviceId);
    ToastAndroid.show('Connected to band', ToastAndroid.SHORT);

    await BleManager.retrieveServices(deviceId);

    BleDevice.on('posture:notification', this.handleNotification);
    this.deviceId = deviceId;
    this.isConnected = true;
  }

  start() {
    if (!this.isConnected) {
      return false;
    }

    setTimeout(() => {
      BleManager.startNotification(this.deviceId, serviceId, characteristic)
      .then(() => {
        console.log('Start Notification');
      })
      .catch((error) => {
        console.log(error);
      });
    }, 1000);
  }

  stop() {
    BleManager.stopNotification(this.deviceId, serviceId, characteristic)
      .catch((e) => console.log(e));
  }

  handleNotification(value) {
    this.handleRawData(value);
  }

  handleRawData(data) {
    if (data.length == 20) {
      this.handleInsoleData(data);
    } else if (data.length == 19) {
      this.handleBandData(data);
    }

    this.checkReceivedDataAndNotify();
  }

  handleBandData(data) {
    this.bandData = {
      gyro: {
        x: this.parseBand3dData(data[1], data[2]),
        y: this.parseBand3dData(data[3], data[4]),
        z: this.parseBand3dData(data[5], data[6])
      },
      acc: {
        x: this.parseBand3dData(data[7], data[8]),
        y: this.parseBand3dData(data[9], data[10]),
        z: this.parseBand3dData(data[11], data[12])
      },
      magneto: {
        x: this.parseBand3dData(data[13], data[14]),
        y: this.parseBand3dData(data[15], data[16]),
        z: this.parseBand3dData(data[17], data[18])
      }
    }
  }

  handleInsoleData(data) {
    this.insoleData = {
      left: {
        x: this.parseInsoleAccData(data[0], data[1]),
        y: this.parseInsoleAccData(data[2], data[3]),
        z: this.parseInsoleAccData(data[4], data[5]),
        a: this.parseInsolePressureData(data[6]),
        b: this.parseInsolePressureData(data[7]),
        c: this.parseInsolePressureData(data[8]),
        d: this.parseInsolePressureData(data[9])
      },
      right: {
        x: this.parseInsoleAccData(data[10], data[11]),
        y: this.parseInsoleAccData(data[12], data[13]),
        z: this.parseInsoleAccData(data[14], data[15]),
        a: this.parseInsolePressureData(data[16]),
        b: this.parseInsolePressureData(data[17]),
        c: this.parseInsolePressureData(data[18]),
        d: this.parseInsolePressureData(data[19])
      }
    };
  }

  parseBand3dData(low, high) {
    let buf = Buffer.from([low, high]);
    return Buffer.readInt16LE(buf) / 0x4000;
  }

  parseInsoleAccData(low, high) {
    let buf = Buffer.from([low, high]);
    return Buffer.readInt16LE(buf) / 0x4000;
  }

  parseInsolePressureData(data) {
    return data & 0xFF;
  }

  checkReceivedDataAndNotify() {
    if (this.bandData && this.insoleData) {
      this.notifyPostureData();
      this.bandData = null;
      this.insoleData = null;
    }
  }

  notifyPostureData() {
    this.emit('posture:notification', {
      band: this.bandData,
      insole: this.insoleData
    });
  }

  destroy() {
    BleDevice.removeListener('posture:notification', this.handleNotification);
  }
}

export default new PostureDevice();
