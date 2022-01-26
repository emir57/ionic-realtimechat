import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  currentUser:User
  updateForm:FormGroup
  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));;
    this.createUpdateForm();

  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      firstName:[this.currentUser.firstName,[Validators.maxLength(20)]],
      lastName:[this.currentUser.lastName,[Validators.maxLength(20)]],
      email:[this.currentUser.email,[Validators.email]]
    })
  }

}
