import ServiceAuthorizer from './ServiceAuthorizer';
import api from '../../src/api/poselink';

class NotificationAuthorizer extends ServiceAuthorizer {

  constructor(service, token) {
    super(service);

    this.service = service;
    this.token = token;
  }

  authorize() {
    if (this.token == null) {
      this.handleFailed();
    } else {
      api.createUserServiceConfig(
        this.service.id, { gcm: this.token }, 'connected')
        .then(() => {
          this.handleSuccess();
        });
    }
  }
}

export default NotificationAuthorizer;
