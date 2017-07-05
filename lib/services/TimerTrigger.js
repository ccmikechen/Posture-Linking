import Trigger from '../Trigger';

class TimerTrigger extends Trigger {
  resgister(callback, config, combinationId) {
    super.resgister(combinationId, (payload) => {
        callback();
    });
  }
}

export default TimerTrigger;
