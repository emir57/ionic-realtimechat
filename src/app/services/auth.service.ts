import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authService:AngularFireAuth
  ) { }

  login(){

  }
  register(){

  }
  signOut(){

  }
  resetPassword(){

  }
}
