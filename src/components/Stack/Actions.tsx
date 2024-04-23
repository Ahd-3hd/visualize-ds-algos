interface Props {
  handleAdd: () => void;
  handleRemove: () => void;
}

export const Actions = ({ handleAdd, handleRemove }: Props) => {
  return (
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
  );
};
