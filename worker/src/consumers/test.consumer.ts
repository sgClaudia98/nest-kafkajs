import { Injectable, OnModuleInit } from "@nestjs/common";
import { AppService } from "src/app.service";
import { ConsumerService } from "src/kafka/consumer.service";
import { MessageDto } from "../kafka/messages.interfaces";

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly appService: AppService
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topics: ["test"],
      },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const value: MessageDto = JSON.parse(message.value.toString());
          console.log({
            value,
            topic: topic.toString(),
            partition: partition.toString(),
          });
          this.appService.doJob(value);
        },
      }
    );
  }
}
