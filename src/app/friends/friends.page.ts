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
  @Input() currentUserEmail: string;

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
    this.friendService.getFriends(this.currentUserEmail).subscribe(friends => {
      friends.forEach(friend => {
        if (this.currentUserEmail == friend.currentUserEmail) {
          this.userService.getUser(friend.friendUserEmail).subscribe(user => {
            this.friends.push(Object.assign({ user: user }, friend));
          })
        }
        if (this.currentUserEmail == friend.friendUserEmail) {
          this.userService.getUser(friend.currentUserEmail).subscribe(user => {
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
              this.groupService.getGroups(this.currentUserEmail).subscribe(groups => {
                groups.forEach(group => {
                  if (friend.currentUserPhoneNumber == this.currentUserEmail) {
                    if (group.user1Email == friend.friendUserPhoneNumber || group.user2Email == friend.friendUserPhoneNumber) {
                      this.groupService.deleteGroup(group).then();
                    }
                  } else {
                    if (group.user1Email == friend.currentUserPhoneNumber || group.user2Email == friend.currentUserPhoneNumber) {
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
