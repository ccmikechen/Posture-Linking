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
          animating={true}
          size='large'
          color='#fff'
        />
      </View>
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.KeyboardContainer}>
        {this.props.isSigningUp ? 
          this.renderCover() 
        : 
        <View style={styles.container}>
            <Text style={styles.logoText}>PostureLinking</Text>
            <SignUpForm onSubmit={this.onLogin} navigator={this.props.navigator}/>
             
        </View>
        }
       </KeyboardAwareScrollView>
    );
  }
}

export default connect((state) => ({
  isSigningUp: state.getIn(['session', 'isSigningUp'])
}), {
  createAccount
})(SignUp);
