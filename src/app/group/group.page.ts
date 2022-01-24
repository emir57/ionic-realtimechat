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
  @Input() group: GroupModel;
  @Input() currentUser: User;

  chats: Message[] = []
  message: string = "";
  constructor(
    private modalController: ModalController,
    private chatService: ChatService
  ) {

  }

  ngOnInit() {
    console.log(this.group);
    this.getMessages();
    this.setScrollPosition();


  }
  dismiss() {
    this.modalController.dismiss();
  }

  sendMessage() {
    let message = Object.assign({
      text: this.message,
      groupId: this.group.id,
      user: this.currentUser
    });
    this.chatService.add(message)
    this.message = "";
  }

  getMessages() {
    this.chatService.getChatsByGroupId(this.group.id).subscribe(chats => {
      this.chats = chats;
      this.setScrollPosition();
    })
  }

  getDate(dateString: string) {
    let date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getDay();
    return `${day}.${month}.${year} - ${hours}:${minutes}`
  }

  setScrollPosition(){
    setTimeout(() => {
      const messageDiv = document.getElementById("messageDiv");
      let maxHeight = messageDiv.scrollHeight;
      console.log(maxHeight)
      messageDiv.scrollTop = maxHeight;
    }, 100);
  }

}
