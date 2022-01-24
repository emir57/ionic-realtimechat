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
import { MessageService } from '../services/message.service';
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
    private groupService: GroupService
  ) {
    let messageModel: Message = Object.assign({ uid: "emir", text: "denemee" })
    // chatService.getChats().subscribe(values => {
    //   console.log(values)
    // })
  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.getGroups();
  }

  showMenu() {
    this.menuController.enable(true, "menu")
    this.menuController.open();
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
            this.authService.signOut().then(() => {
              localStorage.removeItem("user");
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

  }

  async showFriendsRequest() {
    this.menuController.close("menu")
    const modal = await this.modalController.create({
      component: FriendsRequestPage,
      componentProps: { currentUserEmail: this.currentUser.email }
    })
    return await modal.present();
  }
  async showFriends() {
    this.menuController.close("menu")
    const modal = await this.modalController.create({
      component: FriendsPage,
      componentProps: { currentUserEmail: this.currentUser.email }
    })
    return await modal.present();
  }

  async sendFriendRequest() {
    this.menuController.close("menu");
    const alert = await this.alertController.create({
      header: 'Arkadaşınızın Eposta Adresini Giriniz',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'email@example.com'
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
            this.friendRequestService.add(Object.assign(
              {
                senderUserEmail: this.currentUser.email,
                receiveUserEmail: value.email,
                status: 0
              }))
            this.messageService.showMessage("Arkadaşlık isteği başarıyla gönderildi.")
          }
        }
      ]
    });

    await alert.present();
  }

  getGroups() {
    this.groupService.getGroups(this.currentUser.email).subscribe(groups => {
      groups.forEach(group => {
        if (this.currentUser.email === group.user1Email){
          this.userService.getUser(group.user2Email).subscribe(user=>{
            this.groups.push(Object.assign({user:user,groupName:`${user.firstName} ${user.lastName}`}, group));
          })
        }
        else if(this.currentUser.email === group.user2Email){
          this.userService.getUser(group.user1Email).subscribe(user=>{
            this.groups.push(Object.assign({user:user,groupName:`${user.firstName} ${user.lastName}`}, group));
          })
        }
      })
    })
  }

  refresh(){
    setTimeout(() => {
      this.groups=[];
      this.getGroups();
    }, 100);
  }

  async showGroupChatModal(group:GroupModel){
    const modal = await this.modalController.create({
      component:GroupPage,
      componentProps:{group:group,currentUser:this.currentUser}
    })
    return await modal.present();
  }

}
