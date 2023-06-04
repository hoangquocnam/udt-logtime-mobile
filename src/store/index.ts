import AsyncStorage from "@react-native-async-storage/async-storage";

type StorageValue = string | null;

class Storage {
  private static instance: Storage;
  private constructor() {}

  static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  async setItem(key: string, value: StorageValue) {
    return AsyncStorage.setItem(key, value);
  }

  async getItem(key: string) {
    return AsyncStorage.getItem(key);
  }

  async removeItem(key: string) {
    return AsyncStorage.removeItem(key);
  }

  async clear() {
    return AsyncStorage.clear();
  }
}

export default Storage;
