import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GroupModel } from '../models/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  @Input() group:GroupModel;

  message:string="";
  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {

  }
  dismiss(){
    this.modalController.dismiss();
  }


}
