import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileUrls } from '../models/profileUrls';
import { User } from '../models/user';
import { MessageService } from '../services/message.service';
import { KeyType, StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  isOk = true;
  currentUser: User
  updateForm: FormGroup
  profileUrls: any[] = ProfileUrls
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    await this.getCurrentUser();
    this.createUpdateForm();
  }
  async getCurrentUser() {
    this.currentUser = JSON.parse(await this.storageService.checkName(KeyType.User));
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [this.currentUser.id],
      firstName: [this.currentUser.firstName, [Validators.maxLength(20)]],
      lastName: [this.currentUser.lastName, [Validators.maxLength(20)]],
      phoneNumber: [this.currentUser.phoneNumber],
      email: [this.currentUser.email, [Validators.email]],
      profileUrl: [this.currentUser.profileUrl]
    })
  }
  update() {
    if (this.updateForm.valid) {
      this.isOk = false;
      let user = Object.assign({}, this.updateForm.value);
      this.userService.updateUser(user).then(() => {
        localStorage.setItem("user", JSON.stringify(user));
        this.messageService.showMessage("Güncelleniyor");
        setTimeout(() => {
          this.router.navigate(["home"]);
        }, 500);
        setTimeout(() => {
          this.messageService.showMessage("Başarıyla güncellendi.");
          window.location.reload();
        }, 500);
      })
    }
  }

}
