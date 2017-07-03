import React from 'react';
import ButtonList from '../../containers/ButtonList';

class ButtonListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ButtonList navigator={this.props.navigator} />
    );
  }
}

export default ButtonListScreen;
