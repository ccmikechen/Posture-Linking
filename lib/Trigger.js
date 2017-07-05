import Service from './Service';
import EventEmitter from 'events';

class Trigger extends Service {
  constructor(props) {
    super(props);
    this.emitter = new EventEmitter();
    this.resgisteredCombinations = [];
  }

  resgister(combinationId, callback) {
    this.emitter.on(`${this.name}:trigger`, callback);
    this.resgisteredCombinations.push({ combinationId, callback })
  }

  cancelResgistion(_combinationId, callback) {
    let filterCombinations = this.resgisteredCombinations.filter(({ combinationId }) => {
      return _combinationId == combinationId;
    })
    let combination = filterCombinations[0];
    this.emitter.removeListener(`${combination.name}:trigger`, callback);
    this.resgisteredCombinations = this.resgisteredCombinations.filter(({ combinationId }) => {
      return _combinationId != combinationId;
    })
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
