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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(values) {
    console.log(values.toJS())
    let user = values.toJS();
    this.props.login({
      username: user.username,
      password: user.password
    })
  }

  renderCover() {
    return (
      <View style={styles.cover}>
        <ActivityIndicator
          animating={true}
          size='large'
          color='grey'
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logoText}>PostureLinking</Text>
        {this.props.failed == true ?
          <Text style={styles.errorText}>帳號或密碼錯誤</Text>
          :
          null
        }
        <LoginForm onSubmit={this.onLogin}/>
        {this.props.isLoggingIn? this.renderCover() : null}
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
