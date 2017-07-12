import Service from './Service';

class Action extends Service {

  constructor(props) {
    super(props);
  }

  execute() {
    super.checkStarted();
  }
}

export default Action;
