import { animated, useSprings } from "@react-spring/web";
import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

class Node {
  public id: string;
  public value: number;
  public next: Node | null;

  constructor(value: number) {
    this.id = uuid();
    this.value = value;
    this.next = null;
  }
}

class Stack {
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

const myStack = new Stack();

//TODO: async queue
export const StackComponent = () => {
  const [items, setItems] = useState(myStack.list);

  const [length, setLength] = useState(myStack.list.length);

  const [springs, api] = useSprings(items.length, () => {
    const direction = [1, -1][Math.floor(Math.random() * 2)];

    return {
      from: {
        opacity: 0,
        transform: `translate(${direction * 100}%,-100%)`,
      },
      to: {
        opacity: 1,
        transform: `translate(0%,0%)`,
      },
      config: {
        tension: 280,
        friction: 20,
      },
    };
  });

  const handleAdd = () => {
    myStack.push(myStack?.peek ? myStack.peek.value + 1 : 0);
    setItems(myStack.list);
    setLength((prev) => prev + 1);
  };

  const handleRemove = useCallback(() => {
    if (!myStack.peek || length === 0) return;

    api.start((index) => {
      if (index !== length - 1) return;

      return {
        reverse: true,
        onResolve: () => {
          myStack.pop();
          setItems(myStack.list);
        },
      };
    });

    setLength((prev) => prev - 1);
  }, [length]);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
        }}
      >
        <button
          onClick={handleAdd}
          style={{
            padding: "8px",
            margin: "8px",
          }}
        >
          Add
        </button>
        <button
          onClick={handleRemove}
          style={{
            padding: "8px",
            margin: "8px",
          }}
        >
          Remove
        </button>
      </div>

      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        {springs.reverse().map((props, index) => (
          <animated.div
            key={items[index].id}
            style={{
              width: "200px",
              height: "50px",
              background: "purple",
              marginBottom: "10px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              borderRadius: "10px",
              border: index === 0 ? "2px solid lightblue" : "",
              ...props,
            }}
          >
            {items[index].value}
          </animated.div>
        ))}
      </div>
    </div>
  );
};
