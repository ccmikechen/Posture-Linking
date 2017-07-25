import React from 'react';
import Login from '../../containers/Login';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Login navigator={this.props.navigator} />
    );
  }
}

export default LoginScreen;
