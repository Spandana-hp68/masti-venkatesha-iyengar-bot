
export enum Role {
  User = 'user',
  Bot = 'bot',
}

export interface Message {
  role: Role;
  parts: string;
  timestamp: Date;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}
