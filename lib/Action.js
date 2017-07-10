import Service from './Service';

class Action extends Service {

  constructor(props) {
    super(props);
  }

  execute() {
    throw new Error('action error');
  }
}

export default Action;
