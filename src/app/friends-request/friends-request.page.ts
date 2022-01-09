import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FriendModel } from '../models/friendModel';
import { FriendRequestModel } from '../models/friendRequestModel';
import { User } from '../models/user';
import { FriendRequestService } from '../services/friend-request.service';
import { FriendService } from '../services/friend.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friends-request',
  templateUrl: './friends-request.page.html',
  styleUrls: ['./friends-request.page.scss'],
})
export class FriendsRequestPage implements OnInit {
  @Input() currentUserEmail: string;

  searchString:string="";
  friendRequestModel: FriendRequestModel;
  friendRequests: FriendRequestModel[] = [];
  users: User[] = [];
  friendModel: FriendModel;
  constructor(
    private modalController: ModalController,
    private friendRequestService: FriendRequestService,
    private userService: UserService,
    private friendService: FriendService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // this.friendRequestService.getRequestsByUser(this.currentUserEmail).subscribe(users=>{
    //   this.users = users
    // })
    this.friendRequestService.getRequests(this.currentUserEmail).subscribe(requests => {
      requests.forEach(request => {
        this.userService.getUser(request.senderUserEmail).subscribe(user => {
          this.users.push(user);
          this.friendRequests.push(Object.assign({ user: user }, request))
        })
        console.log(this.friendRequests)
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

  close() {
    this.modalController.dismiss();
  }

  accept(request: FriendRequestModel) {
    this.friendModel = Object.assign({
      currentUserEmail: this.currentUserEmail,
      friendUserEmail: request.user.email
    })
    this.friendService.add(this.friendModel).then(() => {
      this.modalController.dismiss();
      this.messageService.showMessage(`${request.user.firstName} ${request.user.lastName} başarıyla eklendi`);
      this.friendRequestService.delete(request).then();
    })
  }
  decline(request: FriendRequestModel) {
    this.friendRequestService.delete(request).then(() => {
      this.modalController.dismiss();
      this.messageService.showMessage(`${request.user.firstName} ${request.user.lastName} başarıyla reddedildi`)
    })
  }
}
