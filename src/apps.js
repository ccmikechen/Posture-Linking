import {
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import { iconsMap, iconsLoaded } from '../res/icons';

registerScreens();

export const startMainApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'CombinationScreen',
      title: R.strings.COMBINATION_TITLE
    },
    appStyle: {
      orientation: 'portrait'
    },
    drawer: {
    	left: {
    		screen: 'SideMenuScreen'
      },
      disableOpenGesture: false
    }
  });
};

export const startLoginApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'LoginScreen',
      navigatorStyle: {
        navBarHidden: true,
        drawUnderNavBar: true
      }
    },
    appStyle: {
      orientation: 'portrait'
    }
  });
};


export const startiOSMainApp = () => {
  Navigation.startTabBasedApp({
  tabs: [
    {
      label: R.strings.COMBINATION_TITLE,
      screen: 'CombinationScreen',
      title: R.strings.COMBINATION_TITLE,
      icon: iconsMap['extension'],
      iconInsets: { 
        top: 3, 
        left: 0,
        bottom: -3, 
        right: 0
      },
    },
    {
      label: R.strings.BUTTON_LIST_TITLE,
      screen: 'ButtonListScreen',
      title: R.strings.BUTTON_LIST_TITLE,
      icon: iconsMap['touch-app'],
      iconInsets: { 
        top: 1, 
        left: 0,
        bottom: -1, 
        right: 0
      },
    },
    {
      label: R.strings.SERVICE_LIST_TITLE,
      screen: 'ServiceListScreen', 
      icon: iconsMap['room-service'],
      iconInsets: { 
        top: 3, 
        left: 0,
        bottom: -3, 
        right: 0
      },
      title: R.strings.SERVICE_LIST_TITLE,
    },
    {
      label: '選單',
      screen: 'SideMenuScreen', 
      icon: iconsMap['menu'],
      iconInsets: { 
        top: 3, 
        left: 0,
        bottom: -3, 
        right: 0
      },
      title: R.strings.SERVICE_LIST_TITLE,
    }
  ],
  tabsStyle: {
    tabBarButtonColor: '#bbb', 
    tabBarSelectedButtonColor: R.colors.NAVBAR_BACKGROUND,
    tabBarBackgroundColor: R.colors.WHITE_TEXT
  },
  appStyle: {
    orientation: 'portrait' 
  },
  passProps: {},
});
};