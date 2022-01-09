import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-friends-request',
  templateUrl: './friends-request.page.html',
  styleUrls: ['./friends-request.page.scss'],
})
export class FriendsRequestPage implements OnInit {
  @Input() currentUserEmail:string;

  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {
    console.log(this.currentUserEmail)
  }

  close(){
    this.modalController.dismiss();
  }

}
