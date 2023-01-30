import { Injectable } from "@nestjs/common";
import { ProducerService } from "./kafka/producer.service";
import * as child from "child_process";
import { MessageDto } from "./kafka/messages.interfaces";

@Injectable()
export class AppService {
  constructor(private readonly producer: ProducerService) {}

  async doJob(value: MessageDto) {
    try {
      // Create folder
      const folder = await this.createFolder(value.repo, value.id);
      console.log("FOLDER", folder);
      // Clone repo
      const clone = await this.cloneRepo(value.repo, folder);
      // Execute all actions
      console.log("CLONE", clone);
      const result: string[] = [];
      console.log("EXEC-INIT", value.exec);
      for (const exec of value.exec) {
        result.push(await this.executeAction(exec, folder));
      }
      console.log("EXEC-RESULT", result);
      // Delete folder after work done
      const deleteFolder = await this.deleteFolder(folder);
      console.log("DELETE", deleteFolder);
      const sendResponse = this.sendResponse(value, result);
      console.log("SENDRESP", sendResponse);
    } catch (e) {
      console.log("ERROR here!", e);
    }
  }

  private async createFolder(url: string, id: string): Promise<string> {
    const segments = url.split("/");
    const lastSegment = segments.pop();
    const prevSegment = segments.pop();
    const folderName = `${prevSegment}_${lastSegment}-${id}`;
    try {
      await this.runCommand("cd ../temp && mkdir " + folderName);
      return folderName;
    } catch (e) {
      throw new Error("Error create folder: " + e.cmd);
    }
  }

  private async deleteFolder(folderName: string): Promise<string> {
    try {
      return this.runCommand("cd ../temp && rm -rf " + folderName);
    } catch (e) {
      throw new Error("Error delete folder: " + e.cmd);
    }
  }

  private async cloneRepo(repo: string, folder: string): Promise<string> {
    try {
      return await this.runCommand(
        `cd ../temp/${folder} && git clone ${repo} .`
      );
    } catch (e) {
      throw new Error("Error repo clone: " + e.cmd);
    }
  }

  private async executeAction(exec: string, folder: string) {
    try {
      return await this.runCommand(`cd ../temp/${folder} && ${exec}`);
    } catch (e) {
      throw new Error("Error execute action: " + e.cmd);
    }
  }

  private async sendResponse(value: MessageDto, result: string[]) {
    return this.producer
      .produce({
        topic: "test-resp",
        messages: [
          {
            value: JSON.stringify({
              ...value,
              result: result,
              updatedAt: Date.now(),
            }),
          },
        ],
      })
      .then(() => true)
      .catch((e) => {
        console.log("ERROR: ", e);
        return false;
      });
  }

  private runCommand(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      child.exec(
        cmd,
        (error: child.ExecException, stdout: string, stderr: string) => {
          console.log("STDERR", stderr, !!error);
          console.log("STDOUT", stdout);
          if (error) {
            reject(error);
          } else {
            resolve(stdout);
          }
        }
      );
    });
  }
}
