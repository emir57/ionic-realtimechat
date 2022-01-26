import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FriendModel } from '../models/friendModel';
import { FriendRequestModel } from '../models/friendRequestModel';
import { GroupModel } from '../models/group';
import { User } from '../models/user';
import { FriendRequestService } from '../services/friend-request.service';
import { FriendService } from '../services/friend.service';
import { GroupService } from '../services/group.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friends-request',
  templateUrl: './friends-request.page.html',
  styleUrls: ['./friends-request.page.scss'],
})
export class FriendsRequestPage implements OnInit {
  @Input() currentUserPhoneNumber: string;

  isLoad = false;
  searchString: string = "";
  friendRequestModel: FriendRequestModel;
  friendRequests: FriendRequestModel[] = [];
  users: User[] = [];
  friendModel: FriendModel;
  groupModel:GroupModel;
  constructor(
    private modalController: ModalController,
    private friendRequestService: FriendRequestService,
    private userService: UserService,
    private friendService: FriendService,
    private messageService: MessageService,
    private groupService:GroupService
  ) { }

  ngOnInit() {
    this.isLoad = true;
    // this.friendRequestService.getRequestsByUser(this.currentUserEmail).subscribe(users=>{
    //   this.users = users
    // })
    this.friendRequestService.getRequests(this.currentUserPhoneNumber).subscribe(requests => {
      requests.forEach(request => {
        this.userService.getUserByPhone(request.senderUserPhoneNumber).subscribe(user => {
          this.users.push(user);
          this.friendRequests.push(Object.assign({ user: user }, request))
        })
      })
      setTimeout(() => {
        this.isLoad = false;
      }, 200);
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
    this.groupModel = Object.assign({
      user1PhoneNumber:this.currentUserPhoneNumber,
      user2PhoneNumber:request.user.phoneNumber
    })
    this.friendModel = Object.assign({
      currentUserPhoneNumber: this.currentUserPhoneNumber,
      friendUserPhoneNumber: request.user.phoneNumber,
    })
    this.groupService.createGroup(this.groupModel).then();
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
