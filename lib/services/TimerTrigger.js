import Trigger from '../Trigger';

class TimerTrigger extends Trigger {
  resgister(callback, config, combinationId) {
    super.resgister((payload) => {
        callback();
    });
  }
}

export default TimerTrigger;
