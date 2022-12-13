/*
import { Injectable } from "@nestjs/common";
import { ProducerService } from "./kafka/producer.service";

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}

  async testing() {
    await this.producerService.produce({
      topic: "test",
      messages: [
        {
          value: "hello world",
        },
      ],
    });
    return "Hello World!";
  }
}
*/
