import { AsyncStorage } from 'react-native';

class CombinationManager {
  constructor() {
    this.combinations = [];
  }

  async load() {
    try {
      this.combinations = await AsyncStorage.getItem('@combinations');
      return this.combinations;
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
      this.combinations = await AsyncStorage.getItem('@combinations');
    } catch (error) {
      console.log(error);
    }
  }
}

export default CombinationManager;