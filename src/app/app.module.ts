import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RoomPage } from '../pages/room/room';
import { SigninPage } from '../pages/signin/signin';
//import { SigninPageModule } from '../pages/signin/signin.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
export const firebaseConfig = {
  apiKey: 'AIzaSyAvD0ftnENGOCvE9cOPB8AklV7JeMY4cfg',
  authDomain: 'blogersguild1.firebaseapp.com',
  databaseURL: 'https://blogersguild1.firebaseio.com',
  projectId: 'blogersguild1',
  storageBucket: 'blogersguild1.appspot.com',
  messagingSenderId: '1091781872346'
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RoomPage,
    SigninPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RoomPage,
    SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
