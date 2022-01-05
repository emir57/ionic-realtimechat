import { Component } from '@angular/core';
import { Message } from '../models/message';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  list:string[]=[]
  constructor(
    private chatService:ChatService
  ) {
    let messageModel:Message = Object.assign({uid:"emir",text:"denemee"})
    chatService.add(messageModel)
    chatService.getChats().subscribe(values=>{
      console.log(values)
    })
    // chatService.getChat("1641393560576").subscribe(value=>{
    //   let date = new Date(value.date)
    //   console.log(date)
    //   console.log(date.getDate()+" "+date.toLocaleDateString()+" "+date.toLocaleTimeString())
    // })
  }

}
