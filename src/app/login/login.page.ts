import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { $ } from "jquery";
import { ProfileUrls } from '../models/profileUrls';
import { KeyType, StorageService } from '../services/storage.service';
import { SweetAlertService } from '../services/sweet-alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isOk = true;
  statusRegisterButton = true;
  statusResetPasswordButton = true;
  loginForm: FormGroup;
  profileUrl: any[] = ProfileUrls
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private alertController: AlertController,
    private userService: UserService,
    private storageService: StorageService,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit() {
    this.createLoginForm();

  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['emir.gurbuz06@hotmail.com', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['123456', [Validators.minLength(6), Validators.required]],
      phone: ['+90', [Validators.minLength(13), Validators.required]],
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.isOk = false;
      let loginModel: LoginModel = this.loginForm.value;
      this.authService.loginWithEmail(loginModel).then((msg) => {
        this.userService.getUser(loginModel.email).subscribe(user => {
          localStorage.setItem("user", JSON.stringify(user));
        })
        setTimeout(() => {
          this.sweetAlertService.showSuccessMessage({
            title: "Giri?? Ba??ar??l??"
          });
          this.router.navigate(["home"])
        }, 1300);

      }).catch(error => {
        this.sweetAlertService.showErrorMessage({
          title: this.messageService.GetErrorMessage(error.code)
        })
      }).finally(() => {
        setTimeout(() => {
          this.isOk = true;
        }, 1000);
      })
    }
  }
  async loginWithPhone() {
    if (this.loginForm.valid) {
      this.isOk = false;
      let getPhoneNumber = this.loginForm.get("phone").value;
      let phoneNumber = "";
      if (!getPhoneNumber.startsWith("+90")) {
        phoneNumber = "+90";
      }
      for (let i = 0; i < getPhoneNumber.length; i++) {
        const c = getPhoneNumber[i];
        phoneNumber += c == " " ? "" : c;
      }
      this.authService.loginWithPhone(phoneNumber)
        .then(async (confirmationResult) => {
          var code = await this.GetCode();
          code.subscribe(code => {
            return confirmationResult.confirm(code)
              .then(() => {
                this.userService.checkUserByPhone(phoneNumber).subscribe(status => {
                  this.userService.getUserByPhone(phoneNumber).subscribe(async getUser => {
                    if (status == false) {
                      let user = Object.assign({
                        id: getUser.id,
                        firstName: phoneNumber,
                        lastName: "",
                        email: "",
                        profileUrl: this.profileUrl[0].url,
                        phoneNumber: phoneNumber
                      })
                      this.userService.addUser(user).then(async () => {
                        await this.storageService.setName(KeyType.User, JSON.stringify(user));
                      })
                    } else {
                      await this.storageService.setName(KeyType.User, JSON.stringify(getUser));
                    }
                  })
                })
                setTimeout(() => {
                  this.sweetAlertService.showSuccessMessage({
                    title: "Giri?? Ba??ar??l??"
                  });
                  this.isOk = true;
                  this.router.navigate(["home"])
                }, 1300);
              })
              .catch((error) => {
                this.sweetAlertService.showErrorMessage({
                  title: this.messageService.GetErrorMessage(error.code)
                })
              });
          })
        })
        .catch((error) => {
          this.sweetAlertService.showErrorMessage({
            title: this.messageService.GetErrorMessage(error.code)
          })
        })
    }
  }

  async showResetPasswordBox() {
    const alert = await this.alertController.create({
      header: '??ifremi Unuttum',
      inputs: [
        {
          name: 'email',
          type: 'email',
          value: this.loginForm.get("email").value,
          placeholder: 'email@example.com'
        },
      ],
      buttons: [
        {
          text: 'Kapat',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'G??nder',
          handler: (value) => {
            this.authService.resetPasswordWithEmail(value.email).catch(error => {
              let message = this.messageService.GetErrorMessage(error.code)
              this.messageService.showMessage(message);
            })
          }
        }
      ]
    });

    await alert.present();
  }
  async GetCode(): Promise<Observable<string>> {
    let subject = new Subject<string>();
    const alert = await this.alertController.create({
      header: 'Telefon numaran??za gelen do??rulama kodunu giriniz.',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Do??rulama Kodu'
        },
      ],
      buttons: [
        {
          text: 'Do??rula',
          handler: (value) => {
            return subject.next(value.name1)
          }
        }
      ]
    });

    await alert.present();
    return subject.asObservable();
  }

}
