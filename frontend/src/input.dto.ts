import { IsString, IsUrl } from "class-validator";
import { MessageSend } from "./messages.interfaces";

export class MessageDto {
  @IsUrl()
  repo: string;

  @IsString({ each: true })
  exec: string[];
}
