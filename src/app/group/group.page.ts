import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.createSendMessageForm();
  }
  dismiss(){
    this.modalController.dismiss();
  }
  createSendMessageForm(){
    this.sendMessageForm = this.formBuilder.group({
      message:["",[Validators.required,Validators.maxLength(255)]]
    })
  }

}
