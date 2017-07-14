import EventEmitter from 'events';

class ServiceAuthorizer {
  constructor(service) {
    this.service = service;
    this.emitter = new EventEmitter();
  }

  addListener(successCallback, failedCallback) {
    this.emitter.on('success', successCallback);
    this.emitter.on('failed', failedCallback);
  }

  handleFailed() {
    this.emitter.emit('failed');
  }

  handleSuccess() {
    this.emitter.emit('success');
  }

  removeListener() {
    this.emitter.removeAllListeners();
  }

  authorize() {
    // Should be implemented
  }
}

export default ServiceAuthorizer;
