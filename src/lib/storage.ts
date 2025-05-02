import { MMKV } from 'react-native-mmkv';

export class Storage extends MMKV {
  getObject<T>(key: string): T | undefined {
    const value = this.getString(key);

    if (!value) return undefined;

    try {
      return JSON.parse(value);
    } catch (error) {
      console.error('Error parsing JSON:', error);

      return undefined;
    }
  }

  set(
    key: string,
    value: string | number | boolean | ArrayBuffer | Record<string, unknown>,
  ): void {
    if (typeof value === 'object') {
      this.set(key, JSON.stringify(value));
    } else {
      super.set(key, value);
    }
  }
}

export const storage = new Storage();
