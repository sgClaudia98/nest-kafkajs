export interface MessageDto {
  repo: string;
  exec: string[];
}

export interface MessageSend extends MessageDto {
  id: string;
  createdAt: number;
}

export interface ResponseDto extends MessageSend {
  result: string[];
  updatedAt: number;
}

export interface SavedFile extends MessageSend {
  result?: string[];
  text?: string;
  updatedAt?: number;
}
