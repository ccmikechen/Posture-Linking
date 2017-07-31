import React from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import styles from './styles';
import SignUpForm from '../../components/SignUpForm';
import Cover from '../../components/Cover';
import { createAccount } from '../../actions/sessionActions';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(values) {
    this.props.createAccount({
      username: values.get('username'),
      password: values.get('password'),
      nickname: values.get('username'),
      email: values.get('email'),
      first_name: '',
      last_name: ''
    });
  }

  renderError(key, error) {
    let errorText = key + ' ' + error;
    return (
      <Text key={key} style={styles.errorText}>{errorText}</Text>
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.KeyboardContainer}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.logoText}>Posture Linking</Text>
              {this.props.isSignUpFaild?
                Object.keys(this.props.signUpError.errors).map((key) => {
                  return this.renderError(key, this.props.signUpError.errors[key][0]);
              })
             : null}
            <SignUpForm onSubmit={this.onLogin} navigator={this.props.navigator}/>
          </View>
        </View>
        {this.props.isSigningUp? <Cover /> : null}
      </KeyboardAwareScrollView>
    );
  }
}

export default connect((state) => ({
  isSigningUp: state.getIn(['session', 'isSigningUp']),
  signUpError : state.getIn(['session', 'signUpError']),
  isSignUpFaild: state.getIn(['session', 'isSignUpFaild'])
}), {
  createAccount
})(SignUp);
