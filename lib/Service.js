import api from '../src/api/poselink';

class Service {

  constructor({id, type, name, icon, classification, events}) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.icon = icon;
    this.classification = classification;
    this.events = events;

    this._isAvailable = true;
    this._isConnected = false;
    this._isStarted = false;
  }

  isAvailable() {
    return this._isAvailable;
  }

  createAuthorizer() {
  }

  async unauthorize() {
    await api.updateUserServiceConfig(this.id, {}, 'disconnect');
    this._isConnected = false;
  }

  connect() {
    this._isConnected = true;
  }

  disconnect() {
    this.stop();
    this._isConnected = false;
  }

  isConnected() {
    return this._isConnected;
  }

  stop() {
    this._isStarted = false;
  }

  start() {
    if (!this._isConnected) {
      throw new Error('Service is not connected');
    }
    this._isStarted = true;
  }

  isStarted() {
    return this._isStarted;
  }

  checkStarted() {
    if (!this._isStarted) {

    }
  }

  getName() {
    return this.name;
  }

  getIcon() {
    return this.icon;
  }

  getEvents() {
    return this.events;
  }

  getEventByName(name) {
    return this.events.reduce((acc, event) => (
      event.name == name? event : acc
    ), undefined);
  }
}

export default Service;
