import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  localStream: MediaStream;
  peer;
  existingCall: any;
  userid: string = "";
  myid: string;
  constructor(public navCtrl: NavController) {

  }
  ngOnInit() { }

  ionViewDidLoad() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        let video = <HTMLVideoElement>document.getElementById('my-video');
        video.srcObject = stream;
        this.localStream = stream;
      }).catch(err => {
        alert(err);
        return;
      });
    this.peer = new Peer({
      key: '11d26de3-711f-4a5f-aa60-30142aeb70d9',
      debug: 3
    });
    this.peer.on('open', () => {
      $('#my-id').text(this.peer.id);//this.peer.connections.id);
      this.myid = this.peer.id;
    });
    this.peer.on('error', err => {
      alert(err.message);
    });
    this.peer.on('close', () => {
    });
    this.peer.on('disconnected', () => {
    });
    this.peer.on('call', call => {
      call.answer(this.localStream);
      this.setupCallEventHandlers(call);
    });
  }

  clickCall(formValue) {
    //e.preventDefault();
    //let a = <HTMLInputElement>document.getElementById('callto-id');
    //let b = a.value;
    //$("#confid").text(b);
    let call = this.peer.call(formValue.calltoid, this.localStream);
    this.setupCallEventHandlers(call);
  };
  clickEnd() {
    this.existingCall.close();
  };
  setupCallEventHandlers(call) {
    if (this.existingCall) {
      this.existingCall.close();
    };
    call.on('stream', stream => {
      this.addVideo(call, stream);
      this.setupEndCallUI();
      $('#their-id').text(call.remoteId);
    });
    call.on('close', () => {
      this.removeVideo(call.remoteId);
      this.setupMakeCallUI();
    });
    this.existingCall = call;
    // 省略
  }
  addVideo(call, stream) {
    let video = <HTMLVideoElement>document.getElementById('their-video');
    video.srcObject = stream;
    //$('#their-video').get(0).srcObject = stream;
    //this.theirVideo.srcObject = stream;
  }
  removeVideo(peerId) {
    let video = <HTMLVideoElement>document.getElementById('their-video');
    video.srcObject = undefined;
    //$('#their-video').get(0).srcObject = undefined;
    //this.theirVideo.srcObject = undefined;
  }
  setupMakeCallUI() {
    $('#make-call').show();
    $('#end-call').hide();
  }
  setupEndCallUI() {
    $('#make-call').hide();
    $('#end-call').show();
  }
}
