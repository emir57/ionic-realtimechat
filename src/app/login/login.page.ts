import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../models/loginModel';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isOk = true;
  loginForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.minLength(6), Validators.required]],
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel:LoginModel = this.loginForm.value;
      
    }
  }

}
