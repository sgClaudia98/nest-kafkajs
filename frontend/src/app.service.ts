import { Injectable } from "@nestjs/common";
import { ProducerService } from "./kafka/producer.service";
import * as fs from "fs";
import { MessageResponse, MessageSend, SavedFile } from "./messages.interfaces";

@Injectable()
export class AppService {
  constructor(private readonly producer: ProducerService) {}

  async sendMessage(message: MessageSend): Promise<string> {
    console.log("PRODUCE", message);
    return this.producer
      .produce({
        topic: "test",
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      })
      .then(() => {
        fs.writeFile(
          `../temp/${message.id}.txt`,
          JSON.stringify(message),
          function (err) {
            if (err) {
              return console.log(err);
            }
            console.log("The file was saved!");
          },
        );
        return message.id;
      })
      .catch((e) => {
        console.log("ERROR: ", e);
        return "ERROR";
      });
  }

  saveResponse(message: MessageResponse): boolean {
    try {
      let text = "";
      message.result.forEach(function (v, index) {
        text += index + 1 + ": " + message.exec[index] + "\n";
        text += v + "\n\n";
        console.log("TEXT--", text);
      });
      const obj: SavedFile = {
        ...message,
        text: text,
      };
      console.log("TEXT", text);
      fs.writeFile(
        `../temp/${obj.id}.txt`,
        JSON.stringify(obj),
        function (err) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        },
      );
    } catch (e) {
      console.log("error", e);
      return false;
    }
    return true;
  }

  getResponse(jobId: string): Promise<SavedFile> {
    return new Promise((resolve, reject) => {
      fs.readFile(`../temp/${jobId}.txt`, (err, data) => {
        console.log("ERR", err, !!err);
        console.log("DATA", data);
        if (err) {
          reject(err);
        } else {
          const _data: SavedFile = JSON.parse(data.toString());
          resolve(_data);
        }
      });
    });
  }

  deleteJobFile(jobId: string) {
    return new Promise((resolve, reject) => {
      fs.unlink(`../temp/${jobId}.txt`, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  async getAllResponse(): Promise<SavedFile[]> {
    const arr: SavedFile[] = [];
    try {
      const files = fs.readdirSync("../temp/");
      //listing all files using forEach
      console.log("FILES", files);
      if (files)
        for (const file of files) {
          const _temp = file.split(".")[0];
          arr.push(await this.getResponse(_temp));
        }
    } catch (err) {
      //handling error
      console.log("Unable to scan directory: " + err);
      throw new Error(err);
    }
    console.log(arr, "ARRAR");
    return arr;
  }
}
