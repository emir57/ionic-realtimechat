import { Injectable } from '@angular/core';
import * as Swal from "../../../src/sweetalert2.all.min";
@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showSuccessMessage(options: Partial<MessageOptions>) {
    const Toast = Swal.mixin({
      toast: true,
      position: options.position ?? MessagePosition.Top,
      showConfirmButton: options.showConfirmButton ?? false,
      timer: options.timer ?? 3000,
      timerProgressBar: options.timerProgressBar ?? true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: options.title
    })
  }

  showErrorMessage(options: Partial<MessageOptions>) {
    const Toast = Swal.mixin({
      toast: true,
      position: options.position ?? MessagePosition.Top,
      showConfirmButton: options.showConfirmButton ?? false,
      timer: options.timer ?? 3000,
      timerProgressBar: options.timerProgressBar ?? true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: options.title
    })
  }

  showWarningMessage(options: Partial<MessageOptions>) {
    const Toast = Swal.mixin({
      toast: true,
      position: options.position ?? MessagePosition.Top,
      showConfirmButton: options.showConfirmButton ?? false,
      timer: options.timer ?? 3000,
      timerProgressBar: options.timerProgressBar ?? true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'warning',
      title: options.title
    })
  }

}

export class MessageOptions {
  title: string;
  position?: MessagePosition = MessagePosition.Top;
  timer?: number = 1500;
  showConfirmButton?: boolean = false;
  timerProgressBar?: boolean = true;
}
export enum MessagePosition {
  Top = "top-start",
  Bottom = "bottom-start",
}
