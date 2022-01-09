import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends-request',
  templateUrl: './friends-request.page.html',
  styleUrls: ['./friends-request.page.scss'],
})
export class FriendsRequestPage implements OnInit {
  @Input() currentUserEmail:string;

  constructor() { }

  ngOnInit() {
    console.log(this.currentUserEmail)
  }

}
