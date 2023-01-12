import "./Square.css";
import { useContext } from "react";
import { Context } from "./GameState";
import axios from "axios";

export function Square({ row, column }) {
  const context = useContext(Context);
  const value = context.gameState.board[row][column];
  return (
    <div className="square" onClick={() => play(context, row, column)}>
      {value && <Coin color={value} />}
    </div>
  );
}

function play(context, row, column) {
  axios
    .patch(`http://localhost:3000/games/${context.gameState.gameId}`, {
      playerId: context.gameState.playerId,
      row,
      column,
    })
    .then(({ data }) => {
      context.setBoard(data.board);
    })
    .catch((error) => {
      context.setErrorMessage(error.response.data.message);
    });
}

function Coin({ color }) {
  return <div className={color === "R" ? "RedCoin" : "BlackCoin"}></div>;
}
