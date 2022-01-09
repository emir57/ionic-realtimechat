import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendsRequestPageRoutingModule } from './friends-request-routing.module';

import { FriendsRequestPage } from './friends-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsRequestPageRoutingModule
  ],
  declarations: [FriendsRequestPage]
})
export class FriendsRequestPageModule {}
