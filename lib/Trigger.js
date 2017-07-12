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

  register(combinationId, callback) {
    super.checkStarted();

    this.emitter.on(`${this.name}:trigger`, callback);
    this.registeredCombinations.push({ combinationId, callback });

    return callback;
  }

  cancelRegistration(id, callback) {
    super.checkStarted();

    let filteredCombinations = this.registeredCombinations
          .filter(({ combinationId }) => {
            if (combinationId == id) {

              console.log(callback);
        this.emitter.removeListener(`${this.name}:trigger`, callback);
        return false;
      } else {
        return true;
      }
    });

    this.registeredCombinations = filteredCombinations;
  }

  trigger(payload) {
    super.checkStarted();

    console.log('trigger', `${this.name}:trigger`, payload);
    this.emitter.emit(`${this.name}:trigger`, payload);
  }

  destroy() {
    if (this.isStarted) {
      this.emitter.removeAllListeners();
      this.isStarted = false;
    }
  }
}

export default Trigger;
