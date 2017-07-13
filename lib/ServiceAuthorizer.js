import EventEmitter from 'events';

class ServiceAuthorizer {
  constructor(service) {
    this.service = service;
    this.emitter = new EventEmitter();
  }

  addListener(callback) {
    this.emitter.on('success', callback);
  }

  handleSuccess(result) {
    this.emitter.emit('success', result);
  }

  removeListener() {
    this.emitter.removeAllListeners();
  }

  authorize() {
    
  }

}

export default ServiceAuthorizer;