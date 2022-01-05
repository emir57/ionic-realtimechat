import { Component } from '@angular/core';
import { ChatService, Message } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  message:Message
  list:string[]=[]
  constructor(
    private chatService:ChatService
  ) {
    // this.message.text="denemee";
    this.message.uid="emir";
    console.log(this.message)
    // chatService.add(message)
    chatService.getChats().subscribe(values=>{
    })
  }

}
