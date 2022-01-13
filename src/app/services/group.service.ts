import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GroupModel } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private collectionName="groups"
  constructor(
    private fireStoreService:AngularFirestore
  ) { }

  createGroup(groupModel:GroupModel){
    return this.fireStoreService.collection(this.collectionName).add(groupModel);
  }
  deleteGroup(groupModel:GroupModel){
    return this.fireStoreService.collection(this.collectionName).doc(groupModel.id).delete();
  }
  getGroups(userEmail:string){

  }
}
