import { Injectable } from "@nestjs/common";
import { ProducerService } from "./kafka/producer.service";

@Injectable()
export class AppService {
  constructor(private readonly producer: ProducerService) {}

  async testing(): Promise<boolean> {
    return this.producer
      .produce({
        topic: "test",
        messages: [
          {
            value: "dasd",
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
