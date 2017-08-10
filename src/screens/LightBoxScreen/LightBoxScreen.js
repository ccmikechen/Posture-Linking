import React from 'react';
import LightBox from '../../containers/LightBox';

class LightBoxScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LightBox navigator={this.props.navigator} item={this.props.item} />
    );
  }
}

export default LightBoxScreen;
