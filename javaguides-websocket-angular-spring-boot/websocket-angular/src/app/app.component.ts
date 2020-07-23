import { Component } from "@angular/core";
import { WebSocketAPIService } from "./service/web-socket-api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "websocket-angular";

  greeting: any;
  name: string;

  webSocketAPI: WebSocketAPIService;

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPIService(new AppComponent());
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message) {
    this.greeting = message;
  }
}
