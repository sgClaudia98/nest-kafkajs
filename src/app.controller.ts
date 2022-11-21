import { Controller, Get } from "@nestjs/common";
import {
  KeycloakConnectModule,
  KeycloakCredentials,
  Public,
  Roles,
  Unprotected,
} from "nest-keycloak-connect";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Unprotected()
  getHello() {
    return this.appService.testing();
  }

  @Get("/anonymouse")
  @Unprotected()
  getAnonymouse(): string {
    return `Hello anonymouse`;
  }

  @Get("/user")
  @Roles({ roles: ["nestjs-kafka:kafka-user"] })
  getUser(): string {
    return `Hello user`;
  }

  @Get("/admin")
  @Roles({ roles: ["nestjs-kafka:kafka-admin"] })
  getAdmin(): string {
    return `Hello admin`;
  }

  @Get("/all_users")
  getAll(): string {
    return `Hello all users`;
  }
}
