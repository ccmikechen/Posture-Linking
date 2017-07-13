import ServiceAuthorizer from './ServiceAuthorizer';
import DeepLinking from 'react-native-deep-linking';
import { Linking } from 'react-native';

class OAuthAuthorizer extends ServiceAuthorizer {
  constructor(service, url) {
    super(service);
    this.url = url;
    DeepLinking.addScheme('posturelinking://');
    DeepLinking.addRoute('/test/:id', ({ scheme, path, id }) => {
      super.handleSuccess('success')
    });
  }

  authorize() {
    Linking.openURL(this.url);
  }

}

export default OAuthAuthorizer;