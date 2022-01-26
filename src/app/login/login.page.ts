import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginModel } from '../models/loginModel';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isOk = true;
  loginForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private alertController: AlertController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['emir.gurbuz06@hotmail.com', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['123456', [Validators.minLength(6), Validators.required]],
      phone: ['+90', [Validators.minLength(6), Validators.required]],
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
          this.messageService.showMessage("Giriş Başarılı");
          this.router.navigate(["home"])
        }, 1300);

      }).catch(error => {
        let message = this.messageService.GetErrorMessage(error.code);
        this.messageService.showMessage(message);
      }).finally(() => {
        setTimeout(() => {
          this.isOk = true;
        }, 1000);
      })
    }
  }
  loginWithPhone(){
    if (this.loginForm.valid) {
      this.authService.loginWithPhone(this.loginForm.get("phone").value).then((confirmationResult)=>{
        var code = window.prompt("please your code");
        return confirmationResult.confirm(code);
      }).then(()=>{
        this.userService.getUser(this.loginForm.get("phone").value).subscribe(user => {
          localStorage.setItem("user", JSON.stringify(user));
        })
        setTimeout(() => {
          this.messageService.showMessage("Giriş Başarılı");
          this.router.navigate(["home"])
        }, 1300);
      })
      .catch((error)=>console.log(error))
    }
  }

  async showResetPasswordBox() {
    const alert = await this.alertController.create({
      header: 'Şifremi Unuttum',
      inputs: [
        {
          name: 'email',
          type: 'email',
          value:this.loginForm.get("email").value,
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
          text: 'Gönder',
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

}
