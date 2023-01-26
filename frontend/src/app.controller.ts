import { Body, Controller, Get, Post } from "@nestjs/common";
import { Roles, Unprotected } from "nest-keycloak-connect";
import { AppService } from "./app.service";
import { MessageDto } from "./kafka/messages.interfaces";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Unprotected()
  getHello() {
    return "Hello World";
  }

  @Post("/")
  @Unprotected()
  createMessage(@Body() message: MessageDto) {
    return this.appService.sendMessage(message);
  }

  @Get("/anonymouse")
  @Unprotected()
  getAnonymouse(): string {
    return `Hello anonymouse`;
  }

  @Get("/user")
  @Roles({ roles: ["realm:user"] })
  getUser(): string {
    return `Hello user`;
  }

  @Get("/admin")
  @Roles({ roles: ["realm:admin"] })
  getAdmin(): string {
    return `Hello admin`;
  }

  @Get("/all_users")
  getAll(): string {
    return `Hello all users`;
  }
}
