import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastController:ToastController
  ) { }

  GetErrorMessage(error):string{
    if(error==="") return "";

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
