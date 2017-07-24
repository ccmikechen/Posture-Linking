import Trigger from '../Trigger';
import TimerAuthorizer from '../authorizers/TimerAuthorizer';

class TimerTrigger extends Trigger {

  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new TimerAuthorizer(this);
    }
    return this.authorizer;
  }
}

export default TimerTrigger;
