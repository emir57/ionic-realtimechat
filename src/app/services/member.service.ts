import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { MemberModel } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private collectionName="members";
  constructor(
    private fireStoreService:AngularFirestore
  ) { }

  addMember(memberModel:MemberModel){
    return this.fireStoreService.collection(this.collectionName).add(memberModel);
  }
  deleteMember(memberModel:MemberModel){
    return this.fireStoreService.collection(this.collectionName).doc(memberModel.id).delete();
  }
  getMembers():Observable<MemberModel[]>{
    let subject = new Subject<MemberModel[]>();
    let returnValues:MemberModel[]=[];
    this.fireStoreService.collection<MemberModel>(this.collectionName).get().subscribe(docs=>{
      docs.docs.forEach(doc=>{
        returnValues.push(Object.assign({id:doc.id},doc.data()));
      })
      return subject.next(returnValues);
    })
    return subject.asObservable();
  }

  getMembersByGroupId(groupId:string):Observable<MemberModel[]>{
    let subject = new Subject<MemberModel[]>();
    let returnValues:MemberModel[]=[];
    this.fireStoreService.collection<MemberModel>(this.collectionName).get().subscribe(docs=>{
      docs.docs.forEach(doc=>{
        if(doc.data().groupId===groupId){
          returnValues.push(Object.assign({id:doc.id},doc.data()));
        }
      })
      return subject.next(returnValues);
    })
    return subject.asObservable();
  }
}
