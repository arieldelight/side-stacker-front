import { Square } from "./Square";

function Board() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Row index={0} />
      <Row index={1} />
      <Row index={2} />
      <Row index={3} />
      <Row index={4} />
      <Row index={5} />
      <Row index={6} />
    </div>
  );
}

function Row({ index }) {
  return (
    <div style={{ display: "flex" }}>
      <Square row={index} column={0} />
      <Square row={index} column={1} />
      <Square row={index} column={2} />
      <Square row={index} column={3} />
      <Square row={index} column={4} />
      <Square row={index} column={5} />
      <Square row={index} column={6} />
    </div>
  );
}

export default Board;
