import api from '../src/api/poselink';

class Service {

  constructor({id, type, name, icon, classification, events}) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.icon = icon;
    this.classification = classification;
    this.events = events;
    this._isConnected = false;
    this._isStarted = false;
  }

<<<<<<< HEAD
  createAuthorizer() {

  }

  async unauthorize() {
    await api.updateUserServiceConfig(this.id, {}, 'disconnect');
    this._isConnected = false;
  }

=======
>>>>>>> add loadServiceConfigs
  connect() {
    this._isConnected = true;
  }

  isConnected() {
    return this._isConnected;
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
      throw new Error('Service is not started');
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
}


export default Service;
