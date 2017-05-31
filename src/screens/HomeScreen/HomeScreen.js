import React from 'react';
import Home from '../../containers/Home';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorButtons = {
    rightButtons: [
      {
        id: 'post',
        icon: require('../../../img/newPost.png')
      }
    ]
  };

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {

      if (event.id == 'post') {
        this.props.navigator.showModal({
          screen:'petsgo.NewPostScreen',
          title:'撰寫貼文',
          passProps: {},
          animated:true,
          animationType: 'slide-up'
        });

      }
    }
  }

  render() {
    return (
      <Home navigator={this.props.navigator} />
    );
  }
}

export default HomeScreen;
