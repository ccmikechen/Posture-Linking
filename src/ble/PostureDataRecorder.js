import { getChannel } from '../api/channel';

class PostureDataRecorder {
  constructor(dataEmitter) {
    this.isRecording = false;
    this.isStarted = false;
    this.sequenceNumber = 0;
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
      this.sequenceNumber++;
      this.channel.push('new_data', {
        data,
        sequenceNumber: this.sequenceNumber
      });
    }
  }

  start(config) {
    if (this.isRecording) {
      return;
    }
    this.isStarted = true;
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
