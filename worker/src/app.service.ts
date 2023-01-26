import { Injectable } from "@nestjs/common";
import { ProducerService } from "./kafka/producer.service";
import * as child from "child_process";

@Injectable()
export class AppService {
  constructor(private readonly producer: ProducerService) {}

  async createFolder(url: string): Promise<string> {
    const segments = url.split("/");
    const lastSegment = segments.pop();
    const prevSegment = segments.pop();
    const folderName = `${prevSegment}_${lastSegment}-${Date.now()}`;
    try {
      await this.runCommand("mkdir " + folderName);
      return folderName;
    } catch (e) {
      throw new Error("Error create folder: " + e.cmd);
    }
  }

  async deleteFolder(folderName: string): Promise<string> {
    try {
      return this.runCommand("rm -r " + folderName);
    } catch (e) {
      throw new Error("Error delete folder: " + e.cmd);
    }
  }

  async cloneRepo(repo: string, folder: string): Promise<string> {
    try {
      return await this.runCommand(`cd ${folder} && git clone ${repo}`);
    } catch (e) {
      throw new Error("Error repo clone: " + e.cmd);
    }
  }

  async executeAction(exec: string, folder: string) {
    try {
      return await this.runCommand(`cd ${folder} && ${exec}`);
    } catch (e) {
      throw new Error("Error execute action: " + e.cmd);
    }
  }

  async sendResponse(message: any, folder: string) {
    return this.producer
      .produce({
        topic: "test-resp",
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
