import Trigger from '../Trigger';

class ButtonTrigger extends Trigger {
  resgister(callback, config, combinationId) {
    super.resgister((payload) => {
      if(combinationId == payload.combinationId) {
        callback();
      }
    });
  }
}

export default ButtonTrigger;
