import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendsRequestPage } from './friends-request.page';

const routes: Routes = [
  {
    path: '',
    component: FriendsRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsRequestPageRoutingModule {}
