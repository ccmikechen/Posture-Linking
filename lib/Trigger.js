import Service from './Service';
import EventEmitter from 'events';

class Trigger extends Service {
  constructor(props) {
    super(props);
    this.emitter = new EventEmitter();
  }

  resgister(callback) {
    this.emitter.on(`${this.name}:trigger`, callback);
  }

  trigger(payload) {
    console.log('trigger', `${this.name}:trigger`, payload);
    this.emitter.emit(`${this.name}:trigger`, payload);
  }

}

export default Trigger;
