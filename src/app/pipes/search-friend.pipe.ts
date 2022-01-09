import { Pipe, PipeTransform } from '@angular/core';
import { FriendModel } from '../models/friendModel';

@Pipe({
  name: 'searchFriend'
})
export class SearchFriendPipe implements PipeTransform {

  transform(value: FriendModel[], ...args: unknown[]): FriendModel[] {
    return null;
  }

}
