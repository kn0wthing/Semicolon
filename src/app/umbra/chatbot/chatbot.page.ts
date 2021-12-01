import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
})

/*
message: message from sender
repy: reply from umbra app
messages: to store all conversation
sessionId: session Id of logged in user
*/

export class ChatbotPage implements OnInit {
  public message: string;
  public reply: string;
  public messages: string[] = [];
  private sessionId: string = "";
  public chatData;

  constructor(
    public chatsevice: ProductsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.sessionId = this.userService.getChatSessionId();
  }

  public sendMessage(): void {
    this.messages.push(this.message);

    var chatHistory = document.getElementById("scroll");
    chatHistory.scrollTop = chatHistory.scrollHeight;

    setTimeout(() => {
      this.chatsevice.getChatResponse(this.sessionId, this.message).subscribe(
        (res) => {
          this.chatData = res;
          this.reply = this.chatData.generic[0].text;
          this.messages.push(this.reply);
          var chatHistory = document.getElementById("scroll");
          chatHistory.scrollTop = chatHistory.scrollHeight;
        },
        (error) => {
          alert("Internal server error");
        }
      );
      this.message = "";
    }, 2000);
  }

}
