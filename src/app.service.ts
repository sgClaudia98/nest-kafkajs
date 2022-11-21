import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  async testing() {
    return "Hello World from testing!";
  }
}
