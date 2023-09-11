import { v4 as uuidv4 } from "uuid";

export class Task {
  id: string;
  text: string;
  done: boolean;

  constructor(text: string) {
    this.id = uuidv4();
    this.text = text;
    this.done = false;
  }
}
