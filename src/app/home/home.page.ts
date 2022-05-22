import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController, PopoverController } from '@ionic/angular';
import { FriendsRequestPage } from '../friends-request/friends-request.page';
import { FriendsPage } from '../friends/friends.page';
import { GroupPage } from '../group/group.page';
import { LoginPage } from '../login/login.page';
import { GroupModel } from '../models/group';
import { Message } from '../models/message';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { FriendRequestService } from '../services/friend-request.service';
import { FriendService } from '../services/friend.service';
import { GroupService } from '../services/group.service';
import { LoadService } from '../services/load.service';
import { MessageService } from '../services/message.service';
import { KeyType, StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  list: string[] = []
  inputs: any[] = [];
  currentUser: User;
  groups: GroupModel[] = [];
  constructor(
    private chatService: ChatService,
    private menuController: MenuController,
    private alertController: AlertController,
    private friendRequestService: FriendRequestService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private modalController: ModalController,
    private userService: UserService,
    private friendService: FriendService,
    private groupService: GroupService,
    private loadService: LoadService,
    private storageService: StorageService
  ) {
    let messageModel: Message = Object.assign({ uid: "emir", text: "denemee" })
    // chatService.getChats().subscribe(values => {
    //   console.log(values)
    // })
  }
  async ngOnInit() {
    await this.getCurrentUser();
    this.getGroups();
  }

  async getCurrentUser() {
    this.currentUser = JSON.parse(await this.storageService.checkName(KeyType.User));
  }

  showMenu() {
    this.menuController.enable(true, "menu")
    this.menuController.open();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async exit() {
    this.menuController.close();
    const alert = await this.alertController.create({
      header: 'Çıkış',
      message: 'Çıkış yapmak istediğinizden emin misiniz?',
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.menuController.open("menu")
          }
        }, {
          text: 'Çık',
          handler: () => {
            this.authService.signOut().then(async () => {
              await this.storageService.removeName(KeyType.User);
              this.router.navigate(["login"])
              this.messageService.showMessage("Başarıyla çıkış yapıldı");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            })
          }
        }
      ]
    });
    await alert.present();
  }

  async showProfile() {
    this.menuController.close("menu")
    this.router.navigate(["my-profile"])
  }

  async showFriendsRequest() {
    this.menuController.close("menu")
    const modal = await this.modalController.create({
      component: FriendsRequestPage,
      componentProps: { currentUserPhoneNumber: this.currentUser.phoneNumber }
    })
    return await modal.present();
  }
  async showFriends() {
    this.menuController.close("menu")
    const modal = await this.modalController.create({
      component: FriendsPage,
      componentProps: { currentUserPhoneNumber: this.currentUser.phoneNumber }
    })
    return await modal.present();
  }

  async sendFriendRequest() {
    this.menuController.close("menu");
    const alert = await this.alertController.create({
      header: 'Arkadaşınızın Telefon Numarasını Giriniz',
      inputs: [
        {
          name: 'phone',
          type: 'text',
          value: "",
          placeholder: '555 555 55 55',
        },
      ],
      buttons: [
        {
          text: 'Kapat',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.menuController.open("menu")
          }
        }, {
          text: 'Gönder',
          handler: (value) => {
            let phoneNumber = "";
            if (!value.phone.startsWith("+90")) {
              phoneNumber = "+90";
            }
            for (let i = 0; i < value.phone.length; i++) {
              const c = value.phone[i];
              phoneNumber += c == " " ? "" : c;
            }
            if (this.currentUser.phoneNumber == phoneNumber) {
              this.messageService.showMessage("Kendi numaranızı giremezsiniz.")
            }
            else {
              this.friendRequestService.add(Object.assign(
                {
                  senderUserPhoneNumber: this.currentUser.phoneNumber,
                  receiveUserPhoneNumber: phoneNumber,
                  status: 0
                }))
              this.messageService.showMessage("Arkadaşlık isteği başarıyla gönderildi.")
            }

          }
        }
      ]
    });

    await alert.present();
  }

  async getGroups() {
    await this.loadService.showLoading("Mesajlarınız yükleniyor..");
    this.groupService.getGroups(this.currentUser.phoneNumber).subscribe(groups => {
      groups.forEach(group => {
        this.chatService.getChatsByGroupId(group.id).subscribe(messages => {
          this.groups = [];
          let lastMsg = messages.sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime())
          if (this.currentUser.phoneNumber === group.user1PhoneNumber) {
            this.userService.getUserByPhone(group.user2PhoneNumber).subscribe(user => {
              this.groups.push(Object.assign({
                user: user, groupName: `${user.firstName} ${user.lastName}`, lastMessage: lastMsg[0]
              }, group));
            })
          }
          else if (this.currentUser.phoneNumber === group.user2PhoneNumber) {
            this.userService.getUserByPhone(group.user1PhoneNumber).subscribe(user => {
              this.groups.push(Object.assign({
                user: user, groupName: `${user.firstName} ${user.lastName}`, lastMessage: lastMsg[0]
              }, group));
            })
          }
        })

      })
      setTimeout(async () => {
        await this.loadService.closeLoading();
      }, 400);
    })
  }

  refresh() {
    setTimeout(() => {
      this.groups = [];
      this.getGroups();
    }, 100);
  }

  async showGroupChatModal(group: GroupModel) {
    await this.loadService.showLoading();
    const modal = await this.modalController.create({
      component: GroupPage,
      componentProps: { group: group, currentUser: this.currentUser }
    })
    await this.loadService.closeLoading();
    return await modal.present();
  }

  getDate(dateString: string) {
    let date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getDay();
    return `${day}.${month}.${year} - ${hours}:${minutes}`
  }

}
