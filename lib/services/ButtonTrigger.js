import Trigger from '../Trigger';
import ButtonAuthorizer from '../authorizers/ButtonAuthorizer';

class ButtonTrigger extends Trigger {

  register(combinationId, eventId, callback) {
    let newCallback = (payload) => {
      if(combinationId == payload.combinationId) {
        callback();
      }
    };

    return super.register(combinationId, eventId, newCallback);
  }

  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new ButtonAuthorizer(this);
    }
    return this.authorizer;
  }
}

export default ButtonTrigger;
