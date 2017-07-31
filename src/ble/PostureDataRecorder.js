import { getChannel } from '../api/channel';

class PostureDataRecorder {
  constructor(dataEmitter) {
    this.isRecording = false;
    this.isStarted = false;
    this.isRecordingNewPart = false;
    this.sequenceNumber = 0;
    this.dataEmitter = dataEmitter;
    this.tempData = [];
    this.tempSize = 0;
    this.mode = null;

    getChannel('posture:record').then(this.handleChannel.bind(this));
  }

  handleChannel(channel) {
    this.channel = channel;
    this.channel.join();
    console.log('joined channel');

    this.handleDataNotification = this.handleDataNotification.bind(this);
    this.dataEmitter.on('posture:notification', this.handleDataNotification);
  }

  handleDataNotification(data) {
    if (this.isRecording) {
      this.sequenceNumber++;

      let dataPackage = {
        data,
        sequenceNumber: this.sequenceNumber
      };

      switch (this.mode) {
        case 'static':
          this.channel.push('new_data', dataPackage);
          break;
        case 'dynamic_short':
        case 'dynamic_long':
          this.tempData.push(dataPackage);
          this.tempSize++;

          if (this.checkPartEnd()) {
            // Notify
            this.tempSize = 0;
            this.isRecordingNewPart = false;
          }
          break;
      }
    }
  }

  checkPartEnd() {
    switch (this.mode) {
      case 'dynamic_short':
        return this.tempSize >= 8;
      case 'dynamic_long':
        return this.tempSize >= 16;
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
        this.mode = 'dynamic_short';
        break;
      case 'dynamic_long':
        this.mode = 'dynamic_long';
        break;
      case 'static':
      default:
        this.mode = 'static';
    }

    this.tempData = [];
    this.isStarted = true;
    this.isRecording = true;
    this.channel.push('start', config);
  }

  startNewPart() {
    if (this.mode == 'static') {
      return false;
    }

    this.isRecordingNewPart = true;
  }

  stop() {
    this.isRecording = false;
  }

  save() {
    if (!this.isStarted) {
      throw new Error('The recorder is not started');
    }
    this.channel.push('save');
    this.reset();
  }

  reset() {
    this.sequenceNumber = 0;
    this.stop();
    this.channel.push('stop');
    this.isStarted = false;
  }

  destroy() {
    this.channel.leave();
    console.log('leaved channel');
  }
}

export default PostureDataRecorder;
