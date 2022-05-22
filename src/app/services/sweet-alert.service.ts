import { Injectable } from '@angular/core';
import { Swal } from "../../../src/sweetalert2.all.min";
@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showSuccessMessage() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

  showErrorMessage() {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

}

export class MessageOptions {
  title: string;
  message: string;
  position?: MessagePosition = MessagePosition.Top;
  timer?: number = 1500;
  showConfirmButton?: boolean = false;
}
export enum MessagePosition {
  Top = "top-start",
  Bottm = "bottom-start",
}
