import { v4 as uuid } from "uuid";

export class Node {
  public id: string;
  public value: number;
  public next: Node | null;

  constructor(value: number) {
    this.id = uuid();
    this.value = value;
    this.next = null;
  }
}

export class Stack {
  public peek: Node | null;
  public last: Node | null;
  public size: number;

  constructor() {
    this.peek = null;
    this.last = null;
    this.size = 0;
  }

  push(val: number) {
    const newNode = new Node(val);

    if (!this.peek) {
      this.peek = newNode;
      this.last = newNode;
    } else {
      const temp = this.peek;
      this.peek = newNode;
      this.peek.next = temp;
    }

    return ++this.size;
  }

  pop() {
    if (!this.peek) return null;

    const temp = this.peek;

    if (this.peek === this.last) {
      this.last = null;
    }

    this.peek = this.peek.next;
    --this.size;

    return temp.value;
  }

  get list() {
    const items: Node[] = [];
    if (!this.peek) return items;

    let currentPeek = this.peek;
    items.push(currentPeek);

    while (currentPeek?.next) {
      currentPeek = currentPeek.next;
      items.push(currentPeek);
    }

    return items;
  }
}
