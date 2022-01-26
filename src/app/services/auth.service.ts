import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authService:AngularFireAuth,
    private userService:UserService
  ) { }
  loginWithPhone(phone_number:string){
    const appVerifier = new firebase.default.auth.RecaptchaVerifier("phone-sign-in-recaptcha",{
      "size":"invisible"
    })
    return this.authService.signInWithPhoneNumber(phone_number,appVerifier)
  }


  loginWithEmail(loginModel:LoginModel){
    return this.authService.signInWithEmailAndPassword(loginModel.email,loginModel.password);
  }
  registerWithEmail(registerModel:RegisterModel){
    return this.authService.createUserWithEmailAndPassword(registerModel.email,registerModel.password).then(()=>{
      this.userService.addUser(registerModel)
    })
  }
  signOut(){
    return this.authService.signOut();
  }
  resetPasswordWithEmail(email:string){
    return this.authService.sendPasswordResetEmail(email);
  }
}
