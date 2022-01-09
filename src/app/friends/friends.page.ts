import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  @Input() currentUserEmail:string;

  constructor() { }

  ngOnInit() {

  }


  close(){

  }
}
