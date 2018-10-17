import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import * as firebase from 'firebase';
import { RoomPage } from '../room/room';
import { SigninPage } from '../signin/signin';
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  roomkey: string;
  nickname: string;
  chatMessage: string;
  chats = [];
  offStatus = false;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //this.roomkey = this.route.snapshot.paramMap.get('key') as string;
        this.roomkey = this.navParams.data.id;
        this.nickname = user.displayName;

        this.sendJoinMessage();
        this.displayChatMessage();

      } else {
        this.navCtrl.push(SigninPage);
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }
  displayChatMessage() {
    firebase.database()
      .ref('chatrooms/' + this.roomkey + '/chats')
      .on('value', resp => {
        if (resp) {
          this.chats = [];
          resp.forEach(childSnapshot => {
            const chat = childSnapshot.val();
            chat.key = childSnapshot.key;
            this.chats.push(chat);
          });
          setTimeout(async () => {
            if (this.offStatus === false) {
              // FIX-ME
              // V4でコンテンツエリアをスクロールする方法が分からない
              const el = await this.content.getScrollElement();
            }
          });
        }
      });
  }
  exitChat() {
    this.sendExitMessage();
    this.offStatus = true;
    this.navCtrl.push(RoomPage);
  }
  sendChatMessage() {
    this.sendMessage('message', this.chatMessage);
  }
  sendJoinMessage() {
    this.sendMessage('join', this.nickname + ' has joined this room.');
  }
  sendExitMessage() {
    this.sendMessage('exit', this.nickname + ' has exited this room.');
  }
  sendMessage(type: string, message: string) {
    const newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: type,
      user: this.nickname,
      message: message,
      sendDate: Date()
    });
  }
}
