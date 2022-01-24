import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GroupModel } from '../models/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  @Input() group:GroupModel;

  sendMessageForm:FormGroup
  constructor(
    private modalController:ModalController,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    console.log(this.group)
  }
  dismiss(){
    this.modalController.dismiss();
  }

}
