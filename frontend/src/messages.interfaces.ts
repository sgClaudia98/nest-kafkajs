import { MessageDto } from "./input.dto";

export interface MessageSend extends MessageDto {
  id: string;
  createdAt: number;
}

export interface SavedFile extends MessageSend {
  result?: string[];
  text?: string;
  updatedAt?: number;
}

export interface MessageResponse extends MessageSend {
  result: string[];
  updatedAt: number;
}
