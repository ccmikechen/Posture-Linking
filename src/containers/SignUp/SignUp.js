import React from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import styles from './styles';
import SignUpForm from '../../components/SignUpForm';
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
      last_name: '',
    })
  }

  renderCover() {
    return (
      <View style={styles.cover}>
        <ActivityIndicator
          style={{marginTop:400, width:200}}
          animating={true}
          size='large'
          color='#ffffff'
        />
      </View>
    );
  }

  renderError(key, error) {
    let errorText = key + ' ' + error;
    return (
      <Text key={key} style={styles.errorText}>{errorText}</Text>
    )
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.KeyboardContainer}>
        {this.props.isSigningUp ? 
          this.renderCover() 
        : 
        <View style={styles.container}>
            <Text style={styles.logoText}>PostureLinking</Text>
            {this.props.isSignUpFaild ? 
            Object.keys(this.props.signUpError.errors).map((key) => {
              return this.renderError(key, this.props.signUpError.errors[key][0])
            })
             : null}
            <SignUpForm onSubmit={this.onLogin} navigator={this.props.navigator}/>
             
        </View>
        }
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
