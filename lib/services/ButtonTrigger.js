import Trigger from '../Trigger';

class ButtonTrigger extends Trigger {
  resgister(combinationId, callback) {
    console.log('resgister')
    super.resgister(combinationId, (payload) => {
      if(combinationId == payload.combinationId) {
        callback();
      }
    });
  }

}

export default ButtonTrigger;
