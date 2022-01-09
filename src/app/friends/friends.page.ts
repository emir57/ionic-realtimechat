import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FriendModel } from '../models/friendModel';
import { FriendService } from '../services/friend.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  @Input() currentUserEmail:string;

  friendModel:FriendModel[]=[];
  constructor(
    private modalController:ModalController,
    private friendService:FriendService,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.friendService.getFriends(this.currentUserEmail).subscribe(friends=>{
      friends.forEach(friend=>{
        this.userService.getUser(friend.friendUserEmail).subscribe(user=>{
          this.friendModel.push(Object.assign({user:user},friend));
        })
      })
    })
  }


  close(){
    this.modalController.dismiss();
  }
}
