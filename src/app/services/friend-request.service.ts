import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { FriendRequestModel } from '../models/friendRequestModel';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  private collectionName="friendRequests";
  constructor(
    private fireStoreService:AngularFirestore,
    private userService:UserService
  ) { }

  add(friendRequestModel:FriendRequestModel){
    return this.fireStoreService.collection(this.collectionName).add(friendRequestModel);
  }
  update(friendRequestModel:FriendRequestModel){
    return this.fireStoreService.collection(this.collectionName).doc(friendRequestModel.id).update(friendRequestModel);
  }
  delete(friendRequestModel:FriendRequestModel){
    return this.fireStoreService.collection(this.collectionName).doc(friendRequestModel.id).delete();
  }
  getRequests(currentUserEmail:string):Observable<User[]>{
    let subject = new Subject<User[]>();
    let users:User[] = [];
    this.fireStoreService.collection<FriendRequestModel>(this.collectionName).get().subscribe(requests=>{
      requests.docs.forEach(request=>{
        if(request.data().receiveUserEmail===currentUserEmail){
          this.userService.getUser(request.data().senderUserEmail).subscribe(user=>{
            users.push(user);
          })
        }
      })
      subject.next(users);
    })
    return subject.asObservable();
  }

}
