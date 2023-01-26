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
          try {
            // Create folder
            const folder = await this.appService.createFolder(value.repo);
            console.log("FOLDER", folder);
            // Clone repo
            const clone = await this.appService.cloneRepo(value.repo, folder);
            // Execute all actions
            console.log("CLONE", clone);
            for (const exec in value.exec) {
              await this.appService.executeAction(exec, folder);
            }
          } catch (e) {
            console.log("ERROR here!", e);
          }
        },
      }
    );
  }
}
