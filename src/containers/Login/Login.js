import React from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import styles from './styles';
import LoginForm from '../../components/LoginForm';
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
      username: values.get('username'),
      password: values.get('password')
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
        {this.props.isLoggingIn?
          this.renderCover()
        : 
        <View style={styles.container}>
            <Text style={styles.logoText}>PostureLinking</Text>
            {this.props.failed == true ?
              <Text style={styles.errorText}>帳號或密碼錯誤</Text>
              :
              null
            }
            <LoginForm onSubmit={this.onLogin} navigator={this.props.navigator}/>
        </View>
        }
       </KeyboardAwareScrollView>
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
