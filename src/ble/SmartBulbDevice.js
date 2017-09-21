import { ToastAndroid } from 'react-native';
import EventEmitter from 'events';
import BleDevice from './BleDevice';

import Buffer from 'bops';
import BleManager from 'react-native-ble-manager';

const serviceId = 'fff0';
const modeCharacteristic = 'fff1';
const switchCharacteristic = 'fff2';

class SmartBulbDevice extends EventEmitter {

  constructor() {
    super();

    this.handleWriteResponse = this.handleWriteResponse.bind(this);
    this.init();
  }

  init() {
    this.isConnected = false;
    this._status = false;
  }

  async connect(deviceId) {
    await BleManager.connect(deviceId);
    ToastAndroid.show('Connected to smart bulb', ToastAndroid.SHORT);

    await BleManager.retrieveServices(deviceId);

    this.deviceId = deviceId;
    this.isConnected = true;
  }

  async _setToSwitchMode() {
    await BleManager.write(this.deviceId, serviceId, modeCharacteristic, [0x04], 1);
  }

  async turnOn() {
    if (!this.isConnected) {
      return;
    }

    await this._setToSwitchMode();
    await BleManager.write(this.deviceId, serviceId, switchCharacteristic, [0x3F], 1);
  }

  async turnOff() {
    if (!this.isConnected) {
      return;
    }

    await this._setToSwitchMode();
    await BleManager.write(this.deviceId, serviceId, switchCharacteristic, [0x00], 1);
  }

  async turnOnOrOff() {
    if (this._status) {
      await this.turnOff();
    } else {
      await this.turnOn();
    }
    this._status = !this._status;
  }

  handleWriteResponse(data) {
    console.log('write resp', data);
  }

  destroy() {
    BleDevice.removeListener('smartbulb:notification', this.handleNotification);
  }
}

export default new SmartBulbDevice();
