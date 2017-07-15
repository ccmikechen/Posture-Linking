import Trigger from '../Trigger';
import ButtonAuthorizer from '../ButtonAuthorizer';

class ButtonTrigger extends Trigger {

  register(combinationId, callback) {
    let newCallback = (payload) => {
      if(combinationId == payload.combinationId) {
        callback();
      }
    };

    super.register(combinationId, newCallback);

    return newCallback;
  }

  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new ButtonAuthorizer(this);
    }
    return this.authorizer;
  }
}

export default ButtonTrigger;
