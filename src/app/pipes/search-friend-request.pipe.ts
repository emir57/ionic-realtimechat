import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFriendRequest'
})
export class SearchFriendRequestPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
