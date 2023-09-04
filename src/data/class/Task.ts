export class Task {
  text: string;
  done: boolean;

  constructor(text: string) {
    this.text = text;
    this.done = false;
  }
}
