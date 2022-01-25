import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { GroupModel } from '../models/group';
import { GroupChatModel } from '../models/groupChatModel';
import { Message } from '../models/message';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private collectionName = "chats";
  constructor(
    private db: AngularFireDatabase
  ) { }

  add(messageModel: Message) {
    const chat = this.db.list<Message>(this.collectionName);
    messageModel.id = this.createId();
    messageModel.date = this.getNowDate();
    chat.push(messageModel)
  }
  update(messageModel: Message) {
    const chat = this.db.list<Message>(this.collectionName);
    chat.update(messageModel.id, messageModel)
  }

  getChats(): Observable<Message[]> {
    let subject = new Subject<Message[]>();
    this.db.list<Message>(this.collectionName).valueChanges().subscribe(values => {
      subject.next(values)
    })
    return subject.asObservable();
  }
  getChatsAndGroup(groupId: string): Observable<GroupChatModel> {
    let subject = new Subject<GroupChatModel>();
    let returnValues: GroupChatModel = null
    this.db.list<Message>(this.collectionName).valueChanges().subscribe(values => {
      returnValues.messages = [];
      values.forEach(value => {
        if (value.groupId == groupId) {
          returnValues.messages.push(value);
        }
      })
      this.db.list<GroupModel>("groups").valueChanges().subscribe(values => {
        returnValues.groups=[];
        returnValues.groups = values;
      })
      return subject.next(returnValues);
    })
    return subject.asObservable();
  }
  getChat(id: string): Observable<Message> {
    let subject = new Subject<Message>();
    this.db.list<Message>(this.collectionName).valueChanges().subscribe(values => {
      values.forEach(value => {
        if (value.id === id) {
          subject.next(value)
        }
      })
    })
    return subject.asObservable();
  }

  createId(): string {
    let today = new Date;
    return today.getTime() + "";
  }
  getNowDate(): string {
    let today = new Date;
    return today.toString();
  }
}
