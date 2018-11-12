import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messages: any[] = [];
  inputText: string = '';

  constructor(public navCtrl: NavController) {
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
        this.messages.push({
          text: response.result.fullfilment.speech,
          sender: 'ai'
        });
      },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }
}
