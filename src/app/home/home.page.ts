import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { User } from '../models/user';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  list:string[]=[]
  currentUser:User
  constructor(
    private chatService:ChatService
  ) {
    let messageModel:Message = Object.assign({uid:"emir",text:"denemee"})
    chatService.getChats().subscribe(values=>{
      console.log(values)
    })
    // chatService.getChat("1641393560576").subscribe(value=>{
    //   let date = new Date(value.date)
    //   console.log(date)
    //   console.log(date.getDate()+" "+date.toLocaleDateString()+" "+date.toLocaleTimeString())
    // })
  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
  }

}
