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
  getRequestsByUser(currentUserPhoneNumber:string):Observable<User[]>{
    let subject = new Subject<User[]>();
    let users:User[] = [];
    this.fireStoreService.collection<FriendRequestModel>(this.collectionName).get().subscribe(requests=>{
      requests.docs.forEach(request=>{
        if(request.data().receiveUserPhoneNumber===currentUserPhoneNumber){
          this.userService.getUser(request.data().receiveUserPhoneNumber).subscribe(user=>{
            users.push(user);
          })
        }
      })
      subject.next(users);
    })
    return subject.asObservable();
  }
  checkRequests(currentUserPhoneNumber:string,friendUserPhone:string):Observable<boolean>{
    let subject = new Subject<boolean>();
    let status = false;
    this.fireStoreService.collection<FriendRequestModel>(this.collectionName).get().subscribe(requests=>{
      requests.docs.forEach(request=>{
        if((request.data().receiveUserPhoneNumber===currentUserPhoneNumber && request.data().senderUserPhoneNumber === friendUserPhone) ||(request.data().senderUserPhoneNumber===currentUserPhoneNumber && request.data().receiveUserPhoneNumber === friendUserPhone)){
            status = true;
          }
        })
      })
      subject.next(status);
    return subject.asObservable();
  }
  getRequests(currentUserPhoneNumber:string):Observable<FriendRequestModel[]>{
    let subject = new Subject<FriendRequestModel[]>();
    let returnValues:FriendRequestModel[] = [];
    this.fireStoreService.collection<FriendRequestModel>(this.collectionName).get().subscribe(requests=>{
      requests.docs.forEach(request=>{
        if(request.data().receiveUserPhoneNumber===currentUserPhoneNumber){
          returnValues.push(Object.assign({id:request.id},request.data()));
        }
      })
      subject.next(returnValues)
    })
    return subject.asObservable();
  }

}
