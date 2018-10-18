import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  rooms = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref('chatrooms/').on('value', resp => {
          if (resp) {
            this.rooms = [];
            resp.forEach(childSnapshot => {
              const room = childSnapshot.val();
              room.key = childSnapshot.key;
              this.rooms.push(room);
            });
          }
        });
      } else {
        this.navCtrl.push('SigninPage', {});
      }
    });
  }
  async signOut() {
    try {
      await firebase.auth().signOut();
      this.navCtrl.push('SigninPage', {});

    } catch (error) { }
  }
  addRoom() {
    this.navCtrl.push('AddRoomPage', {});
  }
  joinRoom(rid) {
    this.navCtrl.push('ChatPage', { id: rid });
  }
}