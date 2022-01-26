import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { FriendModel } from '../models/friendModel';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private collectionName = "friends";
  constructor(
    private fireStoreService:AngularFirestore,
    private userService:UserService
  ) { }

  add(friendModel:FriendModel){
    return this.fireStoreService.collection(this.collectionName).add(friendModel);
  }
  delete(friendModel:FriendModel){
    return this.fireStoreService.collection(this.collectionName).doc(friendModel.id).delete();
  }
  getFriends(currentUserPhoneNumber:string):Observable<FriendModel[]>{
    let subject = new Subject<FriendModel[]>();
    let returnValues:FriendModel[]=[]
    this.fireStoreService.collection<FriendModel>(this.collectionName).get().subscribe(doc=>{
      doc.docs.forEach(doc=>{
        if(doc.data().currentUserPhoneNumber === currentUserPhoneNumber || doc.data().friendUserPhoneNumber === currentUserPhoneNumber){
          returnValues.push(Object.assign({id:doc.id},doc.data()));
        }
      })
      subject.next(returnValues);
    })
    return subject.asObservable();
  }
}
