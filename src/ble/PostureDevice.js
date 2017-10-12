import { ToastAndroid } from 'react-native';
import EventEmitter from 'events';
import BleDevice from './BleDevice';

import Buffer from 'bops';
import BleManager from 'react-native-ble-manager';

const bandServiceId = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const bandCharacteristic = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
const beltServiceId = '1810';
const beltCharacteristic = '2a35';
const helperServiceId = '180d';
const helperCharacteristic = '2a39';

class PostureDevice extends EventEmitter {

  constructor() {
    super();

    this.handleBandNotification = this.handleBandNotification.bind(this);
    this.init();
  }

  init() {
    this.bandData = null;
    this.insoleData = null;
    this.isBandConnected = false;
    this._isStarting = false;
    this.isStarted = false;
  }

  async connect(deviceId, type) {
    try {
      await BleManager.connect(deviceId);
      let services = await BleManager.retrieveServices(deviceId);
      console.log(services);

      if (type == 'band') {
        ToastAndroid.show('Connected to band', ToastAndroid.SHORT);
        BleDevice.on('posture band:notification', this.handleBandNotification);
        this.bandDeviceId = deviceId;
        this.isBandConnected = true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  start() {
    if (!(this.isBandConnected)) {
      return false;
    }
    if (this._isStarting) {
      return false;
    }
    this._isStarting = true;

    setTimeout(this._startNotification.bind(this), 500);
  }

  async _startNotification() {
    try {
      await BleManager.startNotification(this.bandDeviceId, bandServiceId, bandCharacteristic);
      console.log('Start Band Notification');
      this.isStarted = true;
    } catch (e) {
      console.log(e);
    }
    this._isStarting = false;
  }

  stop() {
    BleManager.stopNotification(this.bandDeviceId, bandServiceId, bandCharacteristic)
      .catch((e) => console.log(e));
    this.isStarted = false;
  }

  handleBandNotification(value) {
    this.handleBandRawData(value);
    //console.log('band', value);
  }

  handleBandRawData(data) {
    if (data.length == 20) {
      this.handleInsoleData(data);
    } else if (data.length == 19) {
      this.handleBandData(data);
    }
    console.log('band', this.bandData);
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
    BleDevice.removeListener('posture band:notification', this.handleBandNotification);
  }
}

export default new PostureDevice();
