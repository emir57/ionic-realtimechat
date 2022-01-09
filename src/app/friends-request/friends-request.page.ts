import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FriendRequestModel } from '../models/friendRequestModel';
import { User } from '../models/user';
import { FriendRequestService } from '../services/friend-request.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friends-request',
  templateUrl: './friends-request.page.html',
  styleUrls: ['./friends-request.page.scss'],
})
export class FriendsRequestPage implements OnInit {
  @Input() currentUserEmail:string;

  friendRequestModel:FriendRequestModel;
  users:User[]=[]
  constructor(
    private modalController:ModalController,
    private friendRequestService:FriendRequestService,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.friendRequestService.getRequests(this.currentUserEmail).subscribe(requests=>{
      requests.forEach(request=>{
        this.userService.getUser(request.receiveUserEmail).subscribe(user=>{
          this.users.push(user);
        })
      })
    })
    // this.friendRequestModel = Object.assign({
    //   senderUserEmail:this.currentUserEmail,
    //   receiveUserEmail:"emir.gurbuz06@hotmail.com",
    //   status:0
    // });
    // console.log(this.friendRequestModel)
    // this.friendRequestService.add(this.friendRequestModel).then(()=>{});
  }

  close(){
    this.modalController.dismiss();
  }

  accept(){

  }
  decline(){

  }

}
