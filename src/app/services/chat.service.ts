import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { Message } from '../models/message';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private db:AngularFireDatabase
  ) { }

  add(messageModel:Message){
    const chat = this.db.list("chats");
    messageModel.id = this.createId();
    console.log(messageModel)
    chat.push(messageModel)
  }
  update(message:string){
    const chat = this.db.list("chats");
    let messageModel:Message = Object.assign({text:message,uid:"emir"})
    chat.update("-MseYjyfga3SkMvazaeK",messageModel)
  }

  getChats():Observable<Message[]>{
    let returnValues:any[]=[];
    let subject = new Subject<any[]>();
    this.db.list("chats").valueChanges().subscribe(values=>{
      returnValues = values
      subject.next(returnValues)
    })
    return subject.asObservable();
  }
  getChat(id:string):Observable<Message>{
    let getValues:any[]=[];
    let subject = new Subject<Message>();
    this.db.list("chats").valueChanges().subscribe(values=>{
      getValues = values;
      getValues.forEach(value=>{
        if(value.id==id){
          subject.next(value)
        }
      })
    })
    return subject.asObservable();
  }

  createId():string{
    let today = new Date;
    return today.getTime()+"";
  }
}
