import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { TestConsumer } from "./kafka/consumers/test.consumer";
import { KafkaModule } from "./kafka/kafka.module";
import { APP_GUARD } from "@nestjs/core";
import {
  KeycloakConnectModule,
  RoleGuard,
  AuthGuard,
} from "nest-keycloak-connect";

@Module({
  imports: [
    KafkaModule,
    KeycloakConnectModule.register({
      authServerUrl: "http://keycloak:8080/auth",
      realm: "testing",
      clientId: "api-client",
      secret: "bcc74c94-1f0e-4957-a9d5-0cdfeb978e05",
      // Secret key of the client taken from keycloak server
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // TestConsumer,
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
