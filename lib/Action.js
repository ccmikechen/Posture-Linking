import Service from './Service';

class Action extends Service  {
  constructor(icon, name, id) {
    super(icon, name);
    this.id = id;
  }

  execute() {
    throw new Error('action error');
  }
  
}

export default Action;