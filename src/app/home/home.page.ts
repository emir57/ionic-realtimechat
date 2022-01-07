import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { Message } from '../models/message';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  list: string[] = []
  currentUser: User
  constructor(
    private chatService: ChatService,
    private menuController: MenuController,
    private alertController:AlertController,
    private authService:AuthService,
    private router:Router,
    private messageService:MessageService
  ) {
    let messageModel: Message = Object.assign({ uid: "emir", text: "denemee" })
    chatService.getChats().subscribe(values => {
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

  showMenu() {
    // this.menuController.enable(true,"menu")
    this.menuController.open();
  }

  async exit() {
    const alert = await this.alertController.create({
      header: 'Çıkış',
      message: 'Çıkış yapmak istediğinizden emin misiniz?',
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Çık',
          handler: () => {
            this.authService.signOut().then(()=>{
              this.router.navigate(["login"])
              this.messageService.showMessage("Başarıyla çıkış yapıldı");
            })
          }
        }
      ]
    });
    await alert.present();
  }
}
