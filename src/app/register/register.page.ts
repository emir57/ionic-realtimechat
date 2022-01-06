import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm:FormGroup
  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

    createRegisterForm(){
      this.registerForm = this.formBuilder.group({
        firstName:['',[Validators.required,Validators.maxLength(20)]],
        lastName:['',[Validators.required,Validators.maxLength(20)]],
        email:['',[Validators.required,Validators.email,Validators.maxLength(50)]],
        password:['',[Validators.minLength(6),Validators.required]],
        confirmPassword:['',[Validators.minLength(6),Validators.required]]
      },{validators:this.checkPasswords})
  }

  register(){

  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }
}
