import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastController:ToastController
  ) { }

  GetErrorMessage(code):string{
    if(code==="auth/user-not-found") return "Kullanıcı Bulunanamadı.";

    return "";
  }

  async showMessage(message:string,duration=2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
