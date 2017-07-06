import { getChannel } from '../api/channel';

class PostureDataRecorder {
  constructor(dataEmitter) {
    this.isRecording = false;
    this.isStarted = false;

    this.handleDataNotification = this.handleDataNotification.bind(this);
    this.dataEmitter = dataEmitter;
    dataEmitter.on('posture:notification', this.handleDataNotification);

    this.channel = getChannel('posture:record');
    this.channel.join();

    this.channel.push('ping');
  }

  handleDataNotification(data) {
    if (this.isRecording) {
      this.channel.push('new_data', data);
    }
  }

  start(config) {
    if (this.isStarted) {
      return;
    }
    this.bufferedDataList = [];
    this.started = true;
    this.isRecording = true;
    this.channel.push('start', config);
  }

  stop() {
    this.isRecording = false;
  }

  save() {
    if (!this.isStarted) {
      throw new Error('The recorder is not started');
    }
    this.stop();
    this.started = false;
    this.channel.push('save');
  }

  destroy() {
    this.dataEmitter.removeListener('posture:notification', this.handleDataNotification);
    this.channel.leave();
  }
}

export default PostureDataRecorder;
