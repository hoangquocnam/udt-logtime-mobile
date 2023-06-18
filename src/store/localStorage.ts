import AsyncStorage from "@react-native-async-storage/async-storage";

type StorageValue = string | null | undefined;

class LocalStorage {
  private static instance: LocalStorage;
  private constructor() {}

  static getInstance() {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  async setItem(key: string, value: StorageValue) {
    const jsonValue = value || "";
    return AsyncStorage.setItem(key, jsonValue);
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

export default LocalStorage;
