import { getChannel } from '../api/channel';
import PostureDevice from './PostureDevice';

class PostureDataRecorder {

  constructor() {
    this.isRecording = false;
    this.isStarted = false;
    this.isRecordingNewPart = false;
    this.sequenceNumber = 0;
    this.allData = [];
    this.tempData = [];
    this.mode = null;

    getChannel('posture:record').then(this.handleChannel.bind(this));
  }

  handleChannel(channel) {
    this.channel = channel;
    this.channel.join();

    this.handleDataNotification = this.handleDataNotification.bind(this);
    PostureDevice.on('posture:notification', this.handleDataNotification);
    PostureDevice.start();
  }

  handleDataNotification(data) {
    if (this.isRecording) {
      this.sequenceNumber++;

      let dataPackage = {
        data,
        sequenceNumber: this.sequenceNumber
      };

      if (this.isRecordingNewPart) {
        this.tempData.push(dataPackage);

        if (this.checkPartEnd()) {
          this.stopNewPart();
        }
      }
    }
  }

  checkPartEnd() {
    switch (this.mode) {
      case 'dynamic_short':
        return this.tempData.length >= 8;
      case 'dynamic_long':
        return this.tempData.length >= 16;
      case 'static':
        return this.tempData.length >= 80;
      default:
        return false;
    }
  }

  start(config, mode='static') {
    if (this.isRecording) {
      return;
    }

    switch (mode) {
      case 'dynamic_short':
      case 'dynamic_long':
      case 'static':
        this.mode = mode;
        break;
      default:
        this.mode = 'static';
        break;
    }

    this.allData = [];
    this.tempData = [];
    this.isStarted = true;
    this.isRecording = true;
    this.channel.push('start', config);
  }

  startNewPart(callback) {
    if (!this.isRecording) {
      callback('falied');
    }
    this.tempData = [];
    this.isRecordingNewPart = true;
    this.onNewPartFinishedCallback = callback;
  }

  stop() {
    this.isRecording = false;
  }

  stopNewPart() {
    this.allData.push(this.tempData);
    this.isRecordingNewPart = false;
    if (this.onNewPartFinishedCallback) {
      this.onNewPartFinishedCallback('successed');
    }
  }

  save(callback) {
    if (!this.isStarted) {
      callback('failed');
    }

    this.allData.forEach(dataList => {
      dataList.forEach(data => {
        this.channel.push('new_data', data);
      });
    });

    this.channel.push('save');
    this.reset();

    callback();
  }

  reset() {
    this.sequenceNumber = 0;
    this.stop();
    this.tempData = [];
    this.allData = [];
    this.channel.push('stop');
    this.isStarted = false;
  }

  destroy() {
    this.channel.leave();
    PostureDevice.stop();
    PostureDevice.removeListener('posture:notification', this.handleDataNotification);
  }
}

export default PostureDataRecorder;
