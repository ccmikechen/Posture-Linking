import { getChannel } from '../api/channel';

class PostureDataRecorder {
  constructor(dataEmitter) {
    this.isRecording = false;
    this.isStarted = false;
    this.dataEmitter = dataEmitter;

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
    this.channel.leave();
    console.log('leaved channel');
  }
}

export default PostureDataRecorder;
