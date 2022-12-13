import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KafkaModule } from "./kafka/kafka.module";
import { APP_GUARD } from "@nestjs/core";
import {
  KeycloakConnectModule,
  RoleGuard,
  AuthGuard,
  TokenValidation,
} from "nest-keycloak-connect";
import { TestConsumer } from "./kafka/consumers/test.consumer";

@Module({
  imports: [
    KafkaModule,
    KeycloakConnectModule.register({
      serverUrl: process.env.KEYCLOAK_API_CONNECT,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      // Secret key of the client taken from keycloak server
      secret: process.env.KEYCLOAK_SECRET,
      // Validation setup for dev-mode
      tokenValidation: TokenValidation.OFFLINE,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TestConsumer,
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
