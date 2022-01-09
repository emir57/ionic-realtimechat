import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFriend'
})
export class SearchFriendPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
