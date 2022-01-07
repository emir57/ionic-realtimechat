import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastController: ToastController
  ) { }

  GetErrorMessage(code): string {

    switch (code) {
      case "auth/user-not-found":
        return "Kullanıcı Bulunanamadı.";
      case "auth/wrong-password":
        return "Eposta veya parola hatalı";

      default:
        break;
    }
    return "";
  }

  async showMessage(message: string, duration = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
