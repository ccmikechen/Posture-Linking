import React from 'react';
import Home from '../../containers/Home';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Home navigator={this.props.navigator} />
    );
  }
}

export default HomeScreen;
