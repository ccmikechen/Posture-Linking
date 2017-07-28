import React from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import styles from './styles';
import LoginForm from '../../components/LoginForm';
import Cover from '../../components/Cover';
import { login } from '../../actions/sessionActions';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(values) {
    this.props.login({
      username: values.get('username') || '',
      password: values.get('password') || ''
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView style={styles.KeyboardContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.logoText}>PostureLinking</Text>
              {this.props.failed == true?
                <Text style={styles.errorText}>{this.props.error.error}</Text>
                :
                null
              }
            <LoginForm onSubmit={this.onLogin} navigator={this.props.navigator}/>
          </View>
       </KeyboardAwareScrollView>
       {this.props.isLoggingIn? <Cover /> : null}
     </View>
    );
  }
}

export default connect((state) => ({
  isAuthenticated: state.getIn(['session', 'isAuthenticated']),
  isLoggingIn: state.getIn(['session', 'isLoggingIn']),
  error: state.getIn(['session', 'error']),
  failed: state.getIn(['session', 'failed'])
}), {
  login
})(Login);
