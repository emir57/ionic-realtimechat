import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFriendPipe } from '../search-friend.pipe';
import { SearchFriendRequestPipe } from '../search-friend-request.pipe';



@NgModule({
  declarations: [SearchFriendPipe,SearchFriendRequestPipe],
  imports: [
    CommonModule
  ],
  exports:[SearchFriendPipe,SearchFriendRequestPipe]
})
export class PipesModule { }
