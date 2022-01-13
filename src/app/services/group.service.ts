import { Injectable } from '@angular/core';
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
    private memberService: MemberService
  ) { }

  createGroup(groupModel: GroupModel) {
    return this.fireStoreService.collection(this.collectionName).add(groupModel);
  }
  deleteGroup(groupModel: GroupModel) {
    return this.fireStoreService.collection(this.collectionName).doc(groupModel.id).delete();
  }
  getGroups(userEmail: string): Observable<GroupModel[]> {
    let subject = new Subject<GroupModel[]>();
    let returnValues: any[] = [];
    this.memberService.getMembers().subscribe(members => {
      members.forEach(member => {
        if (member.userEmail === userEmail) {
          this.fireStoreService.collection<GroupModel>(this.collectionName).get().subscribe(docs => {
            docs.docs.forEach(doc => {
              if (doc.data().id===member.groupId){
                returnValues.push(Object.assign({id:doc.id},doc.data()));
              }
            })
          })
        }
      })
      return subject.next(returnValues);
    })
    return subject.asObservable();
  }
}
