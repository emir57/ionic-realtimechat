import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isOk=true;
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private messageService:MessageService
  ) { }

  ngOnInit() {
  }

}
