import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TextToSpeech } from '@ionic-native/text-to-speech';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messages: any[] = [];
  inputText: string = '';

  constructor(
    public navCtrl: NavController,
    public ngZone: NgZone,
    public tts: TextToSpeech
  ) {
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
        this.tts.speak({
          text: response.result.fulfillment.speech,
          locale: 'en-UK',
          rate: 1
        });
      },
      error => {
        alert(error);
      }
    );
  }
}
