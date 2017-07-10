import Trigger from '../Trigger';

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
}

export default ButtonTrigger;
