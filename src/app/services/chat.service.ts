import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from 'rxjs';

export interface Message{
  id?:string;
  text:string;
  uid:string;
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private db:AngularFireDatabase
  ) { }

  add(message:string){
    const chat = this.db.list("chats");
    let messageModel:Message = Object.assign({text:message,uid:"emir"})
    chat.push(messageModel)
  }
  update(message:string){
    const chat = this.db.list("chats");
    let messageModel:Message = Object.assign({text:message,uid:"emir"})
    chat.update("-MseYjyfga3SkMvazaeK",messageModel)
  }

  getChat(){
    let returnValues:any[]=[];
    let subject = new Subject<any[]>();
    this.db.list("chats").valueChanges().subscribe(values=>{
      returnValues = values
      subject.next(returnValues)
    })
    return subject.asObservable();
  }
}
