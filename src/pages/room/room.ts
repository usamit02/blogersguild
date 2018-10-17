import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }
  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      } else {
        this.navCtrl.push(SigninPage);
      }
    });
  }
  async signOut() {
    try {
      await firebase.auth().signOut();
      this.navCtrl.push(SigninPage);

    } catch (error) { }
  }
}