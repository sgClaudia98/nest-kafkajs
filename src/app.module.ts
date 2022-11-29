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
  TokenValidation,
} from "nest-keycloak-connect";

@Module({
  imports: [
    KafkaModule,
    KeycloakConnectModule.register({
      serverUrl: "http://localhost:8080",
      realm: "testing",
      clientId: "api-client",
      // Secret key of the client taken from keycloak server
      secret: "bcc74c94-1f0e-4957-a9d5-0cdfeb978e05",
      // Validation setup and public key config
      tokenValidation: TokenValidation.OFFLINE,
      realmPublicKey:
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoqASg2L0wSCDgSYsuxj5AMLIzId2AQbz2bsdEvpGNshbvI+f5dOydpcXFILBVAYwamYvNjwMPcILy/rvN0uL6DEOMS/ZW93r4c+knwzwdUB6bSPVUunj/SaEUURORfczq2MGivw4bKL4AGI8hRDtF/Gkz6IDR+LjudaVrIJ4ae3UNJLC2wS7q9vz74NHnlL9XjQJX9k1/zZhVLWg1B/XkmVt5VLFj+tLAw0DNTrrXTt7xIQbGAOdy1IwNJ3ottLYReouyFZLWeiHCHpJOd9JPYk66Qyw2SeNxv40R6akyYxxVwudpaNKNWWlV1pXFHShynDXxDi+mZPd652Al+n0nwIDAQAB",
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
