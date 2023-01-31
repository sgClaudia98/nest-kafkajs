import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from "@nestjs/common";
import { Roles, Unprotected, AuthenticatedUser } from "nest-keycloak-connect";
import { AppService } from "./app.service";
import { createHash } from "crypto";
import { MessageDto } from "./input.dto";
import { SavedFile } from "./messages.interfaces";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Testing api
  @Post()
  @Unprotected()
  sendSomething(@Body() message: MessageDto) {
    return this.appService.sendMessage({
      ...message,
      id: "sub_user",
      createdAt: Date.now(),
    });
  }

  // Envian mensajes solo usuarios autorizados
  @Post("/job")
  sendMessage(@Body() message: MessageDto, @AuthenticatedUser() user: any) {
    const segments = message.repo.split("/");
    const lastSegment = segments.pop();
    const prevSegment = segments.pop();
    const time = Date.now();
    // string to be hashed
    const str = `${prevSegment}-${lastSegment}+${time}`;
    // create a sha-256 hasher
    const sha256Hasher = createHash("sha256")
      .update(`${str}${user.sub}`)
      .digest("hex");
    return this.appService.sendMessage({
      ...message,
      id: `${sha256Hasher}`,
      createdAt: time,
    });
  }
  // Get all jobs only admins
  @Get("/job")
  @Roles({ roles: ["realm:admin"] })
  getJobs(): string {
    return `Hello admin`;
  }

  // Consultan mensajes solo usuarios
  @Get("/job/:job_id")
  @Roles({ roles: ["realm:user"] })
  async getResponse(
    @Param("job_id") jobId: string,
    @AuthenticatedUser() user: any,
    @Res() response,
  ) {
    try {
      const file: SavedFile = await this.appService.getResponse(jobId);

      const segments = file.repo.split("/");
      const lastSegment = segments.pop();
      const prevSegment = segments.pop();
      const time = file.createdAt;
      // string to be hashed
      const str = `${prevSegment}-${lastSegment}+${time}`;
      // create a sha-256 hasher
      const sha256Hasher = createHash("sha256")
        .update(`${str}${user.sub}`)
        .digest("hex");
      if (sha256Hasher == jobId) {
        if (file.updatedAt) this.appService.deleteJobFile(jobId);
        return response.status(HttpStatus.OK).send(file);
      }
    } catch (e) {
      console.log(e.message, "message");
      if (e.code == "ENOENT")
        return response.status(HttpStatus.NOT_FOUND).send("Resource not found");
    }
    return response
      .status(HttpStatus.FORBIDDEN)
      .send("User can't access resource");
  }

  @Get()
  @Unprotected()
  getHello() {
    return "Hello World!";
  }

  @Get("/anonymouse")
  @Unprotected()
  getAnonymouse(): string {
    return `Hello anonymouse`;
  }

  @Get("/user")
  @Roles({ roles: ["realm:user"] })
  getUser(): string {
    return `Hello user`;
  }

  @Get("/admin")
  @Roles({ roles: ["realm:admin"] })
  getAdmin(): string {
    return `Hello admin`;
  }

  @Get("/all_users")
  getAll(): string {
    return `Hello all users`;
  }
}
