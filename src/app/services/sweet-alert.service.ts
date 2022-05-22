import { Injectable } from '@angular/core';
import * as Swal from "../../../src/sweetalert2.all.min";
@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showSuccessMessage(options: Partial<MessageOptions>) {
    Swal.fire({
      position: options.position ?? MessagePosition.Top,
      icon: 'success',
      title: options.title,
      showConfirmButton: options.showConfirmButton ?? false,
      timer: options.timer ?? 1500
    })
  }

  showErrorMessage(options: Partial<MessageOptions>) {
    Swal.fire({
      position: options.position ?? MessagePosition.Top,
      icon: 'error',
      title: options.title,
      showConfirmButton: options.showConfirmButton ?? false,
      timer: options.timer ?? 1500
    })
  }

}

export class MessageOptions {
  title: string;
  position?: MessagePosition = MessagePosition.Top;
  timer?: number = 1500;
  showConfirmButton?: boolean = false;
}
export enum MessagePosition {
  Top = "top-start",
  Bottom = "bottom-start",
}
