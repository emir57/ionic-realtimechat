import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GroupModel } from '../models/group';
import { ChatService } from '../services/chat.service';
import { Message } from "../models/message";
import { User } from '../models/user';
@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  @Input() group:GroupModel;
  @Input() currentUser:User;

  chats:Message[]=[]
  message:string="";
  constructor(
    private modalController:ModalController,
    private chatService:ChatService
  ) { }

  ngOnInit() {
    console.log(this.group);
    this.getMessages();
  }
  dismiss(){
    this.modalController.dismiss();
  }

  sendMessage(){
    let message = Object.assign({
      text:this.message,
      groupId:this.group.id,
      user:this.currentUser
    });
    this.chatService.add(message)
    this.message="";
  }

  getMessages(){
    this.chatService.getChatsByGroupId(this.group.id).subscribe(chats=>{
      this.chats=null;
      this.chats = chats;
      console.log(chats)
    })
  }


}
