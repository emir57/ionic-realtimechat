import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FriendModel } from '../models/friendModel';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private collectionName = "friends";
  constructor(
    private fireStoreService:AngularFirestore
  ) { }

  add(friendModel:FriendModel){
    return this.fireStoreService.collection(this.collectionName).add(friendModel);
  }
}
