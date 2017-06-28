import EventEmitter from 'events';
import * as BleDevices from './bleDevices';

class PostureDataEmitter extends EventEmitter {
  constructor() {
    super();
    this.handleNotification = this.handleNotification.bind(this);
    this.init();
  }

  init() {
    this.bandData = null;
    this.insoleData = null;

    BleDevices.on('posture:notification', this.handleNotification);
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
      acc: {
        x: this.parseBand3dData(data[1], data[2]),
        y: this.parseBand3dData(data[3], data[4]),
        z: this.parseBand3dData(data[5], data[6])
      },
      gyro: {
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
    return ((high << 8) | (low & 0xFF)) / 0xF000;
  }

  parseInsoleAccData(low, high) {
    return ((high << 8) | (low & 0xFF)) / 0xF000;
  }

  parseInsolePressureData(data) {
    return data & 0xFF;
  }

  checkReceivedDataAndNotify() {
    if (this.bandData && this.insoleData) {
      this.notifyPostureData();
    }
  }

  notifyPostureData() {
    this.emit('posture:notification', {
      band: this.bandData,
      leftInsole: this.insoleData.left,
      rightInsole: this.insoleData.right
    });
  }

  destroy() {
    BleDevices.removeListener('posture:notification', this.handleNotification);
  }
}

export const createPostureDataEmitter = () => {
  return new PostureDataEmitter();
};
