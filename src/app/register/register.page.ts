import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from '../models/registerModel';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isOk=true;
  registerForm:FormGroup
  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private messageService:MessageService,
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
    if(this.registerForm.valid){
      this.isOk=false;
      let user:RegisterModel=Object.assign({},this.registerForm.value);
      this.authService.registerWithEmail(user).then(()=>{
        setTimeout(() => {
          this.messageService.showMessage("Başarıyla Kayıt Olundu");
          this.isOk=true;
          this.router.navigate(["login"])
        }, 2000);
      })
    }
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }
}
