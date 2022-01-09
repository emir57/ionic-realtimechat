import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FriendService } from '../services/friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  @Input() currentUserEmail:string;

  constructor(
    private modalController:ModalController,
    private friendService:FriendService
  ) { }

  ngOnInit() {

  }


  close(){
    this.modalController.dismiss();
  }
}
