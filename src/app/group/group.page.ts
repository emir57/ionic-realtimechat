import { Component, Input, OnInit } from '@angular/core';
import { GroupModel } from '../models/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  @Input() group:GroupModel;

  constructor() { }

  ngOnInit() {
    console.log(this.group)
  }

}
