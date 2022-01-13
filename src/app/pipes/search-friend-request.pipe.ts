import { Pipe, PipeTransform } from '@angular/core';
import { FriendRequestModel } from '../models/friendRequestModel';

@Pipe({
  name: 'searchFriendRequest'
})
export class SearchFriendRequestPipe implements PipeTransform {

  transform(value: FriendRequestModel[], searchString: string): FriendRequestModel[] {
    searchString = searchString ? searchString.toLocaleLowerCase().trim() : "";
    return searchString ?
      value.filter(x => x.user.firstName.toLocaleLowerCase().indexOf(searchString) != -1 ||
        x.user.lastName.toLocaleLowerCase().indexOf(searchString) != -1 ||
        x.user.email.toLocaleLowerCase().indexOf(searchString) != -1 ||
        `${x.user.firstName} ${x.user.lastName}`.toLocaleLowerCase().indexOf(searchString) != -1) :
      value;
  }

}
