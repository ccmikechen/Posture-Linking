import {
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

registerScreens();

export const startMainApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'HomeScreen',
      title: 'Home'
    },
    drawer: {
    	left: {
    		screen: 'SlideMenuScreen'
    	}
    }
  });
};
