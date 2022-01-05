import { Component } from '@angular/core';
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
    chatService.update("hello world!2")
    chatService.getChats().subscribe(values=>{
      console.log(values)
    })
  }

}
