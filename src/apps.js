import {
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

registerScreens();

export const startMainApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'CombinationScreen',
      title: R.strings.COMBINATION_TITLE
    },
    drawer: {
    	left: {
    		screen: 'SideMenuScreen'
    	}
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
    }
  });
};