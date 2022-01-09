import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { FriendRequestModel } from '../models/friendRequestModel';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  private collectionName="friendRequests";
  constructor(
    private fireStoreService:AngularFirestore
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
  getRequests(currentUserEmail:string):Observable<FriendRequestModel[]>{
    let subject = new Subject<FriendRequestModel[]>();
    let returnRequests:FriendRequestModel[] = [];
    this.fireStoreService.collection<FriendRequestModel>(this.collectionName).get().subscribe(requests=>{
      requests.docs.forEach(request=>{
        returnRequests.push(Object.assign({id:request.id},request.data()))
      })
      subject.next(returnRequests);
    })
    return subject.asObservable();
  }

}
