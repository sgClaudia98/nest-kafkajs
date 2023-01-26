import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { TestConsumer } from "./consumers/test.consumer";
import { KafkaModule } from "./kafka/kafka.module";

@Module({
  imports: [KafkaModule],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
