import { Injectable } from "@angular/core";
import { AppComponent } from "../app.component";
// manually imported
// snippet : imp+tab
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

@Injectable({
  providedIn: "root",
})
export class WebSocketAPIService {
  // addEndpoint("/ws") on backend configuration
  webSocketEndPoint: string = "http://localhost:8080/ws";
  // @SendTo("/topic/greetings") on backend controller
  topic: string = "/topic/greetings";
  stompClient: any;
  appComponent: AppComponent;

  constructor(appComponent: AppComponent) {
    this.appComponent = appComponent;
  }

  onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + message);
    this.appComponent.handleMessage(JSON.stringify(message.body));
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  _connect() {
    console.log("Initialize WebSocket Connection");
    // snippet : new
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect(
      {},
      function (frame) {
        _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
          // calls the method above
          _this.onMessageReceived(sdkEvent);
        });
      },
      // calls the method above
      this.errorCallBack
    );
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  _send(message) {
    // @MessageMapping("/hello") on backend controller
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
  }
}
