import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  constructor(
    private loadingController: LoadingController
  ) { }

  async showLoading(message?: string) {
    const loading = await this.loadingController.create({
      message: message ?? "Yükleniyor...",
      duration: 4000
    });
    return await loading.present();
  }

  async closeLoading(){
    await this.loadingController.dismiss();
  }

}
