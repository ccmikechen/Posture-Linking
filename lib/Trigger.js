import Service from './Service';
import EventEmitter from 'events';

class Trigger extends Service {

  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.registeredCombinations = [];
  }

  start() {
    super.start();
    this.emitter = new EventEmitter();
  }

  register(combinationId, eventId, callback) {
    super.checkStarted();

    this.emitter.on(`${this.name}:${eventId}:trigger`, callback);
    this.registeredCombinations.push({ combinationId, callback });

    return callback;
  }

  cancelRegistration(id, eventId, callback) {
    super.checkStarted();
    console.log('cancel', id, eventId, callback);
    let filteredCombinations = this.registeredCombinations
          .filter(({ combinationId }) => {
      if (combinationId == id) {
        this.emitter.removeListener(`${this.name}:${eventId}:trigger`, callback);
        return false;
      } else {
        return true;
      }
    });

    this.registeredCombinations = filteredCombinations;
  }

  trigger(eventId, payload) {
    super.checkStarted();

    this.emitter.emit(`${this.name}:${eventId}:trigger`, payload);
  }

  destroy() {
    if (this._isStarted) {
      this.emitter.removeAllListeners();
      this._isStarted = false;
    }
  }
}

export default Trigger;
