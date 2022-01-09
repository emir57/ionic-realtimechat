import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FriendModel } from '../models/friendModel';
import { FriendService } from '../services/friend.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  @Input() currentUserEmail:string;

  friends:FriendModel[]=[];
  constructor(
    private modalController:ModalController,
    private friendService:FriendService,
    private userService:UserService,
    private messageService:MessageService
  ) { }

  ngOnInit() {
    this.friendService.getFriends(this.currentUserEmail).subscribe(friends=>{
      friends.forEach(friend=>{
        this.userService.getUser(friend.friendUserEmail).subscribe(user=>{
          this.friends.push(Object.assign({user:user},friend));
        })
      })
    })
  }


  close(){
    this.modalController.dismiss();
  }

  remove(friend:FriendModel){
    // this.friendService.delete(friend).then(()=>{
    //   this.messageService.showMessage(`${friend.user.firstName} ${friend.user.lastName} başarıyla arkadaşlıktan çıakrtıldı`);

    // })
    let index = this.friends.findIndex(x=>x.id===friend.id)
    this.friends.splice(index,1);
  }
}
