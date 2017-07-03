import Service from './Service';

class Trigger extends Service {
  constructor() {
    super(icon, name);
  }

  trigger() {
    throw new Error('trigger error');
  }

}

export default Trigger;