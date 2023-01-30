import { Injectable, OnModuleInit } from "@nestjs/common";
import { AppService } from "src/app.service";
import { ResponseDto } from "src/kafka/messages.interfaces";
import { ConsumerService } from "../kafka/consumer.service";

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly appService: AppService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topics: ["test-resp"],
      },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const value: ResponseDto = JSON.parse(message.value.toString());
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });
          this.appService.saveResponse(value);
        },
      },
    );
  }
}
