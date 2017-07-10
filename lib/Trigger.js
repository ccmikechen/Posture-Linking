import Service from './Service';
import EventEmitter from 'events';

class Trigger extends Service {

  constructor(props) {
    super(props);
    this.register = this.register.bind(this);

    this.emitter = new EventEmitter();
    this.registeredCombinations = [];
  }

  register(combinationId, callback) {
    this.emitter.on(`${this.name}:trigger`, callback);
    this.registeredCombinations.push({ combinationId, callback });

    return callback;
  }

  cancelRegistration(id, callback) {
    let filteredCombinations = this.registeredCombinations.filter(({ combinationId }) => {
      if (combinationId == id) {
        this.emitter.removeListener(`${combination.name}:trigger`, callback);
        return false;
      } else {
        return true;
      }
    });

    this.registeredCombinations = filteredCombinations;
  }

  trigger(payload) {
    console.log('trigger', `${this.name}:trigger`, payload);
    this.emitter.emit(`${this.name}:trigger`, payload);
  }

  destroy() {
    this.emitter.removeAllListeners();
  }
}

export default Trigger;
