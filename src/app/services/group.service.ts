import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { GroupModel } from '../models/group';
import { MemberService } from './member.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private collectionName = "groups"
  constructor(
    private fireStoreService: AngularFirestore,
    private db:AngularFireDatabase,
    private memberService: MemberService
  ) { }

  createGroup(groupModel: GroupModel) {
    let date = new Date;
    groupModel.groupCreateDate = date.toString();
    groupModel.id = date.getTime().toString();
    const group = this.db.list<GroupModel>(this.collectionName);
    return group.push(groupModel);
  }
  deleteGroup(groupModel: GroupModel) {
    return this.fireStoreService.collection(this.collectionName).doc(groupModel.id).delete();
  }

  getGroups(userEmail: string): Observable<GroupModel[]> {
    let subject = new Subject<GroupModel[]>();
    let returnValues: any[] = [];
    this.db.list<GroupModel>(this.collectionName).valueChanges().subscribe(values=>{
      returnValues=[];
      values.forEach(group=>{
        if(group.user1Email == userEmail || group.user2Email == userEmail){
          returnValues.push(group);
        }
      })
      return subject.next(returnValues);
    })
    // this.fireStoreService.collection<GroupModel>(this.collectionName).get().subscribe(docs => {
    //   returnValues=[];
    //   docs.docs.forEach(doc => {
    //     if (doc.data().user1Email === userEmail || doc.data().user2Email === userEmail) {
    //       returnValues.push(Object.assign({ id: doc.id }, doc.data()));
    //     }
    //   })
    //   return subject.next(returnValues);
    // })
    return subject.asObservable();
  }


  // getGroups(userEmail: string): Observable<GroupModel[]> {
  //   let subject = new Subject<GroupModel[]>();
  //   let returnValues: any[] = [];
  //   this.memberService.getMembers().subscribe(members => {
  //     members.forEach(member => {
  //       if (member.userEmail === userEmail) {
  //         this.fireStoreService.collection<GroupModel>(this.collectionName).get().subscribe(docs => {
  //           docs.docs.forEach(doc => {
  //             if (doc.data().id===member.groupId){
  //               returnValues.push(Object.assign({id:doc.id},doc.data()));
  //             }
  //           })
  //         })
  //       }
  //     })
  //     return subject.next(returnValues);
  //   })
  //   return subject.asObservable();
  // }
}
