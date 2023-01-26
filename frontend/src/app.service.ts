import { Injectable } from "@nestjs/common";
import { MessageDto } from "./kafka/messages.interfaces";
import { ProducerService } from "./kafka/producer.service";

@Injectable()
export class AppService {
  constructor(private readonly producer: ProducerService) {}

  async sendMessage(message: MessageDto): Promise<boolean> {
    return this.producer
      .produce({
        topic: "test",
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      })
      .then(() => true)
      .catch((e) => {
        console.log("ERROR: ", e);
        return false;
      });
  }
}
