import React from 'react';
import SlideMenu from '../../containers/SlideMenu';

class SlideMenuScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SlideMenu navigator={this.props.navigator} />
    );
  }
}

export default SlideMenuScreen;
