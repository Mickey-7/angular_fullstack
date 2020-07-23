import { Injectable } from "@angular/core";

import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  public stompClient;
  public msg = [];

  initializeWebClient() {
    const serverUrl = "http://localhost:8081/socket";
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe("/message", (message) => {
        if (message.body) {
          that.msg.push(message.body);
        }
      });
    });
  }

  constructor() {
    this.initializeWebClient();
  }

  sendMessage(message) {
    this.stompClient.send("/app/send/message", {}, message);
  }
}
