import React from 'react';
import Combination from '../../containers/Combination';

class CombinationScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Combination navigator={this.props.navigator} />
    );
  }
}

export default Combination;
