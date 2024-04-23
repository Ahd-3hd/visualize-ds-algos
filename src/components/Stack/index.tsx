import { useSprings } from "@react-spring/web";
import { useState } from "react";
import { Stack } from "../../implementations/Stack";
import { Actions } from "./Actions";
import { Visualization } from "./Visualization";

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

  const handleRemove = () => {
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
  };

  return (
    <div>
      <Actions handleAdd={handleAdd} handleRemove={handleRemove} />
      <Visualization springs={[...springs].reverse()} items={[...items]} />
    </div>
  );
};
