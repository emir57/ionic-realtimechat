import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FriendModel } from '../models/friendModel';
import { FriendService } from '../services/friend.service';
import { GroupService } from '../services/group.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  @Input() currentUserPhoneNumber: string;

  searchString: string = "";
  friends: FriendModel[] = [];
  isLoad = false;
  constructor(
    private modalController: ModalController,
    private friendService: FriendService,
    private userService: UserService,
    private messageService: MessageService,
    private alertController: AlertController,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.isLoad = true;
    this.friendService.getFriends(this.currentUserPhoneNumber).subscribe(friends => {
      friends.forEach(friend => {
        if (this.currentUserPhoneNumber == friend.currentUserPhoneNumber) {
          this.userService.getUser(friend.friendUserPhoneNumber).subscribe(user => {
            this.friends.push(Object.assign({ user: user }, friend));
          })
        }
        if (this.currentUserPhoneNumber == friend.friendUserPhoneNumber) {
          this.userService.getUser(friend.currentUserPhoneNumber).subscribe(user => {
            this.friends.push(Object.assign({ user: user }, friend));
          })
        }
      })
      setTimeout(() => {
        this.isLoad = false;
      }, 200);
    })
  }
  close() {
    this.modalController.dismiss();
  }

  async remove(friend: FriendModel) {
    const alert = await this.alertController.create({
      header: 'Uyarı !',
      message: `${friend.user.firstName} ${friend.user.lastName} kişisini arkadaşlıktan çıkarmak istediğinizden emin misiniz?`,
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Çıkar',
          handler: () => {
            this.friendService.delete(friend).then(() => {
              this.groupService.getGroups(this.currentUserPhoneNumber).subscribe(groups => {
                groups.forEach(group => {
                  if (friend.currentUserPhoneNumber == this.currentUserPhoneNumber) {
                    if (group.user1PhoneNumber == friend.friendUserPhoneNumber || group.user2PhoneNumber == friend.friendUserPhoneNumber) {
                      this.groupService.deleteGroup(group).then();
                    }
                  } else {
                    if (group.user1PhoneNumber == friend.currentUserPhoneNumber || group.user2PhoneNumber == friend.currentUserPhoneNumber) {
                      this.groupService.deleteGroup(group).then();
                    }
                  }
                })
              })
              let index = this.friends.findIndex(x => x.id === friend.id)
              this.friends.splice(index, 1);
              this.messageService.showMessage(`${friend.user.firstName} ${friend.user.lastName} başarıyla arkadaşlıktan çıkartıldı`);
            })

          }
        }
      ]
    });
    await alert.present();
  }
}
