import ServiceAuthorizer from './ServiceAuthorizer';
import api from '../../src/api/poselink';

class TimerAuthorizer extends ServiceAuthorizer {

  constructor(service) {
    super(service);
  }

  authorize() {
    api.createUserServiceConfig(
      this.service.id, {}, 'connected')
      .then(() => {
        this.handleSuccess();
      });
  }
}

export default TimerAuthorizer;
