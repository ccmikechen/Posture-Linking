import { AsyncStorage } from 'react-native';
import Combination from './Combination';


class CombinationManager {
  constructor() {
    this.combinations = [];
  }

  async load() {
    try {
      let json = await AsyncStorage.getItem('@combinations');
      JSON.parse(json).forEach((combination) => {
        this.combinations.push(new Combination(combination));
      });
    } catch (error) {
      console.log(error);
    }
  }

  async save(combinations) {
    let json = JSON.stringify(combinations);
    try {
      await AsyncStorage.setItem('@combinations', json);
    } catch (error) {
      console.log(error);
    }
  }

  async refresh() {
    try {
      let json = await AsyncStorage.getItem('@combinations');
      JSON.parse(json).forEach((combination) => {
        this.combinations.push(new Combination(combination));
      });
    } catch (error) {
      console.log(error);
    }
  }
}

const combinationManager = new CombinationManager();

export const getCombinationManager = () => {
  return combinationManager;
}; 