import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GroupModel } from '../models/group';
import { ChatService } from '../services/chat.service';
import { Message } from "../models/message";
@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  @Input() group:GroupModel;

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

  }

  getMessages(){
    this.chatService.getChatsByGroupId(this.group.id).subscribe(chats=>{
      this.chats = chats;
      console.log(chats)
    })
  }


}
