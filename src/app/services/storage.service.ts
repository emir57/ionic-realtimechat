import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setName(keyType: KeyType, value: string) {
    await Storage.set({
      key: keyType,
      value: value
    });
  }

  async checkName(keyType: KeyType) {
    const { value } = await Storage.get({ key: keyType });
    return value;
  }
}

export enum KeyType {
  User = "user"
}
