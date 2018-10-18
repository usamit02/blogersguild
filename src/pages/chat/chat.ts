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
  user;
  message: string;
  chats = [];
  users = [];
  offStatus = false;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    firebase.auth().onAuthStateChanged((firebaseuser) => {
      if (firebaseuser) {
        this.user = firebaseuser;
        this.roomkey = this.navParams.data.id;
        const ref = firebase.database().ref('chatrooms/' + this.roomkey + '/user/' + this.user.uid);
        ref.set({
          displayName: this.user.displayName,
          date: Date()
        });
        firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
          if (resp) {
            this.chats = [];
            resp.forEach(childSnapshot => {
              const chat = childSnapshot.val();
              chat.key = childSnapshot.key;
              this.chats.push(chat);
            });
            setTimeout(async () => {
              if (this.offStatus === false) {
                const el = await this.content.getScrollElement();
              }
            });
          }
        });
        firebase.database().ref('chatrooms/' + this.roomkey + '/user').on('value', resp => {
          if (resp) {
            this.users = [];
            resp.forEach(childSnapshot => {
              const usr = childSnapshot.val();
              usr.key = childSnapshot.key;
              this.users.push(usr);
            });
            setTimeout(async () => {
              if (this.offStatus === false) {
                const el = await this.content.getScrollElement();
              }
            });
          }
        });
      } else {
        this.navCtrl.push(SigninPage);
      }
    });
  }
  ionViewDidLoad() {
  }
  exitChat() {
    const ref = firebase.database().ref('chatrooms/' + this.roomkey + '/user/' + this.user.uid);
    ref.remove();
    this.offStatus = true;
    this.navCtrl.push(RoomPage);
  }
  sendMessage() {
    const newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      user: this.user.displayName,
      message: this.message,
      sendDate: Date()
    });
  }
}
