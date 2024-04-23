import { SpringValue, animated } from "@react-spring/web";
import { Node } from "../../implementations/Stack";

export const Visualization = ({
  springs,
  items,
}: {
  springs: { opacity: SpringValue<number>; transform: SpringValue<string> }[];
  items: Node[];
}) => {
  return (
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
      {springs.map((props, index) => (
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
  );
};
