import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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

  login(loginModel:LoginModel){
    return this.authService.signInWithEmailAndPassword(loginModel.email,loginModel.password);
  }
  register(registerModel:RegisterModel){
    return this.authService.createUserWithEmailAndPassword(registerModel.email,registerModel.password).then(()=>{
      this.userService.addUser(registerModel)
    })
  }
  signOut(){
    return this.authService.signOut();
  }
  resetPassword(email:string){
    return this.authService.sendPasswordResetEmail(email);
  }
}
