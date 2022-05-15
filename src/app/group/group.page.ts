import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GroupModel } from '../models/group';
import { ChatService } from '../services/chat.service';
import { Message } from "../models/message";
import { User } from '../models/user';
import $ from "jquery";
@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  @Input() group: GroupModel;
  @Input() currentUser: User;

  isLoad = true;
  chats: Message[] = []
  message: string = "";
  emoji = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '☺', '🙂', '🤗', '🤔', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '🤓', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '☹', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '😬', '😰', '😱', '😳', '😵', '😡', '😠', '😇', '🤠', '🤡', '🤥', '😷', '🤒', '🤕', '🤢', '🤧', '😈', '👿', '👹', '👺', '💀', '☠', '👻', '👽', '👾', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '👦', , '👧', '👧🏻', '👧🏼', '👨', '👩', '👩🏻', '👩🏼', '👴', , '👵', '👵🏻', '👵🏿', '👶', '👼', '👮', '🕵', '💂', '👷', '👳', '👱', '🎅', '🤶', '👸', '🤴', '👰', '🤵', '🤰', '👲', '🙍', '🙍🏻', '🙍🏼', '🙎', '🙎🏻', '🙎🏼', '🙅', '🙅🏻', '🙅🏼', '🙆', '🙆🏻', '🙆🏼', '💁', '💁🏻', '💁🏼', '🙋', '🙇', '🤦', '🤦🏻', '🤦🏼', '🤷', '🤷🏻', '🤷🏼', '💆', '💇', '💇🏻', '💃', , '🏂', '🏌', '🏄', '🏄🏻', '🏄🏼', '🏄🏽', '🏄🏾', '🏄🏿', '🚣', '🚣🏻', '🚣🏼', '🚣🏽', '🚣🏾', '🚣🏿', '🏊', '🏊🏻', '🏊🏼', '🏊🏽', '🏊🏾', '🏊🏿', '⛹', '⛹🏻', '⛹🏼', '⛹🏽', '⛹🏾', '⛹🏿', '🚵', '🏎', '🏍', '🤸', '🤸🏻', '🤸🏼', '🤸🏽', '🤸🏾', '🤸🏿', '🤼', '🤽', '🤾', , '👫', '👬', '👭', '💏', '👩‍❤️‍💋‍👨', '👨‍❤️‍💋‍👨', '👩‍❤️‍💋‍👩', '💑', '👩‍❤️‍👨', '👨‍❤️‍👨', '👩‍❤️‍👩', '👪', '👨‍👩‍👦', '👨‍👩‍👧', '👨‍👩‍👧‍👦', '👨‍👩‍👦‍👦', '👨‍👩‍👧‍👧', '👨‍👨‍👦', '👨‍👨‍👧', '👨‍👨‍👧‍👦', '👨‍👨‍👦‍👦', '👨‍👨‍👧‍👧', '👩‍👩‍👦', '👩‍👩‍👧', '👩‍👩‍👧‍👦', '👩‍👩‍👦‍👦', '👩‍👩‍👧‍👧', '🏻', '🏼', '🏽', '🏾', '🏿', '💪', '🤳', '👈', '👉', '☝', '👆', '🖕', '👇', '✌', '🤞', '🖖', '🤘', '🤙', '🖐', '✋', '👌', '👍', '👎', '✊', '👊', '🤛', '🤜', '🤚', '👋', '👏', '✍', '👐', , '🙌', '🙏', '🤝', '💅', '👂', '👃', '👣', '👀', '👁', '👁‍🗨', '👅', '👄', '💋', '💘', '❤', '💓', '💔', '💕', '💖', '💗', '💙', '💚', '💛', '💜', '🖤', '💝', '💞', '💟', '❣', '💌', '💣', '💥', '💦', '💨', '💫', '💬', '🗨', '🗯', '👔', '👕', '👖', '👚', '👛', '👜', '👝', '🛍', '🎒', '👞', '👟', '👠', '👡', '👑', '👒', '🎩', '🎓', '📿', '💄', '💍', '💎', '🐵', '🐒', '🐱', '🐈', '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦌', '🐄', '🐹', '🐰', '🐇', '🐿', '🦇', '🐻', '🐨', '🐼', '🐾', '🦃', '🐔', '🐓', '🐣', '🐤', '🐥', '🦆', '🦉', '🐍', '🐲', '🐉', '🐳', '🐋', '🐬', '🐟', '🐠', '🐡', '🦈', '🐙', '🐚', '🐌', '🐛', '🐜', '💐', '🌸', '🌺', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '☘', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🥝', '🍅', '🥑', '🍆', '🥜', '🌰', '🍞', '🥐', '🥖', '🥞', '🧀', '🍖', '🍗', '🥓', '🍔', '🍟', '🍕', '🌭', '🌮', '🍥', '🍡', '🍦', '🍧', '🍨', '🍩', '🍮', '🍯', '🍼', '🥛', '☕', '🍵', '🍶', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻', '🥂', '🥃', '🍽', '🍴', '🥄', '🔪', '🏺', '🌍', '🌎', '🌏', '🌐', '⛲', '⌚', '⏰', '⏱', '⏲', '🕰', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌟', '🌠', '⚡', '🔥', '💧'];
  constructor(
    private modalController: ModalController,
    private chatService: ChatService,
  ) {
  }

  ngOnInit() {
    this.emojiSettings();
    this.getMessages();
    this.setScrollPosition();
  }

  showEmojis() {
    $("#emojisBackground").show();
    $("#emojis").fadeToggle();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  sendMessage() {
    this.message = this.message.trim();
    if (this.message.length >= 1) {
      let message = Object.assign({
        text: this.message,
        groupId: this.group.id,
        user: this.currentUser
      });
      this.chatService.add(message)
      this.message = "";
      this.setScrollPosition();
      $("#emojisBackground").hide();
      $("#emojis").hide();
    }
  }

  getMessages() {
    this.chatService.getChatsByGroupId(this.group.id).subscribe(chats => {
      this.chats = chats;
      this.setScrollPosition();
      this.isLoad = false;
    })
  }

  getDate(dateString: string) {
    let date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getDay();
    return `${day}.${month}.${year} - ${hours}:${minutes}`
  }

  setScrollPosition() {
    setTimeout(() => {
      const messageDiv = document.getElementById("messageDiv");
      let maxHeight = messageDiv.scrollHeight;
      messageDiv.scrollTop = maxHeight;
    }, 100);
  }

  emojiSettings() {
    var emojisBackground = $("#emojisBackground");
    emojisBackground.click(function () {
      $("#emojis").fadeOut();
      $(this).hide();
    })
    var emojisDiv = document.getElementById("emojis");
    var input = document.getElementById("input")
    this.emoji.forEach((e, i) => {
      emojisDiv.innerHTML += `
        <span id="emoji${i}">${e}</span>
      `;

    });
    this.emoji.forEach((e, i) => {
      document.getElementById("emoji" + i).addEventListener("click", function () {
        $("#input").val($("#input").val() + e)
      })
    })
  }

}
