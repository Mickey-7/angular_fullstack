import { Component } from "@angular/core";
import { MessageService } from "./service/message.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "websocket-frontend";

  input;

  constructor(public messageService: MessageService) {}

  sendMessage() {
    if (this.input) {
      this.messageService.sendMessage(this.input);
      this.input = "";
    }
  }
}
