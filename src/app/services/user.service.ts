import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  collectionName="users";
  constructor(
    private fireStore:AngularFirestore
  ) { }

  addUser(user:User):Promise<DocumentReference<User>>{
    return this.fireStore.collection<User>(this.collectionName).add(user);
  }
  deleteUser(userId:string):Promise<void>{
    return this.fireStore.collection(this.collectionName).doc(userId).delete();
  }
  updateUser(user:User):Promise<void>{
    return this.fireStore.collection(this.collectionName).doc(user.id).update(user);
  }
  getUser(email:string):Observable<User>{
    let subject = new Subject<User>();
    this.fireStore.collection<User>(this.collectionName).get().subscribe(users=>{
      users.forEach(user=>{
        if(user.data().email===email){
          return subject.next(user.data());
        }
      })
    })
    return subject.asObservable();
  }
  getUsers():Observable<User[]>{
    let subject = new Subject<User[]>();
    let returnUsers:User[]=[];
    this.fireStore.collection<User>(this.collectionName).get().subscribe(users=>{
      users.docs.forEach(user=>{
        returnUsers.push(Object.assign({id:user.id},user.data()))
      })
      subject.next(returnUsers)
    })
    return subject.asObservable();
  }
}
