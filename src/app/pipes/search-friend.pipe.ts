import { Pipe, PipeTransform } from '@angular/core';
import { FriendModel } from '../models/friendModel';

@Pipe({
  name: 'searchFriend'
})
export class SearchFriendPipe implements PipeTransform {

  transform(value: FriendModel[], searchString:string): FriendModel[] {
    searchString = searchString ? searchString.toLocaleLowerCase():"";
    return searchString ?
      value.filter(x=>x.user.firstName.toLocaleLowerCase().indexOf(searchString)!=-1 ||
      x.user.lastName.toLocaleLowerCase().indexOf(searchString)!=-1||
      x.user.email.toLocaleLowerCase().indexOf(searchString)!=-1):
      value;
  }

}
