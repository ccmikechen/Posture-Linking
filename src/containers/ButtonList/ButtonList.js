import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  FlatList,
  Image
} from 'react-native';

import AnimatedButton from '../../components/AnimatedButton';
import ViewIcon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';
import styles, { width, itemWidth, minButtonTouchSize, minButtonSize, minButtonMenuHeight } from './styles';
import {
  updateCombinationList
} from '../../actions/combinationActions';

import {
  selectService,
  getServiceList
} from '../../actions/serviceActions';
import Svg, {
  Rect,
  Defs,
  LinearGradient,
  Stop,
  Circle
} from 'react-native-svg';

import ServiceManager from '../../../lib/ServiceManager';

class ButtonList extends React.Component {

  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.buttonTrigger = ServiceManager.getServiceByTypeName('trigger', 'button');
    this.buttonOnClickEvent = this.buttonTrigger.getEventByName('on click');
    this.connectService = this.connectService.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.goToAddCombination = this.goToAddCombination.bind(this);
    this.flatList;
    this.state = {
      item: 0
    }
  }

  componentWillMount() {
    this.props.updateCombinationList();
    this.props.getServiceList();
  }

  handleButtonPress(combinationId) {
    this.buttonTrigger.trigger(this.buttonOnClickEvent.id, { combinationId });
  }

  shouldComponentUpdate() {
    this.buttonTrigger = ServiceManager.getServiceByTypeName('trigger', 'button');

    return true;
  }

  renderMessage(msg) {
    if (msg.length > 20) {
      return msg.substring(0, 17) + '...';
    } else {
      return msg;
    }
  }

  renderButton(combination) {
    let icon = {};
    let description = R.strings.events[combination.action.eventId].description;
    description += R.strings.events[combination.action.eventId].options;
    let message = '';
    if (combination.action.config.message === undefined) {
      message = '';
    } else {
      message += combination.action.config.message;
    }
    R.images.icon.forEach((data) => {
      if(combination.action.name == data.name) {
        icon = data;
      }
    });

    return (
      <View key={combination.id} style={styles.animatedView}>
        <View style={[styles.animatedAllView, styles.animatedShadowView]}></View>
        <View style={[styles.animatedAllView, styles.animatedBottomView]}></View>
        <View style={[styles.animatedAllView, styles.animatedButtonView]}>
          <AnimatedButton
            size={itemWidth * 0.5}
            onPress={() => this.handleButtonPress(combination.id)}
            color={icon.color}
            icon={icon.icon}
          />
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.message}>{this.renderMessage(message)}</Text>
        </View>
      </View>
    );
  }

  minRenderButton(combination, id) {
    let icon = {}, size = minButtonSize * 0.8, iconSize;
    let minButtonOuterTouchSize = minButtonSize + minButtonTouchSize * 0.05;
    let checkOpacity = 1, color = R.colors.MINBUTTON;

    if(this.state.item == id){
        size = minButtonSize * 0.6;
        color = R.colors.ON_MINBUTTON;
    }
    iconSize = size * 0.8;
    R.images.icon.forEach((data) => {
      if(combination.action.name == data.name) {
        icon = data;
      }
    });

    return(
      <TouchableOpacity
        onPress={() => {
          this.refs.carousel.snapToItem(id);
        }}
        style={styles.minTouchable}
      >
        <Svg width={minButtonOuterTouchSize} height={minButtonOuterTouchSize} style={styles.minOuterButton}>
          <Defs>
            <LinearGradient id='minOuterButton' x1='0' x2={minButtonOuterTouchSize} y1='0' y2={minButtonOuterTouchSize}>
              <Stop offset='25%' stopColor={color[0]} stopOpacity={checkOpacity} />
              <Stop offset='75%' stopColor={color[1]} stopOpacity={checkOpacity} />
            </LinearGradient>
            <LinearGradient id='minButton' x1='0' x2={minButtonOuterTouchSize} y1='0' y2={minButtonOuterTouchSize}>
              <Stop offset='25%' stopColor={color[2]} stopOpacity={checkOpacity} />
              <Stop offset='75%' stopColor={color[3]} stopOpacity={checkOpacity} />
            </LinearGradient>
          </Defs>
          <Circle cx={minButtonOuterTouchSize/2} cy={minButtonOuterTouchSize/2} r={minButtonOuterTouchSize/2} fill='url(#minOuterButton)' />
          <Circle cx={minButtonOuterTouchSize/2} cy={minButtonOuterTouchSize/2} r={minButtonSize/2} fill='url(#minButton)' />
        </Svg>
        <View style={[{backgroundColor: icon.color, height: size, width: size}, styles.minButton]}>
          <Image source={icon.icon} style={{height: iconSize, width: iconSize}}/>
        </View>
      </TouchableOpacity>
    );
  }

  connectService() {
    this.props.selectService(this.buttonTrigger.id);
    this.props.navigator.push({
      screen: 'ServiceConnectScreen',
      title: '',
      passProps: {},
      navigatorStyle: {
      }
    });
  }

  goToAddCombination() {
    this.props.navigator.showModal({
      screen: 'AddCombinationScreen',
      title: R.strings.ADD_COMBINATION,
      passProps: {},
      animated: false
    });
  }

  render() {
    let buttonData = [];
    this.props.combinations.forEach(combination => {
      if((combination.trigger.serviceId == this.buttonTrigger.id) && (combination.status == 1)){
        buttonData.push(combination);
      }
    });
    return (
        <View style={styles.content} >
        {
          this.buttonTrigger? (
            this.buttonTrigger.isConnected() == false?
              <View style= {styles.noAuthorized} >
                <TouchableOpacity style={styles.imgTouch} onPress={() => this.connectService()}>
                  <ViewIcon name= 'touch-app' size= {width * 0.4} color= {R.colors.NO_CONBINATION} />
                  <Text style={styles.text}>{R.strings.CLICK_THIS}</Text>
                  <Text style={styles.text}>{R.strings.AUTHORIZING}</Text>
                </TouchableOpacity>
              </View>
            :
              buttonData.length === 0 ? (
                <TouchableOpacity style={styles.imgTouch} onPress={() => this.goToAddCombination()}>
                  <ViewIcon name= 'touch-app' size= {width * 0.4} color= {R.colors.NO_CONBINATION} />
                  <Text style={styles.text}>{R.strings.CLICK_THIS}</Text>
                  <Text style={styles.text}>{R.strings.ADD_COMBINATION}</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.authorized}>
                  <View style={styles.topView}>
                    <Carousel
                      sliderWidth={width}
                      itemWidth={itemWidth}
                      containerCustomStyle={styles.slider}
                      contentContainerCustomStyle={styles.sliderContainer}
                      inactiveSlideScale={0.9}
                      inactiveSlideOpacity={0.5}
                      snapOnAndroid={true}
                      enableSnap={true}
                      onSnapToItem={item => {
                        this.setState({item: item});
                        this.flatList.scrollToIndex({viewPosition: 0.5, index: item});
                      }}
                      ref={'carousel'}
                    >
                      {buttonData.map(combination => this.renderButton(combination))}
                    </Carousel>
                  </View>
                  <View style={styles.bottomView}>
                    <Svg width={width} height={minButtonMenuHeight} style={styles.bottomListView}>
                      <Defs>
                        <LinearGradient id='grad' x1='0' x2='0' y1='0' y2='180'>
                          <Stop offset='2%' stopColor={R.colors.BOTTOM_VIEW[0]} stopOpacity='0.025' />
                          <Stop offset='2.5%' stopColor={R.colors.BOTTOM_VIEW[1]} stopOpacity='0.05' />
                          <Stop offset='3%' stopColor={R.colors.BOTTOM_VIEW[2]} stopOpacity='0.08' />
                          <Stop offset='3.5%' stopColor={R.colors.BOTTOM_VIEW[3]} stopOpacity='1' />
                        </LinearGradient>
                      </Defs>
                      <Rect x='0' y='0' width={width} height={minButtonMenuHeight} fill='url(#grad)' />
                    </Svg>
                    <FlatList
                      horizontal={true}
                      renderItem={(item) => this.minRenderButton(item.item, item.index)}
                      data={buttonData}
                      ref={(flatList) => this.flatList = flatList}
                      getItemLayout={(data, index) => (
                        {length: minButtonTouchSize, offset: minButtonTouchSize * index, index: index}
                      )}
                      keyExtractor={(item, index) => index}
                      contentContainerStyle={styles.flatList}
                    />
                  </View>
                </View>
              )
          ) : null
        }
      </View>
    );
  }
}

export default connect((state) => ({
  combinations: state.getIn(['combination', 'combinations']).toJS()
}), {
  updateCombinationList,
  selectService,
  getServiceList
})(ButtonList);
