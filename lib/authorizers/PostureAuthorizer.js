import ServiceAuthorizer from './ServiceAuthorizer';
import api from '../../src/api/poselink';

class PostureAuthorizer extends ServiceAuthorizer {

  constructor(service, navigator) {
    super(service);

    this.service = service;
    this.navigator = navigator;
  }

  authorize() {
    this.navigator.showModal({
      screen: 'PostureDeviceScannerScreen',
      title: R.strings.SCANNING_DEVICE_TITLE,
      passProps: {},
      navigatorStyle: {},
      animationType: 'slide-up'
    });
  }
}

export default PostureAuthorizer;
