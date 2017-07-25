import React from 'react';
import SignUp from '../../containers/SignUp';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigatorStyle = {
    navBarButtonColor: '#b8bbbc',
    navBarBackgroundColor: '#616161',
    navBarNoBorder: true,
    screenBackgroundColor: '#616161',
    navBarTransparent: true,
    drawUnderNavBar: true,
    navBarTranslucent: true
  };

  render() {
    return (
      <SignUp navigator={this.props.navigator} />
    );
  }
}

export default SignUpScreen;
