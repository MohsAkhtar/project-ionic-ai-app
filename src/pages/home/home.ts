import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messages: any[] = [];
  inputText: string = '';

  constructor(public navCtrl: NavController, public ngZone: NgZone) {
    this.messages.push({
      text: 'Hi, how can I help you?',
      sender: 'api'
    });
  }

  sendText() {
    let message = this.inputText;

    this.messages.push({
      text: message,
      sender: 'me'
    });

    this.inputText = '';

    window['ApiAIPlugin'].requestText(
      {
        query: message
      },
      response => {
        this.ngZone.run(() => {
          this.messages.push({
            text: response.result.fulfillment.speech,
            sender: 'api'
          });
        });
      },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }

  sendVoice() {
    window['ApiAIPlugin'].requestVoice(
      {},
      response => {
        alert(response.result.fulfillment.speech);
      },
      error => {
        alert(error);
      }
    );
  }
}
