import { Pipe, PipeTransform } from '@angular/core';
import { FriendRequestModel } from '../models/friendRequestModel';

@Pipe({
  name: 'searchFriendRequest'
})
export class SearchFriendRequestPipe implements PipeTransform {

  transform(value: FriendRequestModel[], ...args: unknown[]): FriendRequestModel[] {
    return null;
  }

}
